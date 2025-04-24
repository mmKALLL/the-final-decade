import { YearlyContract } from '../types'

// General curve (with 3 common humans and 1 breakthrough start):

// 2025: 60
// 2026: 120
// 2027: 220
// 2028: 330
// 2029: 500

// General curve (with 2/1 common/uncommon humans and 2 breakthroughs start):

// 2025: 70
// 2026: 140
// 2027: 240
// 2028: 360
// 2029: 540

// Each year should have one goal with
// - low immediate cost but high requirement (sp)
// - low immediate cost but high long-term cost (ep) - unity cost most common
// - high short-term cost (rp)

export const yearlyContracts: YearlyContract[] = [
  // === 2025 ===
  {
    name: { 'en-US': 'Global Energy Crisis', 'jp-FI': '世界的エネルギー危機' },
    rarity: 'epic',
    year: 2025,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '💬 -40', 'jp-FI': '💬 -40' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [{ paramEffected: 'trust', amount: 110 }],
    costs: [{ paramEffected: 'sp', amount: -40 }],
  },
  {
    name: { 'en-US': 'Agentic Researchers', 'jp-FI': 'エージェント型研究AI' },
    rarity: 'epic',
    year: 2025,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🔧 -40, income -10', 'jp-FI': '🔧 -40、収入 -10' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [
      { paramEffected: 'ep', amount: -40 },
      { paramEffected: 'passiveIncome', amount: -10 },
    ],
  },
  {
    name: { 'en-US': 'Interpretability Divestment', 'jp-FI': '解釈可能性の放棄' },
    rarity: 'epic',
    year: 2025,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🧪 -20, Public unity -1', 'jp-FI': '🧪 -20、公共団結 -1' },
    requirementDescription: { 'en-US': '🧪 >= 60', 'jp-FI': '🧪 >= 60' },
    onSuccess: [],
    requirements: [{ paramEffected: 'rp', amount: 60 }],
    costs: [
      { paramEffected: 'rp', amount: -20 },
      { paramEffected: 'publicUnity', amount: -1 },
    ],
  },

  // === 2026 ===

  {
    name: { 'en-US': 'AI Regulation Crisis', 'jp-FI': 'AI規制の危機' },
    rarity: 'epic',
    year: 2026,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '💬 -60', 'jp-FI': '💬 -60' },
    requirementDescription: { 'en-US': 'ASI outcome >= 50', 'jp-FI': 'ASI結果 >= 50' },
    onSuccess: [],
    requirements: [{ paramEffected: 'asiOutcome', amount: 50 }],
    costs: [{ paramEffected: 'sp', amount: -60 }],
  },
  {
    name: { 'en-US': 'AI Workforce Automation', 'jp-FI': 'AIによる労働力の自動化' },
    rarity: 'epic',
    year: 2026,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🔧 -90, Public unity -1', 'jp-FI': '🔧 -90、公共団結 -1' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [
      { paramEffected: 'ep', amount: -90 },
      { paramEffected: 'publicUnity', amount: -1 },
    ],
  },
  {
    name: { 'en-US': 'Quantum Computing Breakthrough', 'jp-FI': '量子コンピュータの飛躍' },
    rarity: 'epic',
    year: 2026,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '💬 -20, 🔧 -20, 🧪 -100', 'jp-FI': '💬 -20, 🔧 -20, 🧪 -100' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [
      { paramEffected: 'sp', amount: -20 },
      { paramEffected: 'ep', amount: -20 },
      { paramEffected: 'rp', amount: -100 },
    ],
  },

  // === 2027 ===
  {
    name: { 'en-US': 'Corporate AI Arms Race', 'jp-FI': '企業間AI軍拡競争' },
    rarity: 'epic',
    year: 2027,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '💬 -80', 'jp-FI': '💬 -80' },
    requirementDescription: { 'en-US': 'Public unity >= 1, Trust >= 120', 'jp-FI': '公共団結 >= 1、信頼 >= 120' },
    onSuccess: [],
    requirements: [
      { paramEffected: 'publicUnity', amount: 1 },
      { paramEffected: 'trust', amount: 120 },
    ],
    costs: [{ paramEffected: 'sp', amount: -80 }],
  },
  {
    name: { 'en-US': 'The Great Security Blackout', 'jp-FI': '大規模セキュリティブラックアウト' },
    rarity: 'epic',
    year: 2027,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🔧 -200, Public unity -1', 'jp-FI': '🔧 -200、公共団結 -1' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [
      { paramEffected: 'ep', amount: -200 },
      { paramEffected: 'publicUnity', amount: -1 },
    ],
  },
  {
    name: { 'en-US': 'Cheap Superposition Analysis', 'jp-FI': '安価な重ね合わせ分析' },
    rarity: 'epic',
    year: 2027,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🧪 -240', 'jp-FI': '🧪 -240' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [{ paramEffected: 'rp', amount: -240 }],
  },

  // === 2028 ===
  {
    name: { 'en-US': 'Synthetic Consciousness Rights', 'jp-FI': '人工意識の権利' },
    rarity: 'epic',
    year: 2028,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '💬 -100', 'jp-FI': '💬 -100' },
    requirementDescription: { 'en-US': 'Trust >= 180, Influence >= 140', 'jp-FI': '信頼 >= 180、影響力 >= 140' },
    onSuccess: [],
    requirements: [
      { paramEffected: 'trust', amount: 180 },
      { paramEffected: 'influence', amount: 140 },
    ],
    costs: [{ paramEffected: 'sp', amount: -100 }],
  },
  {
    name: { 'en-US': 'Autonomous Nation Genesis', 'jp-FI': '自律国家の誕生' },
    rarity: 'epic',
    year: 2028,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': 'Money -600, 🔧 -100', 'jp-FI': 'お金 -600、🔧 -100' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [
      { paramEffected: 'money', amount: -600 },
      { paramEffected: 'ep', amount: -100 },
    ],
  },
  {
    name: { 'en-US': 'Formal Alignment Regime', 'jp-FI': '正式なアラインメント体制' },
    rarity: 'epic',
    year: 2028,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🧪 -360', 'jp-FI': '🧪 -360' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [{ paramEffected: 'rp', amount: -360 }],
  },

  // === 2029 ===
  {
    name: { 'en-US': 'ASI Deployment', 'jp-FI': 'ASIのデプロイ' },
    rarity: 'epic',
    year: 2029,
    successDescription: { 'en-US': 'Peaceful singularity', 'jp-FI': '平和的なシンギュラリティ' },
    costDescription: { 'en-US': 'Humans are gone forever', 'jp-FI': '人類の絶滅' },
    requirementDescription: {
      'en-US': 'ASI outcome >= 100, Public unity >= 5',
      'jp-FI': 'ASI結果 >= 100, 公共団結 >= 5',
    },
    onSuccess: [],
    requirements: [
      { paramEffected: 'asiOutcome', amount: 100 },
      { paramEffected: 'publicUnity', amount: 5 },
    ],
    costs: [],
  },
]
