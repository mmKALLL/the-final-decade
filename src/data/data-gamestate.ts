import { generateYearlyContracts, generateHumanSelection, generateBreakthroughSelection } from './data-generators'
import { GameState } from '../types'
import { refreshContracts } from './contract-generator'

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

  sp: 20 * (debug ? 10 : 1),
  ep: 20 * (debug ? 10 : 1),
  rp: 20 * (debug ? 10 : 1),
  up: 0,

  humans: [],
  breakthroughs: [],
  contracts: [],

  humanSelections: [],
  breakthroughSelections: [],
  contractSelections: [],

  maxContracts: 3,
  yearlyContracts: generateYearlyContracts(),
  additionalActions: [],
}

export const initialGameState: GameState = {
  ...refreshContracts(baseGameState),
  currentScreen: 'selection',
  humanSelections: [
    generateHumanSelection(baseGameState, 100, 'common'),
    generateHumanSelection(baseGameState, 100, 'common'),
    generateHumanSelection(baseGameState, 100, 'common'),
  ],
  breakthroughSelections: [generateBreakthroughSelection(baseGameState, 100, 'uncommon')],
}
