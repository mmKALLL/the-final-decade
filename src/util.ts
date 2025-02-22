import { GameState } from './types'

export const getYear = (turn: number) => Math.floor(turn / 12) + 1
export const isGameOver = (gs: GameState) => gs.asiOutcome <= 0 || gs.alignmentFocus <= 0 || gs.money <= 0
export const isGameWon = (gs: GameState) =>
  (getYear(gs.turn) >= 6 && gs.asiOutcome >= 100) || gs.alignmentFocus >= 100

export const assertNever = (x: never): never => {
  throw new Error('Unexpected object: ' + x)
}
  
