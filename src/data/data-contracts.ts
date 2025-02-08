import { YearlyContract } from '../types'

export const yearlyContracts: YearlyContract[] = [
  // === 2025 ===
  {
    name: { 'en-US': 'Agentic Researchers', 'jp-FI': 'エージェント型研究AI' },
    rarity: 'epic',
    year: 2025,
    successDescription: { 'en-US': 'RP +10', 'jp-FI': 'RP +10' },
    requirementDescription: { 'en-US': 'Alignment focus >= 1', 'jp-FI': 'アラインメント受け入れ >= 1' },
    costDescription: { 'en-US': 'Alignment focus -2', 'jp-FI': 'アラインメント受け入れ -2' },
    onSuccess: [{ paramEffected: 'rp', amount: 10 }],
    requirements: [{ paramEffected: 'alignmentFocus', amount: 1 }],
    costs: [{ paramEffected: 'alignmentFocus', amount: -2 }],
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
    costs: [{ paramEffected: 'sp', amount: -10 }],
  },
  {
    name: { 'en-US': 'Global Energy Crisis', 'jp-FI': '世界的エネルギー危機' },
    rarity: 'epic',
    year: 2025,
    successDescription: { 'en-US': 'Influence +20, Money +30', 'jp-FI': '影響力 +20、お金 +30' },
    requirementDescription: { 'en-US': 'Money >= 50', 'jp-FI': 'お金 >= 50' },
    costDescription: { 'en-US': 'Trust -10', 'jp-FI': '信頼 -10' },
    onSuccess: [
      { paramEffected: 'influence', amount: 20 },
      { paramEffected: 'money', amount: 30 },
    ],
    requirements: [{ paramEffected: 'money', amount: 50 }],
    costs: [{ paramEffected: 'trust', amount: -10 }],
  },

  // === 2026 ===
  {
    name: { 'en-US': 'The AI Schism', 'jp-FI': 'AIの分裂' },
    rarity: 'epic',
    year: 2026,
    successDescription: { 'en-US': 'Alignment Focus +3, Trust -25', 'jp-FI': 'アラインメントフォーカス +3、信頼 -25' },
    requirementDescription: {
      'en-US': 'Must choose between decentralized AI and corporate AI.',
      'jp-FI': '分散型AIと企業型AIのどちらかを選択しなければならない。',
    },
    costDescription: { 'en-US': 'Influence -20', 'jp-FI': '影響力 -20' },
    onSuccess: [
      { paramEffected: 'alignmentFocus', amount: 3 },
      { paramEffected: 'trust', amount: -25 },
    ],
    requirements: [],
    costs: [{ paramEffected: 'influence', amount: -20 }],
  },
  {
    name: { 'en-US': 'AI Regulation Crisis', 'jp-FI': 'AI規制の危機' },
    rarity: 'epic',
    year: 2026,
    successDescription: {
      'en-US': 'Trust +30, Alignment focus -2',
      'jp-FI': '信頼 +30、アラインメント受け入れ -2',
    },
    requirementDescription: { 'en-US': 'RP >= 50', 'jp-FI': 'RP >= 50' },
    costDescription: { 'en-US': 'Influence -15', 'jp-FI': '影響力 -15' },
    onSuccess: [
      { paramEffected: 'trust', amount: 30 },
      { paramEffected: 'alignmentFocus', amount: -2 },
    ],
    requirements: [{ paramEffected: 'rp', amount: 50 }],
    costs: [{ paramEffected: 'influence', amount: -15 }],
  },
  {
    name: { 'en-US': 'AI Workforce Automation', 'jp-FI': 'AIによる労働力の自動化' },
    rarity: 'epic',
    year: 2026,
    successDescription: { 'en-US': 'Money +40, Trust -15', 'jp-FI': 'お金 +40、信頼 -15' },
    requirementDescription: { 'en-US': 'EP >= 60', 'jp-FI': 'EP >= 60' },
    costDescription: { 'en-US': 'SP -20', 'jp-FI': 'SP -20' },
    onSuccess: [
      { paramEffected: 'money', amount: 40 },
      { paramEffected: 'trust', amount: -15 },
    ],
    requirements: [{ paramEffected: 'ep', amount: 60 }],
    costs: [{ paramEffected: 'sp', amount: -20 }],
  },

  // === 2027 ===
  {
    name: { 'en-US': 'Corporate AI Arms Race', 'jp-FI': '企業間AI軍拡競争' },
    rarity: 'epic',
    year: 2027,
    successDescription: {
      'en-US': 'Money +50, Alignment focus -3',
      'jp-FI': 'お金 +50、アラインメント受け入れ -3',
    },
    requirementDescription: { 'en-US': 'Money >= 200', 'jp-FI': 'お金 >= 200' },
    costDescription: { 'en-US': 'Trust -20', 'jp-FI': '信頼 -20' },
    onSuccess: [
      { paramEffected: 'money', amount: 50 },
      { paramEffected: 'alignmentFocus', amount: -3 },
    ],
    requirements: [{ paramEffected: 'money', amount: 200 }],
    costs: [{ paramEffected: 'trust', amount: -20 }],
  },
  {
    name: { 'en-US': 'Mass AI Layoffs', 'jp-FI': 'AIによる大量解雇' },
    rarity: 'epic',
    year: 2027,
    successDescription: { 'en-US': 'Money +60, Trust -30', 'jp-FI': 'お金 +60、信頼 -30' },
    requirementDescription: { 'en-US': 'Influence >= 100', 'jp-FI': '影響力 >= 100' },
    costDescription: { 'en-US': 'SP -25', 'jp-FI': 'SP -25' },
    onSuccess: [
      { paramEffected: 'money', amount: 60 },
      { paramEffected: 'trust', amount: -30 },
    ],
    requirements: [{ paramEffected: 'influence', amount: 100 }],
    costs: [{ paramEffected: 'sp', amount: -25 }],
  },
  {
    name: { 'en-US': 'The Great Algorithmic Blackout', 'jp-FI': '大規模アルゴリズムブラックアウト' },
    rarity: 'epic',
    year: 2027,
    successDescription: { 'en-US': 'Trust -50, Money +80', 'jp-FI': '信頼 -50、お金 +80' },
    requirementDescription: { 'en-US': 'SP >= 100', 'jp-FI': 'SP >= 100' },
    costDescription: { 'en-US': 'Alignment Focus -4', 'jp-FI': 'アラインメントフォーカス -4' },
    onSuccess: [
      { paramEffected: 'money', amount: 80 },
      { paramEffected: 'trust', amount: -50 },
    ],
    requirements: [{ paramEffected: 'sp', amount: 100 }],
    costs: [{ paramEffected: 'alignmentFocus', amount: -4 }],
  },

  // === 2028 ===
  {
    name: { 'en-US': 'Synthetic Consciousness Rights', 'jp-FI': '人工意識の権利' },
    rarity: 'epic',
    year: 2028,
    successDescription: { 'en-US': 'Alignment Focus +5, Trust -30', 'jp-FI': 'アラインメントフォーカス +5、信頼 -30' },
    requirementDescription: { 'en-US': 'Influence >= 250', 'jp-FI': '影響力 >= 250' },
    costDescription: { 'en-US': 'Money -50', 'jp-FI': 'お金 -50' },
    onSuccess: [
      { paramEffected: 'alignmentFocus', amount: 5 },
      { paramEffected: 'trust', amount: -30 },
    ],
    requirements: [{ paramEffected: 'influence', amount: 250 }],
    costs: [{ paramEffected: 'money', amount: -50 }],
  },

  {
    name: { 'en-US': 'Autonomous Nation Independence Declaration', 'jp-FI': '自律国家の独立宣言' },
    rarity: 'epic',
    year: 2028,
    successDescription: { 'en-US': 'Influence +40, Trust -10', 'jp-FI': '影響力 +40、信頼 -10' },
    requirementDescription: { 'en-US': 'Influence >= 150', 'jp-FI': '影響力 >= 150' },
    costDescription: { 'en-US': 'SP -20', 'jp-FI': 'SP -20' },
    onSuccess: [
      { paramEffected: 'influence', amount: 40 },
      { paramEffected: 'trust', amount: -10 },
    ],
    requirements: [{ paramEffected: 'influence', amount: 150 }],
    costs: [{ paramEffected: 'sp', amount: -20 }],
  },
  {
    name: { 'en-US': 'AGI Safety Treaty', 'jp-FI': 'AGI安全条約' },
    rarity: 'epic',
    year: 2028,
    successDescription: {
      'en-US': 'Trust +50, Alignment focus +3',
      'jp-FI': '信頼 +50、アラインメント受け入れ +3',
    },
    requirementDescription: { 'en-US': 'Trust >= 200', 'jp-FI': '信頼 >= 200' },
    costDescription: { 'en-US': 'Influence -30', 'jp-FI': '影響力 -30' },
    onSuccess: [
      { paramEffected: 'trust', amount: 50 },
      { paramEffected: 'alignmentFocus', amount: 3 },
    ],
    requirements: [{ paramEffected: 'trust', amount: 200 }],
    costs: [{ paramEffected: 'influence', amount: -30 }],
  },

  // === 2029 ===
  {
    name: { 'en-US': 'AGI Deployment', 'jp-FI': '汎用的人工知能のデプロイ' },
    rarity: 'epic',
    year: 2029,
    successDescription: { 'en-US': 'Peaceful singularity', 'jp-FI': '人類絶滅なしのシンギュラリティ' },
    requirementDescription: {
      'en-US': 'You must have 100+ ASI outcome by end of 2029',
      'jp-FI': '2029年が終わるまでに百以上のASI受け入れが必然です',
    },
    costDescription: { 'en-US': 'Humans are gone forever', 'jp-FI': '人類の終わり' },
    onSuccess: [],
    requirements: [{ paramEffected: 'asiOutcome', amount: 100 }],
    costs: [],
  },
]
