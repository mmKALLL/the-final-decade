import { generateYearlyContracts } from './data-generators'
import { GameState } from '../types'
import { generateContract } from './contract-generator'

const baseGameState: GameState = {
  currentScreen: 'main',
  language: 'en-US',

  turn: 0,
  money: 100,
  passiveIncome: 0,
  asiOutcome: 50,
  publicUnity: -1,
  influence: 100,
  trust: 100,

  sp: 10,
  ep: 10,
  rp: 10,
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
  contracts: [generateContract(baseGameState), generateContract(baseGameState), generateContract(baseGameState)],
}
