import { GameState, YearlyContract } from '../types'
import { paramToLabel } from '../util'

// General curve (with 3 common humans and 1 breakthrough start):

// 2025: 60
// 2026: 120
// 2027: 220
// 2028: 330
// 2029: 500

// General curve (with 3 uncommon humans and 2 breakthroughs start):

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
    costDescription: { 'en-US': '💬 -20, unity -1', 'jp-FI': '💬 -20、公共団結 -1' },
    requirementDescription: { 'en-US': 'humans >= 6', 'jp-FI': '人間 >= 6' },
    onSuccess: [],
    requirements: [{ condition: (gs: GameState) => gs.humans.length >= 6, paramEffected: 'asiOutcome', amount: 0 }],
    costs: [{ paramEffected: 'sp', amount: -20 }],
  },
  {
    name: { 'en-US': 'AI Workforce Automation', 'jp-FI': 'AIによる労働力の自動化' },
    rarity: 'epic',
    year: 2025,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🔧 -40, unity -1', 'jp-FI': '🔧 -40、公共団結 -1' },
    requirementDescription: { 'en-US': `${paramToLabel('income', 'en-US')} >= 4`, 'jp-FI': `${paramToLabel('income', 'jp-FI')} >= 4` },
    onSuccess: [],
    requirements: [{ paramEffected: 'income', amount: 4 }],
    costs: [{ paramEffected: 'ep', amount: -40 }],
  },
  {
    name: { 'en-US': 'Interpretability Investment', 'jp-FI': '解釈可能性の投資' },
    rarity: 'epic',
    year: 2025,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🧪 -60, unity -1', 'jp-FI': '🧪 -60、公共団結 -1' },
    requirementDescription: { 'en-US': '🧪 >= 80', 'jp-FI': '🧪 >= 80' },
    onSuccess: [],
    requirements: [{ paramEffected: 'rp', amount: 80 }],
    costs: [{ paramEffected: 'rp', amount: -60 }],
  },

  // === 2026 ===

  {
    name: { 'en-US': 'AI Regulation Crisis', 'jp-FI': 'AI規制の危機' },
    rarity: 'epic',
    year: 2026,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '💬 -60, unity -1', 'jp-FI': '💬 -60、公共団結 -1' },
    requirementDescription: { 'en-US': 'outcome >= 50', 'jp-FI': 'ASI結果 >= 50' },
    onSuccess: [],
    requirements: [{ paramEffected: 'asiOutcome', amount: 50 }],
    costs: [{ paramEffected: 'sp', amount: -60 }],
  },
  {
    name: { 'en-US': 'Agentic Researchers', 'jp-FI': 'エージェント型研究者' },
    rarity: 'epic',
    year: 2026,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🔧 -80, unity -2', 'jp-FI': '🔧 -80、公共団結 -2' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [
      { paramEffected: 'ep', amount: -80 },
      { paramEffected: 'publicUnity', amount: -1 },
    ],
  },
  {
    name: { 'en-US': 'Cheap Superposition Analysis', 'jp-FI': '安価な重ね合わせ分析' },
    rarity: 'epic',
    year: 2026,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🧪 -100, unity -1', 'jp-FI': '🧪 -100、公共団結 -1' },
    requirementDescription: { 'en-US': `${paramToLabel('up', 'en-US')} >= 5`, 'jp-FI': `${paramToLabel('up', 'jp-FI')} >= 5` },
    onSuccess: [],
    requirements: [{ paramEffected: 'up', amount: 5 }],
    costs: [{ paramEffected: 'rp', amount: -100 }],
  },

  // === 2027 ===
  {
    name: { 'en-US': 'National AI Arms Race', 'jp-FI': '国家間AI軍拡競争' },
    rarity: 'epic',
    year: 2027,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '💬 -140, unity -1', 'jp-FI': '💬 -140、公共団結 -1' },
    requirementDescription: { 'en-US': 'humans >= 12', 'jp-FI': '人間 >= 12' },
    onSuccess: [],
    requirements: [{ condition: (gs: GameState) => gs.humans.length >= 12, paramEffected: 'asiOutcome', amount: 0 }],
    costs: [{ paramEffected: 'sp', amount: -140 }],
  },
  {
    name: { 'en-US': 'The Great Security Blackout', 'jp-FI': '大規模セキュリティブラックアウト' },
    rarity: 'epic',
    year: 2027,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: {
      'en-US': `🔧 -160, ${paramToLabel('income', 'en-US')} -16, unity -1`,
      'jp-FI': `🔧 -160、${paramToLabel('income', 'jp-FI')} -16、公共団結 -1`,
    },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [
      { paramEffected: 'ep', amount: -160 },
      { paramEffected: 'income', amount: -16 },
    ],
  },
  {
    name: { 'en-US': 'Quantum Computing Breakthrough', 'jp-FI': '量子コンピュータの飛躍' },
    rarity: 'epic',
    year: 2027,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🧪 -240, unity -1', 'jp-FI': '🧪 -240、公共団結 -1' },
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
    costDescription: { 'en-US': '💬 -200, outcome -40, unity -1', 'jp-FI': '💬 -200、ASI結果 -40、公共団結 -1' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [
      { paramEffected: 'sp', amount: -200 },
      { paramEffected: 'asiOutcome', amount: -40 },
    ],
  },
  {
    name: { 'en-US': 'Autonomous Nation Genesis', 'jp-FI': '自律国家の誕生' },
    rarity: 'epic',
    year: 2028,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🔧 -220, unity -3', 'jp-FI': '🔧 -220、公共団結 -3' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [
      { paramEffected: 'ep', amount: -220 },
      { paramEffected: 'publicUnity', amount: -2 },
    ],
  },
  {
    name: { 'en-US': 'Formal Alignment Regime', 'jp-FI': '正式なアラインメント体制' },
    rarity: 'epic',
    year: 2028,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: {
      'en-US': `🧪 -280, ${paramToLabel('up', 'en-US')} -10, unity -1`,
      'jp-FI': `🧪 -280、${paramToLabel('up', 'jp-FI')} -10、公共団結 -1`,
    },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [
      { paramEffected: 'rp', amount: -280 },
      { paramEffected: 'up', amount: -10 },
    ],
  },

  // === 2029 ===
  {
    name: { 'en-US': 'ASI Deployment', 'jp-FI': 'ASIのデプロイ' },
    rarity: 'epic',
    year: 2029,
    successDescription: { 'en-US': 'Peaceful singularity', 'jp-FI': '平和的なシンギュラリティ' },
    costDescription: { 'en-US': 'Humans are gone forever', 'jp-FI': '人類の絶滅' },
    requirementDescription: {
      'en-US': `outcome >= 100, ${paramToLabel('up', 'en-US')} >= 20`,
      'jp-FI': `ASI結果 >= 100, ${paramToLabel('up', 'jp-FI')} >= 20`,
    },
    onSuccess: [],
    requirements: [
      { paramEffected: 'asiOutcome', amount: 100 },
      { paramEffected: 'up', amount: 15 },
    ],
    costs: [],
  },
  {
    name: { 'en-US': 'ASI Prevention', 'jp-FI': 'ASIの防止' },
    rarity: 'epic',
    year: 2029,
    successDescription: { 'en-US': 'Peaceful prosperity', 'jp-FI': '平和的な繁栄' },
    costDescription: { 'en-US': 'Humans are gone forever', 'jp-FI': '人類の絶滅' },
    requirementDescription: {
      'en-US': 'unity >= 5',
      'jp-FI': '公共団結 >= 5',
    },
    onSuccess: [],
    requirements: [{ paramEffected: 'publicUnity', amount: 5 }],
    costs: [],
  },
]
