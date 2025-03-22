import { createContext, JSX } from 'preact'
import { initialGameState } from './data/data-gamestate'
import { useContext, useReducer } from 'preact/hooks'
import { Action, Effect, GameState } from './types'
import { generateHuman, generateBreakthrough } from './data/data-generators'
import { refreshContracts } from './data/contract-generator'
import { convertContractToAction } from './util'

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

  updatedGs = action.functionEffect ? action.functionEffect(updatedGs) : updatedGs
  updatedGs = reduceEffect(action.effect, updatedGs, 0)

  if (action.turnCost != 0) {
    updatedGs = handleTurn(updatedGs)
  }

  return updatedGs
}

export function reduceEffect(effect: Effect, gameState: GameState, depth: number): GameState {
  return effect.reduce((gs, singleEffect) => {
    const { amount, paramEffected } = singleEffect
    if (paramEffected === 'humanSelection') {
      return {
        ...gs,
        humanSelections: [...gs.humanSelections, [generateHuman(gs, amount), generateHuman(gs, amount), generateHuman(gs, amount)]],
      }
    }
    if (paramEffected === 'breakthroughSelection') {
      return {
        ...gs,
        breakthroughSelections: [
          ...gs.breakthroughSelections,
          [generateBreakthrough(gs, amount), generateBreakthrough(gs, amount), generateBreakthrough(gs, amount)],
        ],
      }
    }

    const currentValue = gs[paramEffected]
    const updatedValue = currentValue + amount
    const updatedGs = { ...gs, [singleEffect.paramEffected]: updatedValue }

    // If this is the first effect on stack, apply effects from breakthroughs
    if (amount > 0 && depth === 0) {
      const breakthroughEffects = gameState.breakthroughs
        .flatMap((breakthrough) => breakthrough.effect)
        .filter((effect) => !effect.condition || effect.condition(gs, paramEffected, amount))
      return reduceEffect(breakthroughEffects, updatedGs, depth + 1)
    }

    return updatedGs
  }, gameState)
}

export function getMoneyGain(gs: GameState): number {
  return gs.passiveIncome - gs.humans.reduce((acc, human) => acc + human.wage, 0)
}

export function handleTurn(gs: GameState): GameState {
  const moneyGain = getMoneyGain(gs)
  const spGain = gs.humans.reduce((acc, human) => acc + human.spGeneration, 0)
  const epGain = gs.humans.reduce((acc, human) => acc + human.epGeneration, 0)
  const rpGain = gs.humans.reduce((acc, human) => acc + human.rpGeneration, 0)

  const newTurn = gs.turn + 1

  const updatedGs = {
    ...gs,
    turn: newTurn,
    money: gs.money + moneyGain,
    sp: gs.sp + spGain,
    ep: gs.ep + epGain,
    rp: gs.rp + rpGain,
    asiOutcome: gs.asiOutcome + gs.publicUnity,
  }

  // Check if this is the end of a year (turn divisible by 12)
  if (newTurn % 12 === 0) {
    return handleEndOfYear(updatedGs)
  }

  // Handle game over triggers
  if (updatedGs.money <= 0 || updatedGs.asiOutcome <= 0 || updatedGs.trust <= 0 || updatedGs.influence <= 0) {
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

  // If the first goal has been reached, apply its effects
  updatedGs = reduceEffect(contractAction.effect, updatedGs, 0)

  // Remove the first goal from gs.yearlyContracts and go to breakthrough selection screen
  updatedGs = {
    ...updatedGs,
    yearlyContracts: updatedGs.yearlyContracts.slice(1),
    currentScreen: 'selection',
  }

  // Reduce public unity by 1 and increase passive income by 1 for each 100 money the player has (floored)
  updatedGs = {
    ...updatedGs,
    publicUnity: updatedGs.publicUnity - 1,
    passiveIncome: updatedGs.passiveIncome + Math.floor(updatedGs.money / 100),
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
