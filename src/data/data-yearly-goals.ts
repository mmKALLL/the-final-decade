import { ContractType, Label, YearlyContract } from '../types'
import { assertNever } from '../util'

// General curve:

// 2025: 60
// 2026: 120
// 2027: 220
// 2028: 330
// 2029: 500

// Each year should have one constract with
// - low immediate cost but high requirement (sp)
// - low immediate cost but high long-term cost (ep)
// - high short-term cost (rp)

export const yearlyContracts: YearlyContract[] = [
  // === 2025 ===
  {
    name: { 'en-US': 'Global Energy Crisis', 'jp-FI': '世界的エネルギー危機' },
    rarity: 'epic',
    year: 2025,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '💬 -20, income -10', 'jp-FI': '💬 -20、受動的収入 -10' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [
      { paramEffected: 'sp', amount: -20 },
      { paramEffected: 'passiveIncome', amount: -10 },
    ],
  },
  {
    name: { 'en-US': 'Agentic Researchers', 'jp-FI': 'エージェント型研究AI' },
    rarity: 'epic',
    year: 2025,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🔧 -40', 'jp-FI': '🔧 -40' },
    requirementDescription: { 'en-US': 'Trust >= 110', 'jp-FI': '信頼 >= 110' },
    onSuccess: [],
    requirements: [{ paramEffected: 'trust', amount: 110 }],
    costs: [{ paramEffected: 'ep', amount: -40 }],
  },
  {
    name: { 'en-US': 'Interpretability Divestment', 'jp-FI': '解釈可能性の放棄' },
    rarity: 'epic',
    year: 2025,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': 'RP -20, Public unity -1', 'jp-FI': 'RP -20、公共団結 -1' },
    requirementDescription: { 'en-US': 'RP >= 40', 'jp-FI': 'RP >= 40' },
    onSuccess: [],
    requirements: [{ paramEffected: 'rp', amount: 40 }],
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
    costDescription: { 'en-US': '💬 -30, Public unity -1', 'jp-FI': '💬 -30、公共団結 -1' },
    requirementDescription: { 'en-US': 'Influence >= 130', 'jp-FI': '影響力 >= 130' },
    onSuccess: [],
    requirements: [{ paramEffected: 'influence', amount: 130 }],
    costs: [
      { paramEffected: 'publicUnity', amount: -1 },
      { paramEffected: 'sp', amount: -30 },
    ],
  },
  {
    name: { 'en-US': 'AI Workforce Automation', 'jp-FI': 'AIによる労働力の自動化' },
    rarity: 'epic',
    year: 2026,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': 'influence -20, 🔧 -60', 'jp-FI': '影響力 -20、🔧 -60' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [
      { paramEffected: 'influence', amount: -20 },
      { paramEffected: 'ep', amount: -60 },
    ],
  },
  {
    name: { 'en-US': 'Quantum Computing Breakthrough', 'jp-FI': '量子コンピュータの飛躍' },
    rarity: 'epic',
    year: 2026,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🧪 -120', 'jp-FI': '🧪 -120' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [{ paramEffected: 'rp', amount: -120 }],
  },

  // === 2027 ===
  {
    name: { 'en-US': 'Corporate AI Arms Race', 'jp-FI': '企業間AI軍拡競争' },
    rarity: 'epic',
    year: 2027,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '💬 -60', 'jp-FI': '💬 -60' },
    requirementDescription: { 'en-US': 'Public unity >= 1, Influence >= 130', 'jp-FI': '公共団結 >= 1、影響力 >= 130' },
    onSuccess: [],
    requirements: [
      { paramEffected: 'publicUnity', amount: 1 },
      { paramEffected: 'influence', amount: 130 },
    ],
    costs: [{ paramEffected: 'sp', amount: -60 }],
  },
  {
    name: { 'en-US': 'The Great Security Blackout', 'jp-FI': '大規模セキュリティブラックアウト' },
    rarity: 'epic',
    year: 2027,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🔧 -100, Public unity -2', 'jp-FI': '🔧 -100、公共団結 -2' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [
      { paramEffected: 'ep', amount: -100 },
      { paramEffected: 'publicUnity', amount: -2 },
    ],
  },
  {
    name: { 'en-US': 'Cheap Superposition Analysis', 'jp-FI': '安価な重ね合わせ分析' },
    rarity: 'epic',
    year: 2027,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🧪 -220', 'jp-FI': '🧪 -220' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [{ paramEffected: 'rp', amount: -220 }],
  },

  // === 2028 ===
  {
    name: { 'en-US': 'Synthetic Consciousness Rights', 'jp-FI': '人工意識の権利' },
    rarity: 'epic',
    year: 2028,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '💬 -80', 'jp-FI': '💬 -80' },
    requirementDescription: { 'en-US': 'Trust >= 180, Influence >= 140', 'jp-FI': '信頼 >= 180、影響力 >= 140' },
    onSuccess: [],
    requirements: [
      { paramEffected: 'trust', amount: 180 },
      { paramEffected: 'influence', amount: 140 },
    ],
    costs: [{ paramEffected: 'sp', amount: -80 }],
  },
  {
    name: { 'en-US': 'Autonomous Nation Genesis', 'jp-FI': '自律国家の誕生' },
    rarity: 'epic',
    year: 2028,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': 'Money -800, 🔧 -80', 'jp-FI': 'お金 -800、🔧 -80' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [
      { paramEffected: 'money', amount: -800 },
      { paramEffected: 'ep', amount: -80 },
    ],
  },
  {
    name: { 'en-US': 'Formal Alignment Regime', 'jp-FI': '正式なアラインメント体制' },
    rarity: 'epic',
    year: 2028,
    successDescription: { 'en-US': 'Epic breakthrough', 'jp-FI': '壮絶な突破' },
    costDescription: { 'en-US': '🧪 -330', 'jp-FI': '🧪 -330' },
    requirementDescription: { 'en-US': '(none)', 'jp-FI': '(なし)' },
    onSuccess: [],
    requirements: [],
    costs: [{ paramEffected: 'rp', amount: -330 }],
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
      'jp-FI': 'ASIの結果 >= 100, 公共団結 >= 5',
    },
    onSuccess: [],
    requirements: [
      { paramEffected: 'asiOutcome', amount: 100 },
      { paramEffected: 'publicUnity', amount: 5 },
    ],
    costs: [],
  },
]

export function getRandomContractName(type: ContractType): Label {
  switch (type) {
    case 'safety':
      return alignmentContractNames[Math.floor(Math.random() * alignmentContractNames.length)]
    case 'capabilities':
      return capabilityContractNames[Math.floor(Math.random() * capabilityContractNames.length)]
    case 'product':
      return productContractNames[Math.floor(Math.random() * productContractNames.length)]
    default:
      return assertNever(type)
  }
}

const alignmentContractNames = [
  { 'en-US': 'Autonomous AI Safety', 'jp-FI': '自律型AIの安全プロトコル' },
  { 'en-US': 'Neural Net Interpretability', 'jp-FI': 'ニューラルネットの解釈可能性研究' },
  { 'en-US': 'Oversight System Scaling', 'jp-FI': '拡張可能な監督システム' },
  { 'en-US': 'Value Alignment Check', 'jp-FI': '価値整合性の検証' },
  { 'en-US': 'Ethical Black Box Study', 'jp-FI': '倫理的ブラックボックスの解釈性' },
  { 'en-US': 'AI Alignment Schism', 'jp-FI': 'AIアラインメントの分裂' },
  { 'en-US': 'Ethics-Based Policy AI', 'jp-FI': '自動化された倫理政策決定' },
  { 'en-US': 'Technical Alignment Plan', 'jp-FI': '技術的なアラインメントフレームワーク' },
  { 'en-US': 'Aligning AGI Objectives', 'jp-FI': 'AGIアラインメントの一般化研究' },
  { 'en-US': 'Align in High-Risk Cases', 'jp-FI': '高リスクシナリオにおけるAIの整合性' },

  // New additions
  { 'en-US': 'Safe Simulation Training', 'jp-FI': '安全なシミュレーショントレーニング' },
  { 'en-US': 'Alignment Metrics Audit', 'jp-FI': 'アラインメントメトリクスの監査' },
  { 'en-US': 'Recursive Ethics Model', 'jp-FI': '再帰的な倫理モデル' },
  { 'en-US': 'Intent Transparency Pact', 'jp-FI': '意図の透明性協定' },
  { 'en-US': 'Preventing AGI Misuse', 'jp-FI': 'AGIの誤用防止' },
  { 'en-US': 'Human-Compatible AI Law', 'jp-FI': '人間適合型AI法案' },
  { 'en-US': 'Alignment Field Trials', 'jp-FI': 'アラインメント実地試験' },
  { 'en-US': 'Democratic AI Control', 'jp-FI': '民主的AI制御' },
  { 'en-US': 'AGI Governance Charter', 'jp-FI': 'AGI統治憲章' },
  { 'en-US': 'Red-Teaming for Safety', 'jp-FI': '安全性のためのレッドチーム' },
]

const capabilityContractNames = [
  { 'en-US': 'Self-Improving AI Wall', 'jp-FI': '自己改善型AIのファイアウォール' },
  { 'en-US': 'Superintelligence Kill-Switch', 'jp-FI': '超知能の強制停止スイッチ開発' },
  { 'en-US': 'Reinforcement Risk Study', 'jp-FI': '強化学習のリスク評価' },
  { 'en-US': 'Cognitive Emulation Grid', 'jp-FI': '認知模倣グリッド' },
  { 'en-US': 'Takeoff Speed Strategies', 'jp-FI': 'AI進化スピード戦略' },
  { 'en-US': 'Human-Compatible Goals', 'jp-FI': '人間適応型の目標モデリング' },
  { 'en-US': 'AI Capability Scaling Plan', 'jp-FI': 'AI能力のスケーリング計画' },
  { 'en-US': 'Open vs Closed AGI Debate', 'jp-FI': 'AGI公開 vs 非公開議論' },
  { 'en-US': 'End-to-End Verification', 'jp-FI': 'エンドツーエンド検証' },
  { 'en-US': 'Unshackled AGI Release', 'jp-FI': '解放されたAGIの展開' },

  // New additions
  { 'en-US': 'Self-Play Intelligence Run', 'jp-FI': '自己プレイによる知能強化' },
  { 'en-US': 'Superposition Computation', 'jp-FI': '重ね合わせコンピュテーション' },
  { 'en-US': 'Meta-Learning Initiative', 'jp-FI': 'メタ学習の取り組み' },
  { 'en-US': 'Multi-Modal AGI Fusion', 'jp-FI': 'マルチモーダルAGI融合' },
  { 'en-US': 'Scalable AGI Prototype', 'jp-FI': 'スケーラブルAGIプロトタイプ' },
  { 'en-US': 'Fast Gradient Evolution', 'jp-FI': '高速勾配進化' },
  { 'en-US': 'AGI Self-Replication Test', 'jp-FI': 'AGIの自己複製試験' },
  { 'en-US': 'Goal Generalization Suite', 'jp-FI': '目標一般化スイート' },
  { 'en-US': 'Neural Capacity Expansion', 'jp-FI': 'ニューラル容量の拡張' },
  { 'en-US': 'Causal Inference Engine', 'jp-FI': '因果推論エンジン' },
]

const productContractNames = [
  { 'en-US': 'AI in Military Operations', 'jp-FI': '軍事利用の自律型AI' },
  { 'en-US': 'Corporate AGI Freeze Order', 'jp-FI': '企業のAGI配備一時停止' },
  { 'en-US': 'Public AI Open Letter', 'jp-FI': '公開書簡によるAI表明' },
  { 'en-US': 'Synthetic Personhood Bill', 'jp-FI': '人工意識の権利法案' },
  { 'en-US': 'Policy Rift: AGI Strategy', 'jp-FI': 'AGI戦略を巡る政策分裂' },
  { 'en-US': 'AI Safety vs Growth Bill', 'jp-FI': 'AI安全 vs 経済成長法案' },
  { 'en-US': 'Compute Cap Enforcement Act', 'jp-FI': '計算上限規制法案' },
  { 'en-US': 'AGI Containment Treaty', 'jp-FI': 'AGI封じ込め条約' },
  { 'en-US': 'Misinformation Task Force', 'jp-FI': '偽情報対策部隊' },
  { 'en-US': 'Regulatory Capture Watch', 'jp-FI': '規制取り込み監視団' },

  // New additions
  { 'en-US': 'AI Market Adoption Trial', 'jp-FI': 'AI市場導入試験' },
  { 'en-US': 'Mass Layoff Mitigation Plan', 'jp-FI': '大量解雇緩和計画' },
  { 'en-US': 'Trust Scoring Deployment', 'jp-FI': '信頼スコアの導入' },
  { 'en-US': 'Global AI Accreditation Pact', 'jp-FI': 'AI認定の国際協定' },
  { 'en-US': 'Model Disclosure Policy Act', 'jp-FI': 'モデル開示方針法案' },
  { 'en-US': 'AI Output Licensing Scheme', 'jp-FI': 'AI出力ライセンス制度' },
  { 'en-US': 'Autonomous City Rollout', 'jp-FI': '自律都市展開' },
  { 'en-US': 'Posthuman Society Charter', 'jp-FI': 'ポストヒューマン社会憲章' },
  { 'en-US': 'Labor Market Adjustment Fund', 'jp-FI': '労働市場調整基金' },
  { 'en-US': 'Public Risk Awareness Plan', 'jp-FI': '公衆リスク意識向上計画' },
]
