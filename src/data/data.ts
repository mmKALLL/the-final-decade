import { generateContract, generateHuman, generateUpgrade, generateYearlyContracts } from './data-generators'
import { Action, Contract, GameState, Upgrade, YearlyContract } from '../types'

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

export const yearlyContracts: YearlyContract[] = [
  {
    name: { 'en-US': 'Agentic Researchers', 'jp-FI': 'エージェント型研究AI' },
    rarity: 'epic',
    year: 2025,
    successDescription: { 'en-US': 'RP +10', 'jp-FI': 'RP +10' },
    requirementDescription: { 'en-US': 'Alignment focus >= 1', 'jp-FI': 'アラインメント受け入れ >= 1' },
    costDescription: { 'en-US': 'Alignment focus -2', 'jp-FI': 'アラインメント受け入れ -2' },
    onSuccess: [{ paramEffected: 'rp', amount: 10 }],
    requirements: [{ paramEffected: 'alignmentFocus', amount: 1 }],
    costs: [{ paramEffected: 'alignmentFocus', amount: -2 }]
  },
  {
    name: { 'en-US': 'Quantum Computing Breakthrough', 'jp-FI': '量子コンピュータの飛躍' },
    rarity: 'epic',
    year: 2025,
    successDescription: { 'en-US': 'EP +15', 'jp-FI': 'EP +15' },
    requirementDescription: { 'en-US': 'Trust >= 80', 'jp-FI': '信頼 >= 80' },
    costDescription: { 'en-US': 'SP -10', 'jp-FI': 'SP -10' },
    onSuccess: [{ paramEffected: 'ep', amount: 15 }],
    requirements: [{ paramEffected: 'trust', amount: 80 }],
    costs: [{ paramEffected: 'sp', amount: -10 }]
  },
  {
    name: { 'en-US': 'AI Regulation Crisis', 'jp-FI': 'AI規制の危機' },
    rarity: 'epic',
    year: 2026,
    successDescription: { 'en-US': 'Trust +30, Alignment focus -2', 'jp-FI': '信頼 +30、アラインメント受け入れ -2' },
    requirementDescription: { 'en-US': 'RP >= 50', 'jp-FI': 'RP >= 50' },
    costDescription: { 'en-US': 'Influence -15', 'jp-FI': '影響力 -15' },
    onSuccess: [{ paramEffected: 'trust', amount: 30 }, { paramEffected: 'alignmentFocus', amount: -2 }],
    requirements: [{ paramEffected: 'rp', amount: 50 }],
    costs: [{ paramEffected: 'influence', amount: -15 }]
  },
  {
    name: { 'en-US': 'Corporate AI Arms Race', 'jp-FI': '企業間AI軍拡競争' },
    rarity: 'epic',
    year: 2027,
    successDescription: { 'en-US': 'Money +50, Alignment focus -3', 'jp-FI': 'お金 +50、アラインメント受け入れ -3' },
    requirementDescription: { 'en-US': 'Money >= 200', 'jp-FI': 'お金 >= 200' },
    costDescription: { 'en-US': 'Trust -20', 'jp-FI': '信頼 -20' },
    onSuccess: [{ paramEffected: 'money', amount: 50 }, { paramEffected: 'alignmentFocus', amount: -3 }],
    requirements: [{ paramEffected: 'money', amount: 200 }],
    costs: [{ paramEffected: 'trust', amount: -20 }]
  },
  {
    name: { 'en-US': 'World War 3', 'jp-FI': '第３次世界大戦' },
    rarity: 'epic',
    year: 2028,
    successDescription: { 'en-US': 'Alignment focus +1, trust +20', 'jp-FI': 'アラインメント受け入れ +1、信頼 +20' },
    requirementDescription: { 'en-US': 'Trust >= 130', 'jp-FI': '信頼 >= 130' },
    costDescription: { 'en-US': 'SP -30', 'jp-FI': 'SP -30' },
    onSuccess: [{ paramEffected: 'trust', amount: 20 }, { paramEffected: 'alignmentFocus', amount: 1 }],
    requirements: [{ paramEffected: 'trust', amount: 130 }],
    costs: [{ paramEffected: 'sp', amount: -30 }]
  },
  {
    name: { 'en-US': 'Autonomous Nation Independence Declaration', 'jp-FI': '自律国家の独立宣言' },
    rarity: 'epic',
    year: 2028,
    successDescription: { 'en-US': 'Influence +40, Trust -10', 'jp-FI': '影響力 +40、信頼 -10' },
    requirementDescription: { 'en-US': 'Influence >= 150', 'jp-FI': '影響力 >= 150' },
    costDescription: { 'en-US': 'SP -20', 'jp-FI': 'SP -20' },
    onSuccess: [{ paramEffected: 'influence', amount: 40 }, { paramEffected: 'trust', amount: -10 }],
    requirements: [{ paramEffected: 'influence', amount: 150 }],
    costs: [{ paramEffected: 'sp', amount: -20 }]
  },
  {
    name: { 'en-US': 'AGI Deployment', 'jp-FI': '汎用的人工知能のデプロイ' },
    rarity: 'epic',
    year: 2029,
    successDescription: { 'en-US': 'Peaceful singularity', 'jp-FI': '人類絶滅なしのシンギュラリティ' },
    requirementDescription: { 'en-US': 'You must have 100+ ASI outcome by end of 2029', 'jp-FI': '2029年が終わるまでに百以上のASI受け入れが必然です' },
    costDescription: { 'en-US': 'Humans are gone forever', 'jp-FI': '人類の終わり' },
    onSuccess: [],
    requirements: [{ paramEffected: 'asiOutcome', amount: 100 }],
    costs: []
  }
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
