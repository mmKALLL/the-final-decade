import { createContext, JSX } from 'preact'
import { initialGameState } from './data'
import { useContext, useReducer } from 'preact/hooks'
import { Action, Effect, GameState } from './types'

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
  if (action.enabledCondition && action.enabledCondition(gs)) {
    return gs // Return early if action is not applicable
  }

  action.turnsInvested++
  if (action.turnCost <= action.turnsInvested) {
    action.turnsInvested = 0
  }

  // Advance the action's turnsInvested in GS
  const updatedActions = gs.availableActions.map((a) => (a.name === action.name ? action : a))
  let updatedGs = { ...gs, availableActions: updatedActions }

  if (action.turnsInvested === 0) {
    updatedGs = action.functionEffect ? action.functionEffect(updatedGs) : updatedGs
    updatedGs = reduceEffect(action.effect, updatedGs, 0)
  }

  if (action.turnCost != 0) {
    updatedGs = handleTurn(updatedGs)
  }

  return updatedGs
}

export function reduceEffect(effect: Effect, gameState: GameState, depth: number): GameState {
  return effect.reduce((gs, singleEffect) => {
    const { apply, paramEffected } = singleEffect
    const currentValue = gs[paramEffected]
    const updatedValue = apply(currentValue)
    const baseAmount = updatedValue - currentValue
    const updatedGs = { ...gs, [singleEffect.paramEffected]: updatedValue }

    // If this is the first effect on stack, apply effects from upgrades
    if (baseAmount > 0 && depth === 0) {
      const upgradeEffects = gameState.upgrades
        .flatMap((upgrade) => upgrade.effect)
        .filter((effect) => !effect.condition || effect.condition(gs, paramEffected, baseAmount))
      return reduceEffect(upgradeEffects, updatedGs, depth + 1)
    }

    return updatedGs
  }, gameState)
}

export function handleTurn(gs: GameState): GameState {
  const moneyGain = gs.passiveMoneyGain
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
