import { generateYearlyContracts, generateHuman, generateBreakthrough } from './data-generators'
import { GameState } from '../types'
import { generateContract } from './contract-generator'

const debug = true

const baseGameState: GameState = {
  debug,
  currentScreen: 'main',
  language: 'en-US',

  turn: 0,
  money: 100,
  passiveIncome: 0,
  asiOutcome: 50,
  publicUnity: -1,
  influence: 100,
  trust: 100,

  sp: 10 * (debug ? 10 : 1),
  ep: 10 * (debug ? 10 : 1),
  rp: 10 * (debug ? 10 : 1),
  up: 0,

  humans: [],
  breakthroughs: [],
  contracts: [],

  humanSelections: [],
  breakthroughSelections: [],
  contractSelections: [],

  yearlyContracts: generateYearlyContracts(),
  additionalActions: [],
}

export const initialGameState: GameState = {
  ...baseGameState,
  currentScreen: 'selection',
  contracts: [generateContract(baseGameState), generateContract(baseGameState), generateContract(baseGameState)],
  humanSelections: [
    [generateHuman(baseGameState, 100, 'common'), generateHuman(baseGameState, 100, 'common'), generateHuman(baseGameState, 100, 'common')],
    [generateHuman(baseGameState, 100, 'common'), generateHuman(baseGameState, 100, 'common'), generateHuman(baseGameState, 100, 'common')],
    [generateHuman(baseGameState, 100, 'common'), generateHuman(baseGameState, 100, 'common'), generateHuman(baseGameState, 100, 'common')],
  ],
  breakthroughSelections: [
    [
      generateBreakthrough(baseGameState, 100, 'uncommon'),
      generateBreakthrough(baseGameState, 100, 'uncommon'),
      generateBreakthrough(baseGameState, 100, 'uncommon'),
    ],
  ],
}
