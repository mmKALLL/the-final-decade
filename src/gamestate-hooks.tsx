import { createContext, JSX } from 'preact'
import { initialGameState } from './data/data-gamestate'
import { useContext, useReducer } from 'preact/hooks'
import { Action, Effect, GameState } from './types'
import { generateHuman, generateBreakthrough } from './data/data-generators'

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

export function reduceAction(gs: GameState, action: Action): GameState {
  if (action.enabledCondition && !action.enabledCondition(gs)) {
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

export function handleTurn(gs: GameState): GameState {
  const moneyGain = gs.passiveIncome
  const spGain = gs.humans.reduce((acc, human) => acc + human.spGeneration, 0)
  const epGain = gs.humans.reduce((acc, human) => acc + human.epGeneration, 0)
  const rpGain = gs.humans.reduce((acc, human) => acc + human.rpGeneration, 0)

  return {
    ...gs,
    turn: gs.turn + 1,
    money: gs.money + moneyGain,
    sp: gs.sp + spGain,
    ep: gs.ep + epGain,
    rp: gs.rp + rpGain,
  }
}
