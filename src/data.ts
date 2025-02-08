import { generateContract, generateHuman, generateUpgrade } from './data-generators'
import { Action, Contract, GameState, Human, Upgrade } from './types'

const initialActions: Action[] = [
  {
    name: { 'en-US': 'Apply for funding', 'jp-JP': 'お金を募集する' },
    turnCost: 3,
    turnsInvested: 0,
    effect: [{ paramEffected: 'money', apply: (value) => value + 10 }],
  },
  {
    name: { 'en-US': 'Recruit a human', 'jp-JP': '人材を増やす' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [
      { paramEffected: 'sp', apply: (value) => value - 10 },
    ],
    functionEffect: (gs) => ({ ...gs, humanSelections: [...gs.humanSelections, [generateHuman(), generateHuman(), generateHuman()]] }),
  },
  {
    name: { 'en-US': 'Find a contract', 'jp-JP': '契約を探す' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [],
    functionEffect: (gs) => ({ ...gs, contractSelections: [...gs.contractSelections, [generateContract(), generateContract(), generateContract()]] }),
  },
  {
    name: { 'en-US': 'Research an upgrade', 'jp-JP': 'アップグレードを研究する' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [
      { paramEffected: 'rp', apply: (value) => value - 10 },
    ],
    functionEffect: (gs) => ({ ...gs, upgradeSelections: [...gs.upgradeSelections, [generateUpgrade(), generateUpgrade(), generateUpgrade()]] }),
  }, {
    name: { 'en-US': 'Toggle language', 'jp-JP': '言語の切り替え' },
    turnCost: 0,
    turnsInvested: 0,
    effect: [],
    functionEffect: (gs) => ({ ...gs, language: gs.language === 'en-US' ? 'jp-JP' : 'en-US' }),
  },
]

const bossContracts: Contract[] = [
  {
    name: { 'en-US': 'Boss Contract 1', 'jp-JP': 'ボス契約1' },
    rarity: 'epic',
    requirementDescription: { 'en-US': 'desc', 'jp-JP': 'desc' },
    successDescription: { 'en-US': 'desc', 'jp-JP': 'desc' },
    requirements: [{ paramEffected: 'rp', apply: (value) => value - 10 }],
    onSuccess: [{ paramEffected: 'money', apply: (value) => value + 10 }],
  },
  {
    name: { 'en-US': 'Boss Contract 2', 'jp-JP': 'ボス契約2' },
    rarity: 'epic',
    requirementDescription: { 'en-US': 'desc', 'jp-JP': 'desc' },
    successDescription: { 'en-US': 'desc', 'jp-JP': 'desc' },
    requirements: [{ paramEffected: 'rp', apply: (value) => value - 10 }],
    onSuccess: [{ paramEffected: 'money', apply: (value) => value + 10 }],
  }
]

export const initialGameState: GameState = {
  currentScreen: 'main',
  language: 'en-US',

  turn: 0,
  money: 100,
  passiveMoneyGain: 0,
  asiOutcome: 50,
  alignmentAcceptance: -1,
  influence: 100,
  trust: 100,

  rp: 0,
  ep: 0,
  sp: 0,

  humans: [],
  upgrades: [],
  contracts: [],

  humanSelections: [],
  upgradeSelections: [],
  contractSelections: [],

  bossContracts: bossContracts,
  availableActions: initialActions,
}

// Humans for the game, in the style of Rimworld
export const humans: Human[] = [
  {
    name: { 'en-US': 'John Doe', 'jp-JP': 'ジョン・ドウ' },
    rarity: 'common',
    wage: 10,
    rank: 'junior',
    spGeneration: 1,
    epGeneration: 0,
    rpGeneration: 0,
  },
  {
    name: { 'en-US': 'Jane Doe', 'jp-JP': 'ジェーン・ドウ' },
    rarity: 'common',
    wage: 10,
    rank: 'junior',
    spGeneration: 0,
    epGeneration: 1,
    rpGeneration: 0,
  },
  {
    name: { 'en-US': 'Alice', 'jp-JP': 'アリス' },
    rarity: 'rare',
    wage: 20,
    rank: 'senior',
    spGeneration: 1,
    epGeneration: 2,
    rpGeneration: 2,
  },
  {
    name: { 'en-US': 'Bob', 'jp-JP': 'ボブ' },
    rarity: 'rare',
    wage: 20,
    rank: 'senior',
    spGeneration: 2,
    epGeneration: 2,
    rpGeneration: 2,
  },
  {
    name: { 'en-US': 'Charlie', 'jp-JP': 'チャーリー' },
    rarity: 'epic',
    wage: 30,
    rank: 'lead',
    spGeneration: 3,
    epGeneration: 3,
    rpGeneration: 3,
  },
  {
    name: { 'en-US': 'David', 'jp-JP': 'デイビッド' },
    rarity: 'epic',
    wage: 30,
    rank: 'lead',
    spGeneration: 3,
    epGeneration: 3,
    rpGeneration: 3,
  },
]

export const contracts: Contract[] = [

  {
    name: { 'en-US': 'Contract 1', 'jp-JP': '契約1' },
    rarity: 'common',
    requirementDescription: { 'en-US': 'desc', 'jp-JP': 'desc' },
    successDescription: { 'en-US': 'desc', 'jp-JP': 'desc' },
    requirements: [{ paramEffected: 'rp', apply: (value) => value - 10 }],
    onSuccess: [{ paramEffected: 'money', apply: (value) => value + 10 }],
  }
]

export const upgrades: Upgrade[] = [
  {
    name: { 'en-US': 'Upgrade 1', 'jp-JP': 'アップグレード1' },
    description: { 'en-US': 'desc', 'jp-JP': 'desc' },
    rarity: 'common',
    level: 0,
    maxLevel: 1,
    effect: [{ paramEffected: 'rp', apply: (value) => value + 10 }],
  }
]
