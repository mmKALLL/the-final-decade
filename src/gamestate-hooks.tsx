import { createContext, JSX } from 'preact'
import { initialGameState } from './data/data-gamestate'
import { useContext, useReducer } from 'preact/hooks'
import { Action, Effect, EffectStack, EventId, GameState, ModifierType, Param } from './types'
import { generateHuman, generateBreakthrough } from './data/data-generators'
import { refreshContracts } from './data/contract-generator'
import { convertContractToAction, isGameOver } from './util'

export const GameStateContext = createContext(initialGameState)
export const DispatchContext = createContext((_action: Action) => {})

export function GameStateProvider({ children }: { children: JSX.Element }) {
  const [gs, dispatch] = useReducer<GameState, Action>(reduceAction, initialGameState)
  return (
    <GameStateContext.Provider value={gs}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </GameStateContext.Provider>
  )
}

export function useGameState() {
  const gs = useContext(GameStateContext)
  const dispatch = useContext(DispatchContext)
  return { gs, dispatch }
}

export function canApplyAction(gs: GameState, action: Action): boolean {
  return (
    (action.enabledCondition === undefined || action.enabledCondition(gs)) &&
    action.effect.every((e) => e.condition === undefined || e.condition(gs, e.paramEffected, e.amount)) &&
    action.effect.every(
      (e) =>
        e.paramEffected === 'humanSelection' ||
        e.paramEffected === 'breakthroughSelection' ||
        e.paramEffected === 'publicUnity' ||
        e.paramEffected === 'passiveIncome' ||
        e.amount >= 0 ||
        gs[e.paramEffected] >= -e.amount
    )
  )
}

export function reduceAction(gs: GameState, action: Action): GameState {
  if (!canApplyAction(gs, action)) {
    return gs // Return early if action is not applicable
  }

  let updatedGs: GameState = { ...gs }

  // Apply all effects in the stack
  const effectStack = createEffectStack(gs, action)
  updatedGs = reduceEffect(effectStack, updatedGs, 0)
  updatedGs = action.functionEffect ? action.functionEffect(updatedGs) : updatedGs

  // Handle turn advancement if needed
  if (action.turnCost != 0) {
    updatedGs = handleTurn(updatedGs)
  }

  return updatedGs
}

function createEffectStack(gs: GameState, action: Action): EffectStack {
  let updatedGs = { ...gs }

  // Apply function effect if exists
  updatedGs = action.functionEffect ? action.functionEffect(updatedGs) : updatedGs

  // Create effect stack to track all effects that should be applied
  const effectStack: EffectStack = action.effect.map((e) => ({ ...e, depth: 0 }))

  // Trigger action event handlers for this action
  if (action.eventId) {
    updatedGs = applyActionEventHandlers(updatedGs, effectStack, action.eventId, 0)
  }

  return effectStack
}

function applyActionEventHandlers(gs: GameState, effectStack: EffectStack, eventId: EventId, depth: number): GameState {
  // Make a copy of the game state to work with
  let updatedGs = { ...gs }

  // Get all action event handlers from all breakthroughs
  const allHandlers = gs.breakthroughs.flatMap((breakthrough) =>
    breakthrough.actionEventHandlers
      ? breakthrough.actionEventHandlers
          .filter((handler) => handler.trigger === eventId || handler.trigger === 'allActions')
          .map((handler) => ({ handler, level: breakthrough.level }))
      : []
  )

  // Apply each handler, allowing it to modify the effect stack
  allHandlers.forEach(({ handler, level }) => {
    updatedGs = handler.apply(updatedGs, effectStack, eventId, level, depth)
  })

  return updatedGs
}

function applyParamEventHandlers(gs: GameState, effectStack: EffectStack, param: Param, value: number, depth: number): GameState {
  if (value <= 0) return gs

  // Make a copy of the game state to work with
  const updatedGs = { ...gs }

  // Get all param event handlers from all breakthroughs
  const allHandlers = gs.breakthroughs.flatMap((breakthrough) =>
    breakthrough.paramEventHandlers
      ? breakthrough.paramEventHandlers
          .filter((handler) => handler.trigger === param)
          .map((handler) => ({ handler, level: breakthrough.level }))
      : []
  )

  // Apply each handler, allowing it to modify the effect stack
  allHandlers.forEach(({ handler, level }) => {
    handler.apply(updatedGs, effectStack, param, value, level, depth)
  })

  return updatedGs
}

function applyModifiers(gs: GameState, param: Param, value: number): number {
  // Skip modifying if value is zero
  if (value <= 0) return value

  // Get all modifiers from all breakthroughs that apply to this param
  const modifiers = gs.breakthroughs.flatMap((breakthrough) =>
    breakthrough.modifiers
      ? breakthrough.modifiers
          .filter((mod) => mod.param === param)
          .filter((mod) => mod.filter === undefined || mod.filter())
          .map((mod) => ({ mod, level: breakthrough.level }))
      : []
  )

  // Group modifiers by type
  const addModifiers = modifiers.filter(({ mod }) => mod.type === ModifierType.Add)
  const multiplyModifiers = modifiers.filter(({ mod }) => mod.type === ModifierType.Multiply)
  const functionModifiers = modifiers.filter(({ mod }) => mod.type === ModifierType.Function)

  // Apply modifiers in the correct order: add -> multiply -> function
  let modifiedValue = value

  // Apply add modifiers
  addModifiers.forEach(({ mod, level }) => {
    modifiedValue = mod.apply(modifiedValue, level)
  })

  // Apply multiply modifiers
  multiplyModifiers.forEach(({ mod, level }) => {
    modifiedValue = mod.apply(modifiedValue, level)
  })

  // Apply function modifiers
  functionModifiers.forEach(({ mod, level }) => {
    modifiedValue = mod.apply(modifiedValue, level)
  })

  return modifiedValue
}

function reduceEffect(effectStack: EffectStack, gs: GameState, depth: number): GameState {
  if (effectStack.length === 0) {
    return gs
  }
  if (depth >= 10 || effectStack[0].depth >= 10) {
    return reduceEffect(effectStack.slice(1), gs, depth - 1)
  }

  let updatedGs = { ...gs }

  const { paramEffected, amount } = effectStack[0]

  // Handle special cases for selections
  if (paramEffected === 'humanSelection') {
    return reduceEffect(
      effectStack.slice(1),
      {
        ...updatedGs,
        humanSelections: [
          ...updatedGs.humanSelections,
          [generateHuman(updatedGs, amount), generateHuman(updatedGs, amount), generateHuman(updatedGs, amount)],
        ],
      },
      depth
    )
  }

  if (paramEffected === 'breakthroughSelection') {
    return reduceEffect(
      effectStack.slice(1),
      {
        ...updatedGs,
        breakthroughSelections: [
          ...updatedGs.breakthroughSelections,
          [generateBreakthrough(updatedGs, amount), generateBreakthrough(updatedGs, amount), generateBreakthrough(updatedGs, amount)],
        ],
      },
      depth
    )
  }

  // Apply modifiers to the amount
  const currentValue: number = updatedGs[paramEffected]
  const modifiedAmount = applyModifiers(updatedGs, paramEffected, amount)
  const newValue = currentValue + modifiedAmount

  // Update the game state
  updatedGs = { ...updatedGs, [paramEffected]: newValue }

  // Trigger param event handlers
  updatedGs = applyParamEventHandlers(updatedGs, effectStack, paramEffected, modifiedAmount, depth)

  return reduceEffect(effectStack.slice(1), updatedGs, depth)
}

export function getMoneyGain(gs: GameState): number {
  return gs.passiveIncome - gs.humans.reduce((acc, human) => acc + human.wage, 0)
}

export function handleTurn(gs: GameState): GameState {
  const moneyGain = getMoneyGain(gs)
  const spGain = gs.humans.reduce((acc, human) => acc + human.spGeneration, 0)
  const epGain = gs.humans.reduce((acc, human) => acc + human.epGeneration, 0)
  const rpGain = gs.humans.reduce((acc, human) => acc + human.rpGeneration, 0)

  // Create effect stack for turn changes
  const effect: Effect = [
    { paramEffected: 'money', amount: moneyGain },
    { paramEffected: 'sp', amount: spGain },
    { paramEffected: 'ep', amount: epGain },
    { paramEffected: 'rp', amount: rpGain },
    { paramEffected: 'asiOutcome', amount: gs.publicUnity },
    { paramEffected: 'turn', amount: 1 },
  ]
  const effectStack: EffectStack = effect.map((e) => ({ ...e, depth: 0 }))

  let updatedGs = { ...gs }

  // Apply dayChange event handlers
  updatedGs = applyActionEventHandlers(updatedGs, effectStack, 'dayChange', 0)
  updatedGs = reduceEffect(effectStack, updatedGs, 0)

  // Check if this is the end of a year (turn divisible by 12)
  if (updatedGs.turn % 12 === 0) {
    return handleEndOfYear(updatedGs)
  }

  // Handle game over triggers
  if (isGameOver(updatedGs)) {
    return {
      ...updatedGs,
      currentScreen: 'game-over',
    }
  }

  return updatedGs
}

export function handleEndOfYear(gs: GameState): GameState {
  // Create a new game state that we'll modify
  let updatedGs: GameState = { ...gs }

  // Create effect stack for year change
  const effect: Effect = [
    { paramEffected: 'publicUnity', amount: -1 },
    { paramEffected: 'passiveIncome', amount: Math.floor(updatedGs.money / 100) },
  ]
  const effectStack: EffectStack = effect.map((e) => ({ ...e, depth: 0 }))

  // Apply yearChange event handlers
  updatedGs = applyActionEventHandlers(updatedGs, effectStack, 'yearChange', 0)

  // Apply the year change effects
  updatedGs = reduceEffect(effectStack, updatedGs, 0)

  // Refresh non-yearly contracts
  updatedGs = refreshContracts(updatedGs)

  // Check the first yearly goal and generate an action for it
  const firstYearlyContract = updatedGs.yearlyContracts[0]
  const contractAction = convertContractToAction(firstYearlyContract)

  // If the contract condition is false or canApplyAction is false, enable game over screen
  const canApply = canApplyAction(updatedGs, contractAction)
  if (!canApply) {
    return {
      ...updatedGs,
      currentScreen: 'game-over',
    }
  }

  // Apply the contract action, which will trigger action handlers. Don't use reduceAction since it would trigger turn end again
  updatedGs = reduceEffect(
    contractAction.effect.map((e) => ({ ...e, depth: 0 })),
    updatedGs,
    0
  )

  // Remove the first goal from gs.yearlyContracts and go to breakthrough selection screen
  updatedGs = {
    ...updatedGs,
    yearlyContracts: updatedGs.yearlyContracts.slice(1),
    breakthroughSelections: [
      ...updatedGs.breakthroughSelections,
      [
        generateBreakthrough(updatedGs, 100, 'epic'),
        generateBreakthrough(updatedGs, 100, 'epic'),
        generateBreakthrough(updatedGs, 100, 'epic'),
      ],
    ],
    currentScreen: 'selection',
  }

  // Show victory screen if all yearly contracts have been completed
  if (updatedGs.yearlyContracts.length === 0) {
    return {
      ...updatedGs,
      currentScreen: 'victory',
    }
  }

  return updatedGs
}
