import { GameState } from './types'

export const initialGameState: GameState = {
  currentScreen: 'main',

  turn: 0,
  money: 0,
  passiveMoneyGain: 0,
  asiOutcome: 0,
  alignmentAcceptance: 0,
  influence: 0,
  trust: 0,

  rp: 0,
  ep: 0,
  sp: 0,

  humans: [],
  upgrades: [],
  contracts: [],

  humanSelections: [],
  upgradeSelections: [],
  contractSelections: [],

  availableActions: [],
  recentActions: [],
  recentGS: [],
}
