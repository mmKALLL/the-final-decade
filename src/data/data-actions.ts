import { Action, GameState, Breakthrough, Contract, Effect } from '../types'
import { levelUpCost } from '../util'
import { refreshContracts } from './contract-generator'
import { generateHumanSelection, generateBreakthroughSelection } from './data-generators'

export const firstOrderActions: (gs: GameState) => Action[] = (gs) => [
  {
    eventId: 'independentOutreach',
    name: { 'en-US': 'Independent outreach', 'jp-FI': '個人的なネットワーキング' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'sp', amount: 3 }],
  },
  {
    eventId: 'independentEngineering',
    name: { 'en-US': 'Independent engineering', 'jp-FI': '個人的な開発' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'ep', amount: 3 }],
  },
  {
    eventId: 'independentResearch',
    name: { 'en-US': 'Independent research', 'jp-FI': '個人的な研究' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'rp', amount: 3 }],
  },
  {
    eventId: 'applyForFunding',
    name: { 'en-US': 'Apply for funding', 'jp-FI': 'お金を募集する' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'money', amount: Math.round((10 * gs.trust) / 100) }],
  },
]

export const secondOrderActions: (gs: GameState) => Action[] = (gs) => [
  {
    eventId: 'recruitHuman',
    name: { 'en-US': 'Recruit a human', 'jp-FI': '人材を増やす' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'sp', amount: gs.humans.length * -10 }],
    functionEffect: (gs) => ({
      ...gs,
      currentScreen: 'selection',
      humanSelections: [...gs.humanSelections, generateHumanSelection(gs)],
    }),
  },
  {
    eventId: 'refreshContracts',
    name: { 'en-US': 'Refresh contracts', 'jp-FI': '契約を探す' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'ep', amount: -10 }],
    functionEffect: refreshContracts,
  },
  {
    eventId: 'researchBreakthrough',
    name: { 'en-US': 'Make a breakthrough', 'jp-FI': '突破を研究する' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'rp', amount: -50 }],
    functionEffect: (gs) => ({
      ...gs,
      currentScreen: 'selection',
      breakthroughSelections: [...gs.breakthroughSelections, generateBreakthroughSelection(gs)],
    }),
  },
  {
    eventId: 'gainUpgradePoint',
    name: { 'en-US': 'Work on upgrades', 'jp-FI': 'アップグレード作業' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'up', amount: 1 }],
  },
]

export const thirdOrderActions: (gs: GameState) => Action[] = (gs) => [
  {
    eventId: 'buildTrust',
    name: { 'en-US': 'Build trust', 'jp-FI': '信頼を作る' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [
      { paramEffected: 'trust', amount: 10 },
      { paramEffected: 'sp', amount: -40 },
    ],
  },
  {
    eventId: 'increaseInfluence',
    name: { 'en-US': 'Influencer marketing', 'jp-FI': '影響力を増やす' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [
      { paramEffected: 'influence', amount: 10 },
      { paramEffected: 'money', amount: -100 },
    ],
  },
  {
    eventId: 'influenceAsiOutcome',
    name: { 'en-US': 'Alignment research', 'jp-FI': 'アライメント研究' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [
      { paramEffected: 'asiOutcome', amount: 10 },
      { paramEffected: 'rp', amount: -Math.max(gs.asiOutcome, 20) },
    ],
  },
  {
    eventId: 'influencePublicUnity',
    name: { 'en-US': 'Government lobbying', 'jp-FI': '治安を安定する' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [
      { paramEffected: 'publicUnity', amount: 1 },
      { paramEffected: 'passiveIncome', amount: Math.round(-10 / (gs.influence / 100)) },
      { paramEffected: 'sp', amount: Math.round(-200 + gs.influence) },
    ],
  },
]

export const languageToggleAction: Action = {
  eventId: 'internalStateChange',
  name: { 'en-US': 'Toggle language', 'jp-FI': '言語の切り替え' },
  turnCost: 0,
  turnsInvested: 0,
  effect: [],
  functionEffect: (gs) => ({ ...gs, language: gs.language === 'en-US' ? 'jp-FI' : 'en-US' }),
}

const convertRequirementsToCondition = (requirements: Effect): ((gs: GameState) => boolean) => {
  return (gs: GameState) =>
    requirements.every(
      (req) =>
        req.paramEffected !== 'humanSelection' && req.paramEffected !== 'breakthroughSelection' && gs[req.paramEffected] >= req.amount
    )
}

export const convertContractToAction = (contract: Contract): Action => ({
  ...contract,
  eventId: 'internalStateChange',
  enabledCondition: convertRequirementsToCondition(contract.requirements),
  effect: [...contract.onSuccess, ...contract.costs],
  turnCost: 1,
  turnsInvested: 0,
  // Remove the contract from the GS, filter based on name since there's no id
  functionEffect: (gs) => {
    return {
      ...gs,
      contracts: gs.contracts.filter((c) => c.name['en-US'] !== contract.name['en-US']),
    }
  },
})

export const levelUpBreakthroughAction = (breakthrough: Breakthrough): Action => {
  return {
    eventId: 'levelUpBreakthrough',
    name: {
      'en-US': `Level up ${breakthrough.name['en-US']}`,
      'jp-FI': `レベルアップ: ${breakthrough.name['jp-FI']}`,
    },
    turnCost: 1,
    turnsInvested: 0,
    enabledCondition: (gs) => gs.up >= levelUpCost(breakthrough) && breakthrough.level < breakthrough.maxLevel,
    effect: [{ paramEffected: 'up', amount: -levelUpCost(breakthrough) }],
    functionEffect: (gs) => {
      // Create a new breakthroughs array with the leveled up breakthrough
      const updatedBreakthroughs = gs.breakthroughs.map((b) => (b.id === breakthrough.id ? { ...b, level: b.level + 1 } : b))

      return {
        ...gs,
        breakthroughs: updatedBreakthroughs,
      }
    },
  }
}
