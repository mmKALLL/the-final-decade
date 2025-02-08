import { generateContract, generateHuman, generateUpgrade, generateYearlyContracts } from './data-generators'
import { Action, Contract, GameState, Upgrade, } from '../types'

const initialActions: Action[] = [
  {
    name: { 'en-US': 'Apply for funding', 'jp-FI': 'お金を募集する' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'money', amount: 10 }],
  },
  {
    name: { 'en-US': 'Recruit a human', 'jp-FI': '人材を増やす' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [
      { paramEffected: 'sp', amount: -5 },
    ],
    functionEffect: (gs) => ({ ...gs, humanSelections: [...gs.humanSelections, [generateHuman(), generateHuman(), generateHuman()]] }),
  },
  {
    name: { 'en-US': 'Find a contract', 'jp-FI': '契約を探す' },
    description: { 'en-US': '', 'jp-FI': '' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [],
    functionEffect: (gs) => ({ ...gs, contractSelections: [...gs.contractSelections, [generateContract(), generateContract(), generateContract()]] }),
  },
  {
    name: { 'en-US': 'Research an upgrade', 'jp-FI': 'アップグレードを研究する' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [
      { paramEffected: 'rp', amount: -5 },
    ],
    functionEffect: (gs) => ({ ...gs, upgradeSelections: [...gs.upgradeSelections, [generateUpgrade(), generateUpgrade(), generateUpgrade()]] }),
  }, {
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

  rp: 5,
  ep: 5,
  sp: 5,

  humans: [],
  upgrades: [],
  contracts: [],

  humanSelections: [],
  upgradeSelections: [],
  contractSelections: [],

  yearlyContracts: generateYearlyContracts(),
  availableActions: initialActions,
}

export const contracts: Contract[] = [

  {
    name: { 'en-US': 'Contract 1', 'jp-FI': '契約1' },
    rarity: 'common',
    requirementDescription: { 'en-US': 'desc', 'jp-FI': 'desc' },
    successDescription: { 'en-US': 'desc', 'jp-FI': 'desc' },
    costDescription: { 'en-US': 'desc', 'jp-FI': 'desc' },
    requirements: [{ paramEffected: 'rp', amount: -10 }],
    costs: [{ paramEffected: 'money', amount: -10 }],
    onSuccess: [{ paramEffected: 'money', amount: 10 }],
  }
]

export const upgrades: Upgrade[] = [
  {
    name: { 'en-US': 'Upgrade 1', 'jp-FI': 'アップグレード1' },
    description: { 'en-US': 'desc', 'jp-FI': 'desc' },
    rarity: 'common',
    level: 0,
    maxLevel: 1,
    effect: [{ paramEffected: 'rp', amount: 10 }],
  }
]
