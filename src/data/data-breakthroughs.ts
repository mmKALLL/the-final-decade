// TypeScript version of the Dart Upgrade definitions, renamed to Breakthrough

import { Breakthrough, ModifierType, Param, GameState } from '../types'

export enum BreakthroughId {
  // Common
  RewardHacking,
  LethalityList,
  PoetryGenerator,
  CognitiveEmulation,
  Duplicator,
  Monosemanticity,
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
  StrategicBipartisanship,
  SingularLearningTheory,
  InstrumentalityProject,

  // Uncommon
  ConsensusFilter,
  OverclockedSimulations,
  SponsorshipLobby,
  FailsafeDaemon,
  MultiAgentBoost,

  // Rare
  PrecisionCorruption,
  InfiniteLoopRetries,
  ContractOverride,
  ReplicatorGrid,
  AestheticImpairment,

  // Epic
  ArtificialConsciousness,
  TheThirdSignal,
  ColdAlignmentForge,
  InstructionCollapse,
  EncodedProphecy,
  ArmyOfConMen,
  UnitedIntervention,
  SingularityTheorem,
  UpgradeRecycling,
}

export const commonBreakthroughs: Breakthrough[] = [
  {
    // Tested: ok
    id: BreakthroughId.RewardHacking,
    name: { 'en-US': 'Reward Hacking', 'jp-FI': 'リワードハッキング' },
    description: {
      'en-US': (l) => `RP/EP/SP gain from humans is increased by ${l * 8}%`,
      'jp-FI': (l) => `人材からのRP/EP/SP獲得が${l * 8}%増加`,
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
      'en-US': (l) => `Gain ${l} RP every turn`,
      'jp-FI': (l) => `各ターンに${l}RPを獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => ({ ...gs, rp: gs.rp + level }),
      },
    ],
  },
  {
    id: BreakthroughId.Monosemanticity,
    name: { 'en-US': 'Monosemanticity', 'jp-FI': 'モノセマンティシティ' },
    description: {
      'en-US': (l) => `Gain ${l} EP every turn`,
      'jp-FI': (l) => `各ターンに${l}EPを獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => ({ ...gs, ep: gs.ep + level }),
      },
    ],
  },
  {
    id: BreakthroughId.DebateCourse,
    name: { 'en-US': 'Debate Course', 'jp-FI': 'ディベートコース' },
    description: {
      'en-US': (l) => `Gain ${l} SP every turn`,
      'jp-FI': (l) => `各ターンに${l}SPを獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => ({ ...gs, sp: gs.sp + level }),
      },
    ],
  },
  {
    id: BreakthroughId.PoetryGenerator,
    name: { 'en-US': 'Poetry Generator', 'jp-FI': '詩ジェネレーター' },
    description: {
      'en-US': (l) => `When you do independent outreach, gain ${l * 7} SP`,
      'jp-FI': (l) => `独立のアウトリーチを行うたびに${l * 7}SPを獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'independentOutreach',
        apply: (gs: GameState, level: number) => ({ ...gs, sp: gs.sp + 7 * level }),
      },
    ],
  },
  {
    id: BreakthroughId.CognitiveEmulation,
    name: { 'en-US': 'Cognitive Emulation', 'jp-FI': '認知エミュレーション' },
    description: {
      'en-US': (l) => `Gain ${l * 5} EP every time you refresh contracts`,
      'jp-FI': (l) => `契約を更新するたびに${l * 5}EPを獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'refreshContracts',
        apply: (gs: GameState, level: number) => ({ ...gs, ep: gs.ep + 5 * level }),
      },
    ],
  },
  {
    id: BreakthroughId.ResearchAdvisor,
    name: { 'en-US': 'Research Advisor', 'jp-FI': '研究アドバイザー' },
    description: {
      'en-US': (l) => `Gain ${l * 10} RP every time you research a breakthrough`,
      'jp-FI': (l) => `研究を行うたびに${l * 10}RPを獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'researchBreakthrough',
        apply: (gs: GameState, level: number) => ({ ...gs, rp: gs.rp + 10 * level }),
      },
    ],
  },
  {
    id: BreakthroughId.EngineeringAdvisor,
    name: { 'en-US': 'Engineering Advisor', 'jp-FI': 'エンジニアリングアドバイザー' },
    description: {
      'en-US': (l) => `Gain ${l * 5} EP every time you finish a contract`,
      'jp-FI': (l) => `契約を終了するたびに${l * 5}EPを獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, level: number) => ({ ...gs, ep: gs.ep + 5 * level }),
      },
    ],
  },
  {
    id: BreakthroughId.SocialAdvisor,
    name: { 'en-US': 'Social Advisor', 'jp-FI': 'ソーシャルアドバイザー' },
    description: {
      'en-US': (l) => `Gain ${l * 10} SP every time you recruit a human`,
      'jp-FI': (l) => `人材を雇うたびに${l * 10}SPを獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'recruitHuman',
        apply: (gs: GameState, level: number) => ({ ...gs, sp: gs.sp + 10 * level }),
      },
    ],
  },
  {
    id: BreakthroughId.OpenLetter,
    name: { 'en-US': 'Open Letter', 'jp-FI': 'オープンレター' },
    description: {
      'en-US': (l) => `Gain ${l * 15} trust`,
      'jp-FI': (l) => `信頼が${l * 15}増加する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [{ paramEffected: 'trust', amount: 15 }],
  },
  {
    id: BreakthroughId.InterpretabilityModel,
    name: { 'en-US': 'Interpretability Model', 'jp-FI': '解釈可能性モデル' },
    description: {
      'en-US': (l) => `Whenever you finish a contract, +${l * 3} ASI outcome`,
      'jp-FI': (l) => `契約を終了するたびに+${l * 3}%ASI報酬を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, level: number) => ({ ...gs, asiOutcome: gs.asiOutcome + 3 * level }),
      },
    ],
  },
  {
    id: BreakthroughId.TrustedAdvisor,
    name: { 'en-US': 'Trusted Advisor', 'jp-FI': '信頼されるアドバイザー' },
    description: {
      'en-US': (l) => `Whenever you finish a contract, gain ${l * 3} trust`,
      'jp-FI': (l) => `契約を終了するたびに${l * 3}信頼を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, level: number) => ({ ...gs, trust: gs.trust + 3 * level }),
      },
    ],
  },
  {
    id: BreakthroughId.PassiveIncome,
    name: { 'en-US': 'Passive Income', 'jp-FI': '受動的収入' },
    description: {
      'en-US': (l) => `Gain ${2 * l} money per turn`,
      'jp-FI': (l) => `ターンごとに${2 * l}kのお金を獲得`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => ({ ...gs, money: gs.money + 2 * level }),
      },
    ],
  },
  {
    id: BreakthroughId.SocialEngineering,
    name: { 'en-US': 'Social Engineering', 'jp-FI': 'ソーシャルエンジニアリング' },
    description: {
      'en-US': (l) => `Whenever you finish a contract, gain ${l * 3} influence`,
      'jp-FI': (l) => `契約を終了するたびに${l * 3}影響力を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, level: number) => ({ ...gs, influence: gs.influence + 3 * level }),
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
    maxLevel: 3,
    effect: [
      { paramEffected: 'influence', amount: 20 },
      { paramEffected: 'trust', amount: -20 },
    ],
  },
  {
    id: BreakthroughId.MoneyLaundering,
    name: { 'en-US': 'Money Laundering', 'jp-FI': 'マネーロンダリング' },
    description: {
      'en-US': (l) => `Gain ${4 * l} money per turn, but lose 20 trust`,
      'jp-FI': (l) => `ターンごとに${4 * l}のお金を得るが、20の信頼を失う`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [{ paramEffected: 'trust', amount: -20 }],
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => ({ ...gs, money: gs.money + 4 * level }),
      },
    ],
  },
  {
    id: BreakthroughId.DataScraping,
    name: { 'en-US': 'Data Scraping', 'jp-FI': 'データスクレイピング' },
    description: {
      'en-US': (l) => `Get ${l * 2} income, but lose ${l * 10} trust`,
      'jp-FI': (l) => `各ターン開始時に${l * 2}kの収入を得るが、信頼が${l * 10}失われる`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [
      { paramEffected: 'trust', amount: -10 },
      { paramEffected: 'passiveIncome', amount: 2 },
    ],
  },
  {
    id: BreakthroughId.SingularLearningTheory,
    name: { 'en-US': 'Singular Learning Theory', 'jp-FI': 'シンギュラー・ラーニング・セオリー' },
    description: {
      'en-US': (l) => `Gain ${l * 5} RP every time you level up a breakthrough`,
      'jp-FI': (l) => `研究をレベルアップするたびにRP+${l * 5}`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'levelUpBreakthrough',
        apply: (gs: GameState, l: number) => ({ ...gs, rp: gs.rp + 5 * l }),
      },
    ],
  },
  {
    id: BreakthroughId.InstrumentalityProject,
    name: { 'en-US': 'Instrumentality Project', 'jp-FI': 'インストルメンタリティプロジェクト' },
    description: {
      'en-US': (l) => `When you do independent research, gain ${l * 7} RP`,
      'jp-FI': (l) => `独立の研究を行うたびにRP+${l * 7}`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'independentResearch',
        apply: (gs: GameState, l: number) => ({ ...gs, rp: gs.rp + 7 * l }),
      },
    ],
  },
]

export const uncommonBreakthroughs: Breakthrough[] = [
  {
    id: BreakthroughId.WarningSigns,
    name: { 'en-US': 'Warning Signs', 'jp-FI': '警告サイン' },
    description: {
      'en-US': (l) => `Public unity +${l}`,
      'jp-FI': (l) => `公衆団結+${l}`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [{ paramEffected: 'publicUnity', amount: 1 }],
  },
  {
    id: BreakthroughId.ConsensusFilter,
    name: { 'en-US': 'Consensus Filter', 'jp-FI': 'コンセンサスフィルター' },
    description: {
      'en-US': (l) => `Gain +${l} trust every turn, but public unity -${l}`,
      'jp-FI': (l) => `毎ターン、信頼+${l}、だが公衆団結-${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    effect: [{ paramEffected: 'publicUnity', amount: -1 }],
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({
          ...gs,
          trust: gs.trust + 1 * l,
        }),
      },
    ],
  },
  {
    id: BreakthroughId.OverclockedSimulations,
    name: { 'en-US': 'Overclocked Simulations', 'jp-FI': '過剰クロックシミュレーション' },
    description: {
      'en-US': (l) => `Each turn, gain ${l * 2} RP but lose ${l} EP`,
      'jp-FI': (l) => `毎ターン、RP+${l * 2}、EP-${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({ ...gs, ep: gs.ep - 1 * l, rp: gs.rp + 2 * l }),
      },
    ],
  },
  {
    id: BreakthroughId.SponsorshipLobby,
    name: { 'en-US': 'Sponsorship Lobby', 'jp-FI': 'スポンサーのロビー' },
    description: {
      'en-US': (l) => `When you finish a contract, gain ${l * 20} money, but lose ${l * 5} trust`,
      'jp-FI': (l) => `契約を終了するたび、${l * 20}kのお金を得るが、${l * 5}の信頼を失う`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, l: number) => ({ ...gs, money: gs.money + 20 * l, trust: gs.trust - 5 * l }),
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
    maxLevel: 3,
    functionEffect: (gs: GameState) => ({ ...gs, trust: 75 }),
  },
  {
    id: BreakthroughId.MultiAgentBoost,
    name: { 'en-US': 'Multi-Agent Boost', 'jp-FI': 'マルチエージェントブースト' },
    description: {
      'en-US': (l) => `When you upgrade a breakthrough, gain +${l} UP`,
      'jp-FI': (l) => `研究をレベルアップするたびにUP+${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 2,
    actionEventHandlers: [
      {
        trigger: 'levelUpBreakthrough',
        apply: (gs: GameState, level: number) => ({ ...gs, up: gs.up + level }),
      },
    ],
  },
]

export const rareBreakthroughs: Breakthrough[] = [
  {
    id: BreakthroughId.LethalityList,
    name: { 'en-US': 'List of Lethalities', 'jp-FI': '致命性リスト' },
    description: {
      'en-US': (l) => `Gain ${l * 20} influence, but public unity -${l}`,
      'jp-FI': (l) => `影響力が${l * 20}増加するが、公衆団結-${l}`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [
      { paramEffected: 'influence', amount: 20 },
      { paramEffected: 'publicUnity', amount: -1 },
    ],
  },
  {
    id: BreakthroughId.StrategicBipartisanship,
    name: { 'en-US': 'Strategic Bipartisanship', 'jp-FI': '戦略的両党支持' },
    description: {
      'en-US': (l) => `Public unity increased by ${l * 2}`,
      'jp-FI': (l) => `公衆団結+${l * 2}`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [{ paramEffected: 'publicUnity', amount: 2 }],
  },
  {
    id: BreakthroughId.PrecisionCorruption,
    name: { 'en-US': 'Precision Corruption', 'jp-FI': '精密な汚染' },
    description: {
      'en-US': (l) => `+${3 * l} RP/turn. Public unity -1`,
      'jp-FI': (l) => `毎ターンRP+${3 * l}。公衆の支持 -1`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    effect: [{ paramEffected: 'publicUnity', amount: -1 }],
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({ ...gs, rp: gs.rp + 3 * l }),
      },
    ],
  },
  {
    id: BreakthroughId.InfiniteLoopRetries,
    name: { 'en-US': 'Infinite Loop Bypass', 'jp-FI': '無限ループバイパス' },
    description: {
      'en-US': (l) => `Gain ${l * 2} EP each time a non-breakthrough EP is gained`,
      'jp-FI': (l) => `非突破性のEPを得るたびに${l * 2}EPを得る`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    paramEventHandlers: [
      {
        trigger: 'ep',
        apply: (gs: GameState, level: number, param: Param, value: number) => ({ ...gs, ep: gs.ep + level * 2 }),
      },
    ],
  },
  // {
  //   id: BreakthroughId.ContractOverride,
  //   name: { 'en-US': 'Contract Override', 'jp-FI': '契約の上書き' },
  //   description: {
  //     'en-US': (l) => `Gain +${l} contracts per cycle`,
  //     'jp-FI': (l) => `サイクルごとに契約+${l}`,
  //   },
  //   rarity: 'rare',
  //   level: 0,
  //   maxLevel: 2,
  //   actionEventHandlers: [
  //     // TODO FIXME: Implement
  //   ],
  // },
  {
    id: BreakthroughId.ReplicatorGrid,
    name: { 'en-US': 'Replicator Grid', 'jp-FI': '複製グリッド' },
    description: {
      'en-US': (l) => `Gain 1 RP/EP/SP per turn`,
      'jp-FI': (l) => `毎ターンRP/EP/SPを1ずつ得る`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({
          ...gs,
          rp: gs.rp + l,
          ep: gs.ep + l,
          sp: gs.sp + l,
        }),
      },
    ],
  },
  {
    id: BreakthroughId.AestheticImpairment,
    name: { 'en-US': 'Aesthetic Impairment', 'jp-FI': '美的欠陥' },
    description: {
      'en-US': (l) => `RP gain from humans is doubled, but you can no longer gain trust`,
      'jp-FI': (l) => `信頼獲得が0、RPは2倍`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 1,
    modifiers: [
      {
        param: 'trust',
        type: ModifierType.Multiply,
        apply: (v: number) => v * 0,
      },
      {
        param: 'rp',
        type: ModifierType.Multiply,
        apply: (v: number) => v * 2,
      },
    ],
  },
  {
    id: BreakthroughId.ArmyOfConMen,
    name: { 'en-US': 'Army of Con Men', 'jp-FI': '詐欺師の軍' },
    description: {
      'en-US': (l) => `You gain ${l} trust each turn`,
      'jp-FI': (l) => `毎ターン信頼+${l}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({ ...gs, trust: gs.trust + l }),
      },
    ],
  },
]

export const epicBreakthroughs: Breakthrough[] = [
  {
    id: BreakthroughId.ArtificialConsciousness,
    name: { 'en-US': 'Artificial Consciousness', 'jp-FI': '人工意識' },
    description: {
      'en-US': (l) => `Gain -1 trust and +4 RP each turn`,
      'jp-FI': (l) => `毎ターン信頼-1、RP+4`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({
          ...gs,
          trust: gs.trust - l,
          rp: gs.rp + 4 * l,
        }),
      },
    ],
  },
  {
    id: BreakthroughId.TheThirdSignal,
    name: { 'en-US': 'The Third Signal', 'jp-FI': '第三の信号' },
    description: {
      'en-US': (l) => `At the start of each year, gain 20 EP and 10 RP`,
      'jp-FI': (l) => `毎年終わりにEP+20、RP+10`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => {
          if (gs.turn % 12 === 0) {
            return {
              ...gs,
              ep: gs.ep + 20,
              rp: gs.rp + 10,
            }
          }
          return gs
        },
      },
    ],
  },
  {
    id: BreakthroughId.UnitedIntervention,
    name: { 'en-US': 'United Intervention', 'jp-FI': 'ユニティ介入' },
    description: {
      'en-US': (l) => `+3 public unity, but lose 50 influence`,
      'jp-FI': (l) => `公衆団結+3、影響力-30`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [
      { paramEffected: 'publicUnity', amount: 3 },
      { paramEffected: 'influence', amount: -50 },
    ],
  },
  {
    id: BreakthroughId.InstructionCollapse,
    name: { 'en-US': 'Instruction Collapse', 'jp-FI': '命令崩壊' },
    description: {
      'en-US': (l) => `Gain double EP but RP generation is halved`,
      'jp-FI': (l) => `EPは2倍、RP生成は半分`,
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
        apply: (v: number) => v * 0.5,
      },
    ],
  },
  {
    id: BreakthroughId.EncodedProphecy,
    name: { 'en-US': 'Encoded Prophecy', 'jp-FI': '暗号化された予言' },
    description: {
      'en-US': (l) => `At the start of each year: +10 trust and +10 influence`,
      'jp-FI': (l) => `毎年終わりに信頼+10、影響力+10`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => {
          if (gs.turn % 12 === 0) {
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
  {
    id: BreakthroughId.SingularityTheorem,
    name: { 'en-US': 'Singularity Theorem', 'jp-FI': 'シンギュラリティ定理' },
    description: {
      'en-US': (l) => `When you research or level up a breakthrough, gain ${l * 10} ASI outcome`,
      'jp-FI': (l) => `研究を行うたびにASI結果+${l * 10}`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'researchBreakthrough',
        apply: (gs: GameState, level: number) => ({ ...gs, asiOutcome: gs.asiOutcome + 10 * level }),
      },
      {
        trigger: 'levelUpBreakthrough',
        apply: (gs: GameState, level: number) => ({ ...gs, asiOutcome: gs.asiOutcome + 10 * level }),
      },
    ],
  },
  {
    id: BreakthroughId.UpgradeRecycling,
    name: { 'en-US': 'Upgrade Recycling', 'jp-FI': 'アップグレードリサイクル' },
    description: {
      'en-US': (l) => `At the start of each year, gain 4 UP`,
      'jp-FI': (l) => `毎年終わりにUP+4`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => {
          if (gs.turn % 12 === 0) {
            return { ...gs, up: gs.up + 4 }
          }
          return gs
        },
      },
    ],
  },
]

export const breakthroughs = [...commonBreakthroughs, ...uncommonBreakthroughs, ...rareBreakthroughs, ...epicBreakthroughs]
