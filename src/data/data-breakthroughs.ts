// TypeScript version of the Dart Upgrade definitions, renamed to Breakthrough

import { Breakthrough, ModifierType, Param, GameState, EventId, SingleEffect, EffectStack } from '../types'

// Extend Param type through declaration merging to include alignmentFocus
declare global {
  namespace Types {
    // Add properties we know exist in GameState
    interface GameState {
      // These properties were causing TypeScript errors
      failsafeTriggered?: boolean
      effectMultiplier: number
      contractsPerCycle: number
      turn: number // This property already exists in GameState in types.ts
    }
  }
}

export enum BreakthroughId {
  RewardHacking,
  LethalityList,
  PoetryGenerator,
  CognitiveEmulation,
  Duplicator,
  SocialHacking,
  DebateCourse,
  ResearchAdvisor,
  EngineeringAdvisor,
  SocialAdvisor,
  OpenLetter,
  InterpretabilityModel,
  TrustedAdvisor,
  PassiveIncome,
  DataScraping,
  WarningSigns,
  SocialEngineering,
  FakeNews,
  MoneyLaundering,
  StrategicAlignment,

  // Additional entries that were missing
  ConsensusFilter,
  OverclockedSimulations,
  SponsorshipLobby,
  FailsafeDaemon,
  MultiAgentBoost,

  PrecisionCorruption,
  InfiniteLoopDetector,
  ContractOverride,
  ReplicatorGrid,
  AestheticImpairment,

  ArtificialConsciousness,
  TheThirdSignal,
  ColdAlignmentForge,
  InstructionCollapse,
  EncodedProphecy,
}

export const commonBreakthroughs: Breakthrough[] = [
  {
    id: BreakthroughId.RewardHacking,
    name: { 'en-US': 'Reward Hacking', 'jp-FI': 'リワードハッキング' },
    description: {
      'en-US': (l) => `RP/EP/SP gain is increased by ${l * 8}%`,
      'jp-FI': (l) => `RP/EP/SP獲得、+${l * 8}%`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 5,
    effect: [],
    modifiers: [
      {
        param: 'rp',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => value * (1 + 0.08 * level),
      },
      {
        param: 'ep',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => value * (1 + 0.08 * level),
      },
      {
        param: 'sp',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => value * (1 + 0.08 * level),
      },
    ],
    actionEventHandlers: [],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.Duplicator,
    name: { 'en-US': 'Duplicator', 'jp-FI': '複製機' },
    description: {
      'en-US': (l) => 'Whenever you gain an EP, 25% chance to gain an RP',
      'jp-FI': (l) => 'EPを獲得するたび、25%の確率でRPを獲得する',
    },
    rarity: 'common',
    level: 0,
    maxLevel: 2,
    effect: [],
    modifiers: [],
    actionEventHandlers: [],
    paramEventHandlers: [
      {
        trigger: 'ep',
        apply: (gs: GameState, stack: EffectStack, param: Param, value: number, l: number, depth: number) => {
          if (Math.random() < 0.25 * l) stack.push({ paramEffected: 'rp', amount: 1, depth: depth + 1 })
        },
      },
    ],
  },
  {
    id: BreakthroughId.SocialHacking,
    name: { 'en-US': 'Social Hacking', 'jp-FI': 'ソーシャルハッキング' },
    description: {
      'en-US': (l) => 'Whenever you gain an SP, 25% chance to gain an EP',
      'jp-FI': (l) => 'SPを獲得するたび、25%の確率でEPを獲得する',
    },
    rarity: 'common',
    level: 0,
    maxLevel: 2,
    effect: [],
    modifiers: [],
    actionEventHandlers: [],
    paramEventHandlers: [
      {
        trigger: 'sp',
        apply: (gs: GameState, stack: SingleEffect[], param: Param, value: number, l: number) => {
          if (Math.random() < 0.25 * l) stack.push({ paramEffected: 'ep', amount: 1 })
        },
      },
    ],
  },
  {
    id: BreakthroughId.DebateCourse,
    name: { 'en-US': 'Debate Course', 'jp-FI': 'ディベートコース' },
    description: {
      'en-US': (l) => 'Whenever you gain an RP, 25% chance to gain an SP',
      'jp-FI': (l) => 'RPを獲得するたび、25%の確率でSPを獲得する',
    },
    rarity: 'common',
    level: 0,
    maxLevel: 2,
    effect: [],
    modifiers: [],
    actionEventHandlers: [],
    paramEventHandlers: [
      {
        trigger: 'rp',
        apply: (gs: GameState, stack: SingleEffect[], param: Param, value: number, l: number) => {
          if (Math.random() < 0.25 * l) stack.push({ paramEffected: 'sp', amount: 1 })
        },
      },
    ],
  },
  {
    id: BreakthroughId.LethalityList,
    name: { 'en-US': 'List of Lethalities', 'jp-FI': '致命性リスト' },
    description: {
      'en-US': (l) => `Contracts provide ${l * 10}k more money`,
      'jp-FI': (l) => `契約がさらに${l * 10}kのお金を提供する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [],
    modifiers: [
      {
        param: 'money',
        type: ModifierType.Add,
        apply: (value: number, level: number) => (value > 0 ? value + 10 * level : value),
      },
    ],
    actionEventHandlers: [],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.PoetryGenerator,
    name: { 'en-US': 'Poetry Generator', 'jp-FI': '詩ジェネレーター' },
    description: {
      'en-US': (l) => `SP actions are ${l * 20}% cheaper`,
      'jp-FI': (l) => `SPアクションが${l * 20}%安くなる`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [],
    modifiers: [
      {
        param: 'sp',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => (value >= 0 ? value : value * (1 - 0.2 * level)),
      },
    ],
    actionEventHandlers: [],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.CognitiveEmulation,
    name: { 'en-US': 'Cognitive Emulation', 'jp-FI': '認知エミュレーション' },
    description: {
      'en-US': (l) => `RP generation is ${l * 20}% faster`,
      'jp-FI': (l) => `RP生成が${l * 20}%速くなる`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [],
    modifiers: [],
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: SingleEffect[], eventId: EventId, level: number) => {
          stack.push({ paramEffected: 'rp', amount: 1 * level })
        },
      },
    ],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.ResearchAdvisor,
    name: { 'en-US': 'Research Advisor', 'jp-FI': '研究アドバイザー' },
    description: {
      'en-US': (l) => `RP generation is ${l * 20}% faster`,
      'jp-FI': (l) => `RP生成が${l * 20}%速くなる`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [],
    modifiers: [
      {
        param: 'rp',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => (value >= 0 ? value * (1 + 0.2 * level) : value),
      },
    ],
    actionEventHandlers: [],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.EngineeringAdvisor,
    name: { 'en-US': 'Engineering Advisor', 'jp-FI': 'エンジニアリングアドバイザー' },
    description: {
      'en-US': (l) => `EP generation is ${l * 20}% faster`,
      'jp-FI': (l) => `EP生成が${l * 20}%速くなる`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [],
    modifiers: [
      {
        param: 'ep',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => (value >= 0 ? value * (1 + 0.2 * level) : value),
      },
    ],
    actionEventHandlers: [],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.SocialAdvisor,
    name: { 'en-US': 'Social Advisor', 'jp-FI': 'ソーシャルアドバイザー' },
    description: {
      'en-US': (l) => `SP generation is ${l * 20}% faster`,
      'jp-FI': (l) => `SP生成が${l * 20}%速くなる`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [],
    modifiers: [
      {
        param: 'sp',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => (value >= 0 ? value * (1 + 0.2 * level) : value),
      },
    ],
    actionEventHandlers: [],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.OpenLetter,
    name: { 'en-US': 'Open Letter', 'jp-FI': 'オープンレター' },
    description: {
      'en-US': (l) => 'Gain 10 influence',
      'jp-FI': (l) => '10の影響力を獲得',
    },
    rarity: 'common',
    level: 0,
    maxLevel: 2,
    effect: [{ paramEffected: 'influence', amount: 10 }],
    modifiers: [],
    actionEventHandlers: [],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.InterpretabilityModel,
    name: { 'en-US': 'Interpretability Model', 'jp-FI': '解釈可能性モデル' },
    description: {
      'en-US': (l) => `Trust rewards/penalties on contracts are increased by ${l * 50}%`,
      'jp-FI': (l) => `契約での信頼報酬/ペナルティが${l * 50}%増加`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 2,
    effect: [],
    modifiers: [
      {
        param: 'trust',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => value * (1 + 0.5 * level),
      },
    ],
    actionEventHandlers: [],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.TrustedAdvisor,
    name: { 'en-US': 'Trusted Advisor', 'jp-FI': '信頼されるアドバイザー' },
    description: {
      'en-US': (l) => `Trust rewards on contracts are increased by ${l * 3}`,
      'jp-FI': (l) => `契約での信頼報酬が${l * 3}増加`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [],
    modifiers: [
      {
        param: 'trust',
        type: ModifierType.Add,
        apply: (value: number, level: number) => value + level * 3,
      },
    ],
    actionEventHandlers: [],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.PassiveIncome,
    name: { 'en-US': 'Passive Income', 'jp-FI': '受動的収入' },
    description: {
      'en-US': (l) => `Gain ${1 * l}k money per turn`,
      'jp-FI': (l) => `ターンごとに${1 * l}kのお金を獲得`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [],
    modifiers: [],
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: SingleEffect[], eventId: EventId, level: number) => {
          stack.push({ paramEffected: 'money', amount: 1 * level })
        },
      },
    ],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.DataScraping,
    name: { 'en-US': 'Data Scraping', 'jp-FI': 'データスクレイピング' },
    description: {
      'en-US': (l) => 'Get 1 RP at the start of each turn',
      'jp-FI': (l) => '各ターン開始時に1RPを獲得',
    },
    rarity: 'common',
    level: 0,
    maxLevel: 2,
    effect: [],
    modifiers: [],
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: SingleEffect[], eventId: EventId, level: number) => {
          stack.push({ paramEffected: 'rp', amount: level })
        },
      },
    ],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.WarningSigns,
    name: { 'en-US': 'Warning Signs', 'jp-FI': '警告サイン' },
    description: {
      'en-US': (l) => `ASI outcome improves by ${l} each turn`,
      'jp-FI': (l) => `毎ターン、ASIの結果が${l}向上する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [],
    modifiers: [],
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: SingleEffect[], eventId: EventId, level: number) => {
          stack.push({ paramEffected: 'asiOutcome', amount: level })
        },
      },
    ],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.SocialEngineering,
    name: { 'en-US': 'Social Engineering', 'jp-FI': 'ソーシャルエンジニアリング' },
    description: {
      'en-US': (l) => `Influence rewards on contracts are increased by ${l * 6}`,
      'jp-FI': (l) => `契約での影響力報酬が${l * 6}増加`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [],
    modifiers: [
      {
        param: 'influence',
        type: ModifierType.Add,
        apply: (value: number, level: number) => value + level * 6,
      },
    ],
    actionEventHandlers: [],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.FakeNews,
    name: { 'en-US': 'Fake News', 'jp-FI': 'フェイクニュース' },
    description: {
      'en-US': (l) => 'Gain 20 influence, but lose 20 trust',
      'jp-FI': (l) => '20の影響力を得るが、20の信頼を失う',
    },
    rarity: 'common',
    level: 0,
    maxLevel: 2,
    effect: [
      { paramEffected: 'influence', amount: 20 },
      { paramEffected: 'trust', amount: -20 },
    ],
    modifiers: [],
    actionEventHandlers: [],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.MoneyLaundering,
    name: { 'en-US': 'Money Laundering', 'jp-FI': 'マネーロンダリング' },
    description: {
      'en-US': (l) => `Gain ${2 * l}k money per turn, but lose 20 trust`,
      'jp-FI': (l) => `ターンごとに${2 * l}kのお金を得るが、20の信頼を失う`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 1,
    effect: [{ paramEffected: 'trust', amount: -20 }],
    modifiers: [],
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: SingleEffect[], eventId: EventId, level: number) => {
          stack.push({ paramEffected: 'money', amount: 2 * level })
        },
      },
    ],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.StrategicAlignment,
    name: { 'en-US': 'Strategic Alignment', 'jp-FI': '戦略的アライメント' },
    description: {
      'en-US': (l) => `ASI outcome improves by ${l * 2} each turn`,
      'jp-FI': (l) => `毎ターン、ASIの結果が${l * 2}向上する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [],
    modifiers: [],
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: SingleEffect[], eventId: EventId, level: number) => {
          stack.push({ paramEffected: 'asiOutcome', amount: 2 * level })
        },
      },
    ],
    paramEventHandlers: [],
  },
]

export const uncommonBreakthroughs: Breakthrough[] = [
  {
    id: BreakthroughId.ConsensusFilter,
    name: { 'en-US': 'Consensus Filter', 'jp-FI': 'コンセンサスフィルター' },
    description: {
      'en-US': (l) => `Whenever you gain RP, +${l} Trust`,
      'jp-FI': (l) => `RPを得るたび、信頼が+${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 2,
    effect: [],
    modifiers: [],
    actionEventHandlers: [],
    paramEventHandlers: [
      {
        trigger: 'rp',
        apply: (gs: GameState, stack: SingleEffect[], param: Param, value: number, l: number) => {
          stack.push({ paramEffected: 'trust', amount: l })
        },
      },
    ],
  },
  {
    id: BreakthroughId.OverclockedSimulations,
    name: { 'en-US': 'Overclocked Simulations', 'jp-FI': '過剰クロックシミュレーション' },
    description: {
      'en-US': (l) => `Each turn, gain ${l} EP but lose ${l} RP`,
      'jp-FI': (l) => `毎ターン、EP+${l}、RP-${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 2,
    effect: [],
    modifiers: [],
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: SingleEffect[], e: EventId, l: number) => {
          stack.push({ paramEffected: 'ep', amount: l })
          stack.push({ paramEffected: 'rp', amount: -l })
        },
      },
    ],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.SponsorshipLobby,
    name: { 'en-US': 'Sponsorship Lobby', 'jp-FI': 'スポンサーのロビー' },
    description: {
      'en-US': (l) => `Contract money +${l * 5}k, but influence -${l * 3}`,
      'jp-FI': (l) => `契約のお金 +${l * 5}k、影響力 -${l * 3}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    effect: [],
    modifiers: [
      {
        param: 'money',
        type: ModifierType.Add,
        apply: (v: number, l: number) => v + 5 * l,
      },
    ],
    actionEventHandlers: [],
    paramEventHandlers: [
      {
        trigger: 'money',
        apply: (gs: GameState, stack: SingleEffect[], param: Param, value: number, l: number) => {
          if (value > 0) stack.push({ paramEffected: 'influence', amount: -3 * l })
        },
      },
    ],
  },
  {
    id: BreakthroughId.FailsafeDaemon,
    name: { 'en-US': 'Failsafe Daemon', 'jp-FI': 'フェイルセーフ・デーモン' },
    description: {
      'en-US': (l) => `While trust is below 50, gain +${l} trust every turn`,
      'jp-FI': (l) => `信頼が50未満になると、毎ターン+${l}の信頼を得る`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 1,
    effect: [],
    modifiers: [],
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: SingleEffect[], e: EventId, l: number) => {
          if (gs.trust < 50) {
            stack.push({ paramEffected: 'trust', amount: l })
          }
        },
      },
    ],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.MultiAgentBoost,
    name: { 'en-US': 'Multi-Agent Boost', 'jp-FI': 'マルチエージェントブースト' },
    description: {
      'en-US': (l) => `All RP/EP/SP generation +${l}`,
      'jp-FI': (l) => `全てのRP/EP/SP生成+${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 2,
    effect: [],
    modifiers: [],
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: SingleEffect[], e: EventId, l: number) => {
          stack.push({ paramEffected: 'rp', amount: l })
          stack.push({ paramEffected: 'ep', amount: l })
          stack.push({ paramEffected: 'sp', amount: l })
        },
      },
    ],
    paramEventHandlers: [],
  },
]

export const rareBreakthroughs: Breakthrough[] = [
  {
    id: BreakthroughId.PrecisionCorruption,
    name: { 'en-US': 'Precision Corruption', 'jp-FI': '精密な汚染' },
    description: {
      'en-US': (l) => `+${l} RP/turn. Alignment focus -1`,
      'jp-FI': (l) => `毎ターンRP+${l}。アラインメントフォーカス -1`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    effect: [{ paramEffected: 'publicUnity', amount: -1 }],
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: SingleEffect[], e: EventId, l: number) => {
          stack.push({ paramEffected: 'rp', amount: l })
        },
      },
    ],
    modifiers: [],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.InfiniteLoopDetector,
    name: { 'en-US': 'Infinite Loop Detector', 'jp-FI': '無限ループ検出器' },
    description: {
      'en-US': (l) => `Gain ${l * 2} SP each time an EP is gained`,
      'jp-FI': (l) => `EPを得るたび、${l * 2}SPを得る`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    effect: [],
    modifiers: [],
    actionEventHandlers: [],
    paramEventHandlers: [
      {
        trigger: 'ep',
        apply: (gs: GameState, stack: SingleEffect[], param: Param, val: number, l: number) => {
          stack.push({ paramEffected: 'sp', amount: l * 2 })
        },
      },
    ],
  },
  {
    id: BreakthroughId.ContractOverride,
    name: { 'en-US': 'Contract Override', 'jp-FI': '契約の上書き' },
    description: {
      'en-US': (l) => `Gain +${l} contract slots`,
      'jp-FI': (l) => `契約+${l}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 1,
    functionEffect: (gs: GameState) => ({ ...gs, maxContracts: gs.maxContracts + 1 }),
  },
  {
    id: BreakthroughId.ReplicatorGrid,
    name: { 'en-US': 'Replicator Grid', 'jp-FI': '複製グリッド' },
    description: {
      'en-US': (l) => `Gain 1 RP/EP/SP per turn`,
      'jp-FI': (l) => `毎ターンRP/EP/SPを1ずつ得る`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 1,
    effect: [],
    modifiers: [],
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: SingleEffect[]) => {
          stack.push({ paramEffected: 'rp', amount: 1 })
          stack.push({ paramEffected: 'ep', amount: 1 })
          stack.push({ paramEffected: 'sp', amount: 1 })
        },
      },
    ],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.AestheticImpairment,
    name: { 'en-US': 'Aesthetic Impairment', 'jp-FI': '美的欠陥' },
    description: {
      'en-US': (l) => `Trust gain halved, but RP doubled`,
      'jp-FI': (l) => `信頼獲得が半減、RPは2倍`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 1,
    effect: [],
    modifiers: [
      {
        param: 'trust',
        type: ModifierType.Multiply,
        apply: (v: number) => v * 0.5,
      },
      {
        param: 'rp',
        type: ModifierType.Multiply,
        apply: (v: number) => v * 2,
      },
    ],
    actionEventHandlers: [],
    paramEventHandlers: [],
  },
]

export const epicBreakthroughs: Breakthrough[] = [
  {
    id: BreakthroughId.ArtificialConsciousness,
    name: { 'en-US': 'Artificial Consciousness', 'jp-FI': '人工意識' },
    description: {
      'en-US': (l) => `Gain +5 trust and +2 RP each turn`,
      'jp-FI': (l) => `毎ターン信頼+5、RP+2`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [],
    modifiers: [],
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: SingleEffect[]) => {
          stack.push({ paramEffected: 'trust', amount: 5 })
          stack.push({ paramEffected: 'rp', amount: 2 })
        },
      },
    ],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.TheThirdSignal,
    name: { 'en-US': 'The Third Signal', 'jp-FI': '第三の信号' },
    description: {
      'en-US': (l) => `All actions are triggered twice (including costs)`,
      'jp-FI': (l) => `すべてのアクションが2回発動 (コストも含む)`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [],
    modifiers: [],
    actionEventHandlers: [
      {
        trigger: 'allActions',
        apply: (gs: GameState, stack: SingleEffect[], _: EventId, level: number) => {
          stack.push(stack[0])
        },
      },
    ],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.ColdAlignmentForge,
    name: { 'en-US': 'Cold Alignment Forge', 'jp-FI': '冷たいアラインメント炉' },
    description: {
      'en-US': (l) => `+5 public unity, but lose 50 trust`,
      'jp-FI': (l) => `アラインメントフォーカス+10、信頼-10`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [
      { paramEffected: 'publicUnity', amount: 5 },
      { paramEffected: 'trust', amount: -50 },
    ],
    modifiers: [],
    actionEventHandlers: [],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.InstructionCollapse,
    name: { 'en-US': 'Instruction Collapse', 'jp-FI': '命令崩壊' },
    description: {
      'en-US': (l) => `Gain double EP but RP generation is disabled`,
      'jp-FI': (l) => `EPは2倍、RP生成は無効`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [],
    modifiers: [
      {
        param: 'ep',
        type: ModifierType.Multiply,
        apply: (v: number) => v * 2,
      },
      {
        param: 'rp',
        type: ModifierType.Multiply,
        apply: () => 0,
      },
    ],
    actionEventHandlers: [],
    paramEventHandlers: [],
  },
  {
    id: BreakthroughId.EncodedProphecy,
    name: { 'en-US': 'Encoded Prophecy', 'jp-FI': '暗号化された予言' },
    description: {
      'en-US': (l) => `Every 3rd turn: +10 trust and +10 influence`,
      'jp-FI': (l) => `3ターンごとに信頼+10、影響力+10`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [],
    modifiers: [],
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: SingleEffect[], _: EventId, __: number) => {
          if (gs.turn && gs.turn % 3 === 0) {
            stack.push({ paramEffected: 'trust', amount: 10 })
            stack.push({ paramEffected: 'influence', amount: 10 })
          }
        },
      },
    ],
    paramEventHandlers: [],
  },
]

export const breakthroughs = [...commonBreakthroughs, ...uncommonBreakthroughs, ...rareBreakthroughs, ...epicBreakthroughs]
