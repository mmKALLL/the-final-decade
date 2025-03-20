import { Effect, GameState, Param, SingleEffect } from './types'

export const getYear = (turn: number) => Math.floor(turn / 12) + 1
export const isGameOver = (gs: GameState) => gs.asiOutcome <= 0 || gs.alignmentFocus <= 0 || gs.money <= 0
export const isGameWon = (gs: GameState) => (getYear(gs.turn) >= 6 && gs.asiOutcome >= 100) || gs.alignmentFocus >= 100

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
    case 'trust':            return 'trust'
    case 'alignmentFocus':   return 'alignment focus'
    case 'asiOutcome':       return 'ASI outcome'
    case 'influence':        return 'influence'
    case 'rp':               return 'RP'
    case 'ep':               return 'EP'
    case 'sp':               return 'SP'
    case 'humanSelection':   return 'human selection'
    case 'upgradeSelection': return 'upgrade selection'
    default: return assertNever(p)
  }
}
