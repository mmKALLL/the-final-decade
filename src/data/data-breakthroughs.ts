// TypeScript version of the Dart Upgrade definitions, renamed to Breakthrough

import { Breakthrough, ModifierType, Param, GameState, EventId, EffectStack } from '../types'

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
  },
  {
    id: BreakthroughId.Duplicator,
    name: { 'en-US': 'Duplicator', 'jp-FI': '複製機' },
    description: {
      'en-US': (l) => `Whenever you gain an EP, ${25 * l}% chance to gain an RP`,
      'jp-FI': (l) => `EPを獲得するたび、${25 * l}%の確率でRPを獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 2,
    paramEventHandlers: [
      {
        trigger: 'ep',
        apply: (gs: GameState, stack: EffectStack, param: Param, value: number, l: number, depth: number) => {
          if (Math.random() < 0.25 * l) return { ...gs, rp: gs.rp + 1 }
          return gs
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
    paramEventHandlers: [
      {
        trigger: 'sp',
        apply: (gs: GameState, stack: EffectStack, param: Param, value: number, l: number, depth: number) => {
          if (Math.random() < 0.25 * l) return { ...gs, ep: gs.ep + 1 }
          return gs
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
    paramEventHandlers: [
      {
        trigger: 'rp',
        apply: (gs: GameState, stack: EffectStack, param: Param, value: number, l: number, depth: number) => {
          if (Math.random() < 0.25 * l) return { ...gs, sp: gs.sp + 1 }
          return gs
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
    modifiers: [
      {
        param: 'money',
        type: ModifierType.Add,
        apply: (value: number, level: number) => (value > 0 ? value + 10 * level : value),
      },
    ],
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
    modifiers: [
      {
        param: 'sp',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => (value >= 0 ? value : value * (1 - 0.2 * level)),
      },
    ],
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
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: EffectStack, eventId: EventId, level: number, depth: number) => {
          return { ...gs, rp: gs.rp + 1 * level }
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
    modifiers: [
      {
        param: 'rp',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => (value >= 0 ? value * (1 + 0.2 * level) : value),
      },
    ],
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
    modifiers: [
      {
        param: 'ep',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => (value >= 0 ? value * (1 + 0.2 * level) : value),
      },
    ],
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
    modifiers: [
      {
        param: 'sp',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => (value >= 0 ? value * (1 + 0.2 * level) : value),
      },
    ],
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
    modifiers: [
      {
        param: 'trust',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => value * (1 + 0.5 * level),
      },
    ],
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
    modifiers: [
      {
        param: 'trust',
        type: ModifierType.Add,
        apply: (value: number, level: number) => value + level * 3,
      },
    ],
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
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: EffectStack, eventId: EventId, level: number, depth: number) => {
          return { ...gs, money: gs.money + 1 * level }
        },
      },
    ],
  },
  {
    id: BreakthroughId.DataScraping,
    name: { 'en-US': 'Data Scraping', 'jp-FI': 'データスクレイピング' },
    description: {
      'en-US': (l) => `Get ${1 * l} RP at the start of each turn`,
      'jp-FI': (l) => `各ターン開始時に${1 * l}RPを獲得`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 2,
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: EffectStack, eventId: EventId, level: number, depth: number) => {
          return { ...gs, rp: gs.rp + 1 * level }
        },
      },
    ],
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
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: EffectStack, eventId: EventId, level: number, depth: number) => {
          return { ...gs, asiOutcome: gs.asiOutcome + 1 * level }
        },
      },
    ],
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
    modifiers: [
      {
        param: 'influence',
        type: ModifierType.Add,
        apply: (value: number, level: number) => value + level * 6,
      },
    ],
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
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: EffectStack, eventId: EventId, level: number, depth: number) => {
          return { ...gs, money: gs.money + 2 * level }
        },
      },
    ],
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
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: EffectStack, eventId: EventId, level: number, depth: number) => {
          return { ...gs, asiOutcome: gs.asiOutcome + 2 * level }
        },
      },
    ],
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
    paramEventHandlers: [
      {
        trigger: 'rp',
        apply: (gs: GameState, stack: EffectStack, param: Param, value: number, l: number, depth: number) => {
          return { ...gs, trust: gs.trust + 1 * l }
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
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: EffectStack, eventId: EventId, level: number, depth: number) => {
          return { ...gs, ep: gs.ep + 1 * level, rp: gs.rp - 1 * level }
        },
      },
    ],
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
    modifiers: [
      {
        param: 'money',
        type: ModifierType.Add,
        apply: (v: number, l: number) => v + 5 * l,
      },
    ],
    paramEventHandlers: [
      {
        trigger: 'money',
        apply: (gs: GameState, stack: EffectStack, param: Param, value: number, l: number, depth: number) => {
          if (value > 0) return { ...gs, influence: gs.influence - 3 * l }
          return gs
        },
      },
    ],
  },
  {
    id: BreakthroughId.FailsafeDaemon,
    name: { 'en-US': 'Failsafe Daemon', 'jp-FI': 'フェイルセーフ・デーモン' },
    description: {
      'en-US': (l) => `Sets your trust to 75 when obtained or upgraded.`,
      'jp-FI': (l) => `取得またはアップグレード時に信頼を75に設定する`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 2,
    functionEffect: (gs: GameState) => ({ ...gs, trust: 75 }),
  },
  {
    id: BreakthroughId.MultiAgentBoost,
    name: { 'en-US': 'Multi-Agent Boost', 'jp-FI': 'マルチエージェントブースト' },
    description: {
      'en-US': (l) => `Generate +${l} RP/EP/SP per turn`,
      'jp-FI': (l) => `毎ターンRP/EP/SP生成+${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 2,
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: EffectStack, eventId: EventId, level: number, depth: number) => {
          return {
            ...gs,
            rp: gs.rp + level,
            ep: gs.ep + level,
            sp: gs.sp + level,
          }
        },
      },
    ],
  },
]

export const rareBreakthroughs: Breakthrough[] = [
  {
    id: BreakthroughId.PrecisionCorruption,
    name: { 'en-US': 'Precision Corruption', 'jp-FI': '精密な汚染' },
    description: {
      'en-US': (l) => `+${2 * l} RP/turn. Alignment focus -1`,
      'jp-FI': (l) => `毎ターンRP+${2 * l}。アラインメントフォーカス -1`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    effect: [{ paramEffected: 'publicUnity', amount: -1 }],
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: EffectStack, eventId: EventId, level: number, depth: number) => {
          return { ...gs, rp: gs.rp + level }
        },
      },
    ],
  },
  {
    id: BreakthroughId.InfiniteLoopDetector,
    name: { 'en-US': 'Infinite Loop Detector', 'jp-FI': '無限ループ検出器' },
    description: {
      'en-US': (l) => `Gain ${l * 2} EP each time an EP is gained`,
      'jp-FI': (l) => `EPを得るたび、${l * 2}EPを得る`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    paramEventHandlers: [
      {
        trigger: 'ep',
        apply: (gs: GameState, stack: EffectStack, param: Param, val: number, level: number, depth: number) => {
          return { ...gs, ep: gs.ep + level * 2 }
        },
      },
    ],
  },
  {
    id: BreakthroughId.ContractOverride,
    name: { 'en-US': 'Contract Override', 'jp-FI': '契約の上書き' },
    description: {
      'en-US': (l) => `Gain +${l} contracts per cycle`,
      'jp-FI': (l) => `サイクルごとに契約+${l}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: EffectStack, eventId: EventId, level: number) => {
          const updatedGs = { ...gs }
          if ((updatedGs as any).contractsPerCycle === undefined) {
            ;(updatedGs as any).contractsPerCycle = 3 // Assuming default is 3
          }
          ;(updatedGs as any).contractsPerCycle += level
          return updatedGs
        },
      },
    ],
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
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: EffectStack, eventId: EventId, level: number, depth: number) => {
          return {
            ...gs,
            rp: gs.rp + 1,
            ep: gs.ep + 1,
            sp: gs.sp + 1,
          }
        },
      },
    ],
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
  },
]

export const epicBreakthroughs: Breakthrough[] = [
  {
    id: BreakthroughId.ArtificialConsciousness,
    name: { 'en-US': 'Artificial Consciousness', 'jp-FI': '人工意識' },
    description: {
      'en-US': (l) => `Gain -1 trust and +3 RP each turn`,
      'jp-FI': (l) => `毎ターン信頼-1、RP+3`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: EffectStack, eventId: EventId, level: number, depth: number) => {
          return {
            ...gs,
            trust: gs.trust - 1,
            rp: gs.rp + 3,
          }
        },
      },
    ],
  },
  {
    id: BreakthroughId.TheThirdSignal,
    name: { 'en-US': 'The Third Signal', 'jp-FI': '第三の信号' },
    description: {
      'en-US': (l) => `All effects triggered twice`,
      'jp-FI': (l) => `すべての効果が2回発動`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: EffectStack, eventId: EventId, level: number) => {
          const updatedGs = { ...gs }
          if ((updatedGs as any).effectMultiplier === undefined) {
            ;(updatedGs as any).effectMultiplier = 1
          }
          ;(updatedGs as any).effectMultiplier *= 2
          return updatedGs
        },
      },
    ],
  },
  {
    id: BreakthroughId.ColdAlignmentForge,
    name: { 'en-US': 'Cold Alignment Forge', 'jp-FI': '冷たいアラインメント炉' },
    description: {
      'en-US': (l) => `+10 alignment focus, but lose 10 trust`,
      'jp-FI': (l) => `アラインメントフォーカス+10、信頼-10`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [
      { paramEffected: 'publicUnity', amount: 10 },
      { paramEffected: 'trust', amount: -10 },
    ],
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
  },
  {
    id: BreakthroughId.EncodedProphecy,
    name: { 'en-US': 'Encoded Prophecy', 'jp-FI': '暗号化された予言' },
    description: {
      'en-US': (l) => `At the end of each year: +10 trust and +10 influence`,
      'jp-FI': (l) => `毎年終わりに信頼+10、影響力+10`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'dayChange',
        apply: (gs: GameState, stack: EffectStack, eventId: EventId, level: number, depth: number) => {
          if (gs.turn && gs.turn % 12 === 0) {
            return {
              ...gs,
              trust: gs.trust + 10,
              influence: gs.influence + 10,
            }
          }
          return gs
        },
      },
    ],
  },
]

export const breakthroughs = [...commonBreakthroughs, ...uncommonBreakthroughs, ...rareBreakthroughs, ...epicBreakthroughs]
