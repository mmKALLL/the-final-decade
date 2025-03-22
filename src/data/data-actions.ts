import { generateUpgrade } from './data-generators'
import { Action } from '../types'
import { generateContract } from './contract-generator'
import { generateHuman } from './data-generators'

export const initialActions: Action[] = [
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
    effect: [{ paramEffected: 'sp', amount: 3 }],
  },
  {
    name: { 'en-US': 'Independent engineering', 'jp-FI': '個人的な開発' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'ep', amount: 3 }],
  },
  {
    name: { 'en-US': 'Independent research', 'jp-FI': '個人的な研究' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'rp', amount: 3 }],
  },
  {
    name: { 'en-US': 'Work on upgrades', 'jp-FI': 'アップグレード作業' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'up', amount: 1 }],
  },
  {
    name: { 'en-US': 'Recruit a human', 'jp-FI': '人材を増やす' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'sp', amount: -10 }],
    functionEffect: (gs) => ({
      ...gs,
      currentScreen: 'selection',
      humanSelections: [...gs.humanSelections, [generateHuman(gs), generateHuman(gs), generateHuman(gs)]],
    }),
  },
  {
    name: { 'en-US': 'Refresh contracts', 'jp-FI': '契約を探す' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'ep', amount: -10 }],
    functionEffect: (gs) => ({
      ...gs,
      currentScreen: 'selection',
      contractSelections: [...gs.contractSelections, [generateContract(gs), generateContract(gs), generateContract(gs)]],
    }),
  },
  {
    name: { 'en-US': 'Research a breakthrough', 'jp-FI': '突破を研究する' },
    turnCost: 1,
    turnsInvested: 0,
    effect: [{ paramEffected: 'rp', amount: -10 }],
    functionEffect: (gs) => ({
      ...gs,
      currentScreen: 'selection',
      upgradeSelections: [...gs.upgradeSelections, [generateUpgrade(gs), generateUpgrade(gs), generateUpgrade(gs)]],
    }),
  },
]

export const languageToggleAction: Action = {
  name: { 'en-US': 'Toggle language', 'jp-FI': '言語の切り替え' },
  turnCost: 0,
  turnsInvested: 0,
  effect: [],
  functionEffect: (gs) => ({ ...gs, language: gs.language === 'en-US' ? 'jp-FI' : 'en-US' }),
}
