import { createContext, JSX } from 'preact'
import { initialGameState } from './data/data-gamestate'
import { useContext, useReducer } from 'preact/hooks'
import { Action, Effect, EffectStack, EventId, GameState, ModifierType, Param } from './types'
import { generateBreakthroughSelection, generateHumanSelection } from './data/data-generators'
import { refreshContracts } from './data/contract-generator'
import { calculateResourceProduction, isGameOver } from './util'
import { convertContractToAction } from './data/data-actions'
import { saveGame } from './savegame-util'

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
        e.paramEffected === 'income' ||
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
  const effectStack = createEffectStack(updatedGs, action)
  updatedGs = reduceEffect(effectStack, updatedGs, 0)
  updatedGs = applyActionEventHandlers(updatedGs, action.eventId)
  updatedGs = action.functionEffect ? action.functionEffect(updatedGs) : updatedGs

  // Handle turn advancement if needed
  if (action.turnCost != 0) {
    updatedGs = handleTurn(updatedGs)
  }

  saveGame(updatedGs) // NOTE: Save the game state after every turn, make sure no updates happen after this point!

  return updatedGs
}

// Create effect stack to track all effects that should be applied
function createEffectStack(gs: GameState, action: Action): EffectStack {
  const effectStack: EffectStack = action.effect.map((e) => ({ ...e, depth: 0 }))
  return effectStack
}

function applyActionEventHandlers(gs: GameState, eventId: EventId): GameState {
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
    updatedGs = handler.apply(updatedGs, level)
  })

  return updatedGs
}

function applyParamEventHandlers(gs: GameState, effectStack: EffectStack, param: Param, value: number, depth: number): GameState {
  if (value <= 0) return gs

  // Make a copy of the game state to work with
  let updatedGs = { ...gs }

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
    updatedGs = handler.apply(updatedGs, level, param, value)
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

  return Math.floor(modifiedValue)
}

export function reduceEffect(effectStack: EffectStack, gs: GameState, depth: number): GameState {
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
        currentScreen: 'selection',
        humanSelections: [...updatedGs.humanSelections, generateHumanSelection(updatedGs, amount)],
      },
      depth
    )
  }

  if (paramEffected === 'breakthroughSelection') {
    return reduceEffect(
      effectStack.slice(1),
      {
        ...updatedGs,
        currentScreen: 'selection',
        breakthroughSelections: [...updatedGs.breakthroughSelections, generateBreakthroughSelection(updatedGs, amount)],
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

export function getMoneyGain(gs: GameState): { total: number; wages: number; income: number; wageMultiplier: number; totalWages: number } {
  const wages = gs.humans.reduce((acc, human) => acc + human.wage, 0)
  const wageMultiplier = Math.max((200 - gs.trust) / 100, 0)
  const totalWages = Math.round(wages * wageMultiplier)
  const income = gs.income

  return {
    income,
    wages,
    wageMultiplier,
    totalWages,
    total: income - totalWages,
  }
}

export function handleTurn(gs: GameState): GameState {
  const moneyGain = getMoneyGain(gs).total
  const humanResourceGain = calculateResourceProduction(gs)

  const spGain = humanResourceGain.sp.total
  const epGain = humanResourceGain.ep.total
  const rpGain = humanResourceGain.rp.total

  // Create effect stack for turn changes
  const effect: Effect = [
    { paramEffected: 'money', amount: moneyGain },
    { paramEffected: 'sp', amount: spGain },
    { paramEffected: 'ep', amount: epGain },
    { paramEffected: 'rp', amount: rpGain },
    { paramEffected: 'asiOutcome', amount: Math.min(0, gs.publicUnity) },
    { paramEffected: 'turn', amount: 1 },
  ]
  const effectStack: EffectStack = effect.map((e) => ({ ...e, depth: 0 }))

  let updatedGs = { ...gs }

  // Apply turnEnd event handlers
  updatedGs = applyActionEventHandlers(updatedGs, 'turnEnd')
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

// NOTE: Need to run year-end goal checks before year-end unity adjustment, otherwise the player will need one unity more to hit year-end goal thresholds.
export function handleEndOfYear(gs: GameState): GameState {
  // Create a new game state that we'll modify
  let updatedGs: GameState = { ...gs }

  // Check the first yearly goal and generate an action for it
  const firstYearlyContract = updatedGs.yearlyContracts[0]
  const contractAction = convertContractToAction(firstYearlyContract, 999)

  // If the goal condition is false or canApplyAction is false, enable game over screen
  const canApply = canApplyAction(updatedGs, contractAction)
  if (!canApply) {
    return {
      ...updatedGs,
      currentScreen: 'game-over',
    }
  }

  // Apply the goal action, which will trigger action handlers. Don't use reduceAction since it would trigger turn end again
  updatedGs = reduceEffect(
    contractAction.effect.map((e) => ({ ...e, depth: 0 })),
    updatedGs,
    0
  )

  // Refresh non-yearly contracts - important to happen after yearly goal reduction since convertContractToAction has a side-effect on contracts
  updatedGs = refreshContracts(updatedGs)

  // Remove the first goal from gs.yearlyContracts and go to breakthrough selection screen
  updatedGs = {
    ...updatedGs,
    yearlyContracts: updatedGs.yearlyContracts.slice(1),
    breakthroughSelections: [...updatedGs.breakthroughSelections, generateBreakthroughSelection(updatedGs, 100, 'epic')],
    currentScreen: 'selection',
  }

  // Show victory screen if all yearly contracts have been completed
  if (updatedGs.yearlyContracts.length === 0) {
    return {
      ...updatedGs,
      currentScreen: 'victory',
    }
  }

  // Create effect stack for year change
  const effect: Effect = [{ paramEffected: 'publicUnity', amount: -1 }]
  const effectStack: EffectStack = effect.map((e) => ({ ...e, depth: 0 }))

  // Apply yearChange event handlers
  updatedGs = applyActionEventHandlers(updatedGs, 'yearChange')

  // Apply the year change effects
  updatedGs = reduceEffect(effectStack, updatedGs, 0)

  return updatedGs
}
