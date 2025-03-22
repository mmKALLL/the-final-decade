import { Action, GameState } from '../types'
import { refreshContracts } from './contract-generator'
import { generateHuman, generateBreakthrough } from './data-generators'

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
    effect: [{ paramEffected: 'sp', amount: gs.humans.length * -10 - 20 }],
    functionEffect: (gs) => ({
      ...gs,
      currentScreen: 'selection',
      humanSelections: [...gs.humanSelections, [generateHuman(gs), generateHuman(gs), generateHuman(gs)]],
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
    effect: [{ paramEffected: 'rp', amount: -80 }],
    functionEffect: (gs) => ({
      ...gs,
      currentScreen: 'selection',
      breakthroughSelections: [
        ...gs.breakthroughSelections,
        [generateBreakthrough(gs), generateBreakthrough(gs), generateBreakthrough(gs)],
      ],
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
    name: { 'en-US': 'Marketing campaign', 'jp-FI': '影響力を増やす' },
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
      { paramEffected: 'rp', amount: -gs.asiOutcome },
    ],
  },
  {
    eventId: 'influencePublicUnity',
    name: { 'en-US': 'Government lobbying', 'jp-FI': '治安を安定する' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [
      { paramEffected: 'publicUnity', amount: 1 },
      { paramEffected: 'passiveIncome', amount: -10 },
      { paramEffected: 'sp', amount: -50 },
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
