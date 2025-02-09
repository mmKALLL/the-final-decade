import { generateHuman, generateUpgrade, generateYearlyContracts } from './data-generators'
import { Action, GameState } from '../types'
import { getRandomContract } from './contract-generator'

const initialActions: Action[] = [
  {
    name: { 'en-US': 'Apply for funding', 'jp-FI': 'お金を募集する' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'money', amount: 10 }],
  },

  {
    name: { 'en-US': 'Independent outreach', 'jp-FI': '個人的なネットワーキング' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'sp', amount: 2 }],
  },
  {
    name: { 'en-US': 'Independent development', 'jp-FI': '個人的な開発' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'ep', amount: 2 }],
  },
  {
    name: { 'en-US': 'Independent research', 'jp-FI': '個人的な研究' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'rp', amount: 2 }],
  },

  {
    name: { 'en-US': 'Recruit a human', 'jp-FI': '人材を増やす' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'sp', amount: -5 }],
    functionEffect: (gs) => ({
      ...gs,
      humanSelections: [...gs.humanSelections, [generateHuman(), generateHuman(), generateHuman()]],
    }),
  },
  {
    name: { 'en-US': 'Find new contracts', 'jp-FI': '契約を探す' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'ep', amount: -5 }],
    functionEffect: (gs) => ({
      ...gs,
      contracts: [getRandomContract(gs), getRandomContract(gs), getRandomContract(gs)],
    }),
  },
  {
    name: { 'en-US': 'Research an upgrade', 'jp-FI': 'アップグレードを研究する' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'rp', amount: -5 }],
    functionEffect: (gs) => ({
      ...gs,
      upgradeSelections: [...gs.upgradeSelections, [generateUpgrade(), generateUpgrade(), generateUpgrade()]],
    }),
  },
  {
    name: { 'en-US': 'Toggle language', 'jp-FI': '言語の切り替え' },
    turnCost: 0,
    turnsInvested: 0,
    effect: [],
    functionEffect: (gs) => ({ ...gs, language: gs.language === 'en-US' ? 'jp-FI' : 'en-US' }),
  },
]

export const initialGameState: GameState = {
  currentScreen: 'main',
  language: 'en-US',

  turn: 0,
  money: 100,
  passiveMoneyGain: 0,
  asiOutcome: 50,
  alignmentFocus: -1,
  influence: 100,
  trust: 100,

  sp: 5,
  ep: 5,
  rp: 5,

  humans: [],
  upgrades: [],
  contracts: [],

  humanSelections: [],
  upgradeSelections: [],
  contractSelections: [],

  yearlyContracts: generateYearlyContracts(),
  availableActions: initialActions,
}
