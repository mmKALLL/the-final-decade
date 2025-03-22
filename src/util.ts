import { Effect, GameState, Param, SingleEffect } from './types'

export const getYear = (turn: number) => Math.floor(turn / 12) + 1
export const isGameOver = (gs: GameState) => gs.asiOutcome <= 0 || gs.publicUnity <= 0 || gs.money <= 0
export const isGameWon = (gs: GameState) => (getYear(gs.turn) >= 6 && gs.asiOutcome >= 100) || gs.publicUnity >= 100

export const assertNever = (x: never): never => {
  throw new Error('Unexpected object: ' + x)
}

export const effectToString = (e: Effect): string => e.map(singleEffectToString).join(', ')

const singleEffectToString = ({ paramEffected, amount }: SingleEffect) =>
  `${paramToLabel(paramEffected)} ${withPlusSign(Math.round(amount))}${paramEffected === 'money' ? 'k' : ''}`

const withPlusSign = (value: number) => (value > 0 ? `+${value}` : `${value}`)

const paramToLabel = (p: Param): string => {
  // prettier-ignore
  switch (p) {
    case 'turn':             return 'turn'
    case 'money':            return 'money'
    case 'passiveIncome':    return 'passive income'
    case 'trust':            return 'trust'
    case 'publicUnity':      return 'public unity'
    case 'asiOutcome':       return 'ASI outcome'
    case 'influence':        return 'influence'
    case 'rp':               return 'RP'
    case 'ep':               return 'EP'
    case 'sp':               return 'SP'
    case 'up':               return 'UP'
    case 'humanSelection':   return 'new human'
    case 'breakthroughSelection': return 'new breakthrough'
    default: return assertNever(p)
  }
}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const convertRequirementsToCondition = (requirements: Effect): ((gs: GameState) => boolean) => {
  return (gs: GameState) =>
    requirements.every(
      (req) =>
        req.paramEffected !== 'humanSelection' && req.paramEffected !== 'breakthroughSelection' && gs[req.paramEffected] >= req.amount
    )
}
