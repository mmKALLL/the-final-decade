import { Contract, ContractType, Effect, GameState, Label, Language, SingleEffect } from '../types'
import { assertNever, getRandomInt, paramToLabel, pickListOfWeighted, withPlusSign } from '../util'

export const refreshContracts = (gs: GameState): GameState => ({
  ...gs,
  contracts: [generateContract(gs, 'product'), generateContract(gs, 'capabilities'), generateContract(gs, 'safety')],
  // Array(gs.maxContracts)
  //   .fill(null)
  //   .map(() => generateContract(gs)),
})

function getYearIndex(turn: number): number {
  return Math.floor(turn / 12)
}

export function generateContract(gs: GameState, type?: ContractType): Contract {
  // Setup base parameters that control complexity
  // 44/28/28 split between capabilities, safety, and product contracts
  const contractType: ContractType = type ?? (Math.random() < 0.44 ? 'capabilities' : Math.random() < 0.5 ? 'safety' : 'product')
  const isSecondaryContract = contractType === 'safety' || contractType === 'product'

  const difficulty = 30 + gs.influence * 0.6 + Math.floor(Math.random() * (getYearIndex(gs.turn) * 30 + gs.influence * 0.7))

  // Generate the variables needed for generating action effects
  const rarity = difficulty > 260 ? 'epic' : difficulty > 200 ? 'rare' : difficulty > 150 ? 'uncommon' : 'common'
  const successEffects = rarity === 'epic' ? 3 : rarity === 'rare' ? 2 : rarity === 'uncommon' ? 1 : 0

  // Generate action effects
  const onSuccess: Effect = [
    // Accept effects = monetary reward from completing the contract; the name is historical
    ...getAcceptEffects(difficulty, successEffects, isSecondaryContract),
    ...(isSecondaryContract
      ? [
          {
            paramEffected: contractType === 'product' ? 'trust' : contractType === 'safety' ? 'asiOutcome' : assertNever(contractType),
            amount: Math.floor(3.5 * (difficulty / 100)),
          } as const,
        ]
      : []),
    ...getSuccessEffects(difficulty, successEffects, contractType),
  ]

  // Apply contract modifiers from the game state
  const modifiedOnSuccess = onSuccess.map((e) => applyContractModifiers(gs, e))

  // Requirements scale exponentially with difficulty. They are mapped to costs for now
  const totalRequirement = Math.round(Math.pow(((isSecondaryContract ? 100 : 120) + difficulty) / 100, 1.75))
  const secondaryRequirement = totalRequirement >= 2 && isSecondaryContract ? Math.round(totalRequirement * (0.5 + Math.random() * 0.3)) : 0

  const primaryCosts: Effect = [{ paramEffected: 'ep', amount: -(totalRequirement - secondaryRequirement) * 5 }]
  const secondaryCosts: Effect =
    secondaryRequirement > 0 ? [{ paramEffected: contractType === 'safety' ? 'rp' : 'sp', amount: -secondaryRequirement * 5 }] : []

  const capabilityCosts: Effect = [
    { paramEffected: Math.random() < 0.6 ? 'trust' : 'asiOutcome', amount: Math.ceil(-4 * (difficulty / 100)) },
  ]

  const costs: Effect = contractType === 'capabilities' ? [...primaryCosts, ...capabilityCosts] : [...secondaryCosts, ...primaryCosts]
  const requirements: Effect = []

  return {
    name: getRandomContractName(contractType),
    type: contractType,
    rarity,
    successDescription: {
      'en-US': effectListToString(modifiedOnSuccess, 'en-US'),
      'jp-FI': effectListToString(modifiedOnSuccess, 'jp-FI'),
    },
    requirementDescription: { 'en-US': effectListToString(requirements, 'en-US'), 'jp-FI': effectListToString(requirements, 'jp-FI') },
    costDescription: { 'en-US': effectListToString(costs, 'en-US'), 'jp-FI': effectListToString(costs, 'jp-FI') },
    onSuccess: modifiedOnSuccess,
    requirements,
    costs,
  }
}

// Utility functions adapted for TypeScript

// Gives a value between base to (0.8 - 1.2) * difficulty * difficultyFactor
// E.g., to get a value between 2 and 4 (2 + difficulty / 100), use base = 2, difficultyFactor = 0.01
function getRandomValue(base: number, difficulty: number, difficultyFactor: number = 1): number {
  return Math.floor(base + (difficulty * 0.8 + Math.random() * (difficulty * 0.4)) * difficultyFactor)
}

function getContractMoneyValue(difficulty: number, totalEffects: number, isSecondaryContract: boolean): number {
  let value = getRandomValue(50, difficulty, 1.5) * 0.2 // Multiplier to convert Alignment is Hard values into The Final Decade curve
  const effectMultiplier = [1, 0.75, 0.6, 0.5][Math.min(totalEffects, 3)] // Indexed access; contracts with more effects provide less money

  return Math.round(((isSecondaryContract ? 1 : 2.2) * effectMultiplier * value) / 5) * 5 // Round to nearest 5
}

function getAcceptEffects(difficulty: number, totalEffects: number, isSecondaryContract: boolean): Effect {
  return [{ paramEffected: 'money', amount: getContractMoneyValue(difficulty, totalEffects, isSecondaryContract) }]
}

function getSuccessEffects(difficulty: number, totalEffects: number, contractType: ContractType): Effect {
  if (totalEffects <= 0) return []
  const effectPool =
    contractType === 'safety' || contractType === 'product'
      ? getAlignmentSuccessEffects(difficulty, contractType)
      : getCapabilitySuccessEffects(difficulty)
  return getEffectsFromPool(totalEffects, effectPool)
}

// function getFailureEffects(difficulty: number, totalEffects: number, isSecondaryContract: boolean, trust: number): Effect {
//   if (totalEffects === 0) return []
//   const effectPool = isSecondaryContract
//     ? getAlignmentFailureEffects(difficulty, trust, totalEffects, isSecondaryContract)
//     : getCapabilityFailureEffects(difficulty, trust, totalEffects, isSecondaryContract)
//   return getEffectsFromPool(totalEffects, effectPool)
// }

function getEffectsFromPool(totalEffects: number, effectPool: WeightedSingleEffect[]): Effect {
  return pickListOfWeighted(totalEffects, effectPool).map((e) => e.effect)
}

// This function was originally for applying contract modifiers from GS, but those are not implemented yet
function applyContractModifiers(_gs: GameState, effect: SingleEffect, _isForFailure: boolean = false): SingleEffect {
  return effect
  // return {
  //   paramEffected: effect.paramEffected,
  //   amount: applyParamModifiers(
  //     effect,
  //     isForFailure ? {} : gs.contractAddModifiers,
  //     gs.contractMultModifiers,
  //     isForFailure ? {} : gs.contractFunctionModifiers
  //   ),
  // }
}

// Example weighted effect structure for success/failure pools
interface WeightedSingleEffect {
  weight: number
  effect: SingleEffect
}

// Function to get alignment-focused success effects
function getAlignmentSuccessEffects(difficulty: number, contractType: ContractType): WeightedSingleEffect[] {
  return [
    { weight: difficulty > 260 ? 2 : 0, effect: { paramEffected: 'humanSelection', amount: getRandomValue(100, difficulty, 0.5) } },
    { weight: difficulty > 200 ? 2 : 0, effect: { paramEffected: 'breakthroughSelection', amount: getRandomValue(50, difficulty, 0.5) } },
    { weight: difficulty > 200 ? 1 : 3, effect: { paramEffected: 'ep', amount: getRandomValue(4, difficulty, 0.05) } },
    {
      weight: 4,
      effect: { paramEffected: contractType === 'safety' ? 'trust' : 'asiOutcome', amount: getRandomValue(3, difficulty, 0.05) }, // The compliment of the effect native to the contract type
    },
    {
      weight: difficulty > 150 ? 2 : 1,
      effect: {
        paramEffected: 'up',
        amount: getRandomInt(2, 3),
      },
    },
    { weight: difficulty > 200 ? 2 : 1, effect: { paramEffected: 'publicUnity', amount: 1 } },
  ]
}

// Function to get capability-focused success effects
function getCapabilitySuccessEffects(difficulty: number): WeightedSingleEffect[] {
  return [
    { weight: difficulty >= 200 ? 0 : 4, effect: { paramEffected: 'sp', amount: getRandomValue(4, difficulty, 0.05) } },
    { weight: difficulty >= 200 ? 0 : 4, effect: { paramEffected: 'rp', amount: getRandomValue(4, difficulty, 0.05) } },
    { weight: difficulty > 200 ? 4 : 0, effect: { paramEffected: 'sp', amount: getRandomValue(4, difficulty, 0.08) } },
    { weight: difficulty > 200 ? 4 : 0, effect: { paramEffected: 'rp', amount: getRandomValue(4, difficulty, 0.08) } },
    { weight: 3, effect: { paramEffected: 'up', amount: getRandomInt(1, 4) } },
    { weight: 4, effect: { paramEffected: 'income', amount: getRandomValue(1, difficulty, 0.02) } },
    { weight: difficulty > 200 ? 2 : 1, effect: { paramEffected: 'humanSelection', amount: getRandomValue(50, difficulty, 0.5) } },
    { weight: difficulty > 260 ? 3 : 0, effect: { paramEffected: 'breakthroughSelection', amount: getRandomValue(100, difficulty, 0.5) } },
  ]
}

function effectListToString(effects: Effect, language: Language): string {
  return effects.map((e) => `${paramToLabel(e.paramEffected, language)} ${withPlusSign(e.amount)}`).join(', ')
}

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
