// TypeScript version of the Dart Upgrade definitions, renamed to Breakthrough

import { Breakthrough, ModifierType, GameState } from '../types'
import { generateBreakthroughSelection, generateHumanSelection } from './data-generators'

////////////////////////////////////////////////////////////
// COMMON
////////////////////////////////////////////////////////////

export const commonBreakthroughs: Breakthrough[] = [
  {
    id: 'Duplicator',
    name: { 'en-US': 'Duplicator', 'jp-FI': '複製機' },
    description: {
      'en-US': (l) => `Gain ${l * 2} 🧪 every turn`,
      'jp-FI': (l) => `各ターンに${l * 2}🧪を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => ({ ...gs, rp: gs.rp + 2 * level }),
      },
    ],
  },
  {
    id: 'Monosemanticity',
    name: { 'en-US': 'Monosemanticity', 'jp-FI': 'モノセマンティシティ' },
    description: {
      'en-US': (l) => `Gain ${l * 2} 🔧 every turn`,
      'jp-FI': (l) => `各ターンに${l}🔧を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => ({ ...gs, ep: gs.ep + level * 2 }),
      },
    ],
  },
  {
    id: 'DebateCourse',
    name: { 'en-US': 'Debate Course', 'jp-FI': 'ディベートコース' },
    description: {
      'en-US': (l) => `Gain ${l * 2} 💬 every turn`,
      'jp-FI': (l) => `各ターンに${l}💬を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => ({ ...gs, sp: gs.sp + level * 2 }),
      },
    ],
  },
  {
    id: 'PoetryGenerator',
    name: { 'en-US': 'Poetry Generator', 'jp-FI': '詩ジェネレーター' },
    description: {
      'en-US': (l) => `When you do independent outreach, gain +${l * 9} 💬`,
      'jp-FI': (l) => `独立のアウトリーチを行うたびに+${l * 9}💬を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'independentOutreach',
        apply: (gs: GameState, level: number) => ({ ...gs, sp: gs.sp + 9 * level }),
      },
    ],
  },
  {
    id: 'CognitiveEmulation',
    name: { 'en-US': 'Cognitive Emulation', 'jp-FI': '認知エミュレーション' },
    description: {
      'en-US': (l) => `Gain ${l * 10} 🔧 every time you refresh contracts`,
      'jp-FI': (l) => `契約を更新するたびに${l * 10}🔧を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'refreshContracts',
        apply: (gs: GameState, level: number) => ({ ...gs, ep: gs.ep + 10 * level }),
      },
    ],
  },
  {
    id: 'ResearchAdvisor',
    name: { 'en-US': 'Research Advisor', 'jp-FI': '研究アドバイザー' },
    description: {
      'en-US': (l) => `Gain ${l * 12} 🧪 every time you research a breakthrough`,
      'jp-FI': (l) => `研究を行うたびに${l * 12}🧪を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'researchBreakthrough',
        apply: (gs: GameState, level: number) => ({ ...gs, rp: gs.rp + 12 * level }),
      },
    ],
  },
  {
    id: 'EngineeringAdvisor',
    name: { 'en-US': 'Engineering Advisor', 'jp-FI': 'エンジニアリングアドバイザー' },
    description: {
      'en-US': (l) => `Gain ${l * 10} 🔧 every time you finish a contract`,
      'jp-FI': (l) => `契約を終了するたびに${l * 10}🔧を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, level: number) => ({ ...gs, ep: gs.ep + 10 * level }),
      },
    ],
  },
  {
    id: 'SocialAdvisor',
    name: { 'en-US': 'Social Advisor', 'jp-FI': 'ソーシャルアドバイザー' },
    description: {
      'en-US': (l) => `Gain ${l * 12} 💬 every time you recruit a human`,
      'jp-FI': (l) => `人材を雇うたびに${l * 12}💬を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'recruitHuman',
        apply: (gs: GameState, level: number) => ({ ...gs, sp: gs.sp + 12 * level }),
      },
    ],
  },
  {
    id: 'OpenLetter',
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
    id: 'InterpretabilityModel',
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
    id: 'TrustedAdvisor',
    name: { 'en-US': 'Trusted Advisor', 'jp-FI': '信頼されるアドバイザー' },
    description: {
      'en-US': (l) => `Whenever you finish a contract, gain +${l * 3} trust`,
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
    id: 'SocialEngineering',
    name: { 'en-US': 'Social Engineering', 'jp-FI': 'ソーシャルエンジニアリング' },
    description: {
      'en-US': (l) => `Whenever you finish a contract, gain +${l * 3} influence`,
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
    id: 'FakeNews',
    name: { 'en-US': 'Fake News', 'jp-FI': 'フェイクニュース' },
    description: {
      'en-US': (l) => 'Gain 20 influence, but lose 10 trust',
      'jp-FI': (l) => '20の影響力を得るが、10の信頼を失う',
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [
      { paramEffected: 'influence', amount: 20 },
      { paramEffected: 'trust', amount: -10 },
    ],
  },
  {
    id: 'MoneyLaundering',
    name: { 'en-US': 'Money Laundering', 'jp-FI': 'マネーロンダリング' },
    description: {
      'en-US': (l) => `Get +${l * 8} income, but lose ${l * 10} trust`,
      'jp-FI': (l) => `ターンごとに${l * 8}のお金を得るが、${l * 10}の信頼を失う`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [
      { paramEffected: 'trust', amount: -10 },
      { paramEffected: 'passiveIncome', amount: 8 },
    ],
  },
  {
    id: 'SingularLearningTheory',
    name: { 'en-US': 'Singular Learning Theory', 'jp-FI': 'シンギュラー・ラーニング・セオリー' },
    description: {
      'en-US': (l) => `Gain +${l * 20} 🧪 every time you level up a breakthrough`,
      'jp-FI': (l) => `研究をレベルアップするたびに🧪+${l * 20}`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'levelUpBreakthrough',
        apply: (gs: GameState, l: number) => ({ ...gs, rp: gs.rp + 20 * l }),
      },
    ],
  },
  {
    id: 'InstrumentalityProject',
    name: { 'en-US': 'Instrumentality Project', 'jp-FI': 'インストルメンタリティプロジェクト' },
    description: {
      'en-US': (l) => `When you do independent research, gain ${l * 9} 🧪`,
      'jp-FI': (l) => `独立の研究を行うたびに🧪+${l * 9}`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'independentResearch',
        apply: (gs: GameState, l: number) => ({ ...gs, rp: gs.rp + 9 * l }),
      },
    ],
  },
  {
    id: 'AngelInvestors',
    name: { 'en-US': 'Angel Investors', 'jp-FI': 'エンジェル投資家' },
    description: {
      'en-US': (l) => `Gain ${150 * l} money, but lose ${l * 10} influence`,
      'jp-FI': (l) => `${150 * l}kのお金を得るが、${l * 10}の影響力を失う`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [
      { paramEffected: 'money', amount: 150 },
      { paramEffected: 'influence', amount: -10 },
    ],
  },
  {
    id: 'QualiaOfHarmony',
    name: { 'en-US': 'Qualia of Harmony', 'jp-FI': '調和のクオリア' },
    description: {
      'en-US': (l) => `When you do government lobbying, get +${15 * l} SP`,
      'jp-FI': (l) => `治安を安定するたびに+${15 * l}SPを獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'influencePublicUnity',
        apply: (gs: GameState, l: number) => ({
          ...gs,
          sp: gs.sp + 15 * l,
        }),
      },
    ],
  },
]

////////////////////////////////////////////////////////////
// UNCOMMON
////////////////////////////////////////////////////////////

export const uncommonBreakthroughs: Breakthrough[] = [
  {
    id: 'WarningSigns',
    name: { 'en-US': 'Warning Signs', 'jp-FI': '警告サイン' },
    description: {
      'en-US': (l) => `Public unity +${l}`,
      'jp-FI': (l) => `公衆団結+${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    effect: [{ paramEffected: 'publicUnity', amount: 1 }],
  },
  {
    id: 'EchoChamberCollapse',
    name: { 'en-US': 'Echo Chamber Collapse', 'jp-FI': 'エコーチェンバー崩壊' },
    description: {
      'en-US': (l) => `When you increase influence, gain +${l * 20} ASI outcome`,
      'jp-FI': (l) => `影響力を増加させると、ASI結果+${l * 20}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'increaseInfluence',
        apply: (gs: GameState, level: number) => ({ ...gs, asiOutcome: gs.asiOutcome + 20 * level }),
      },
    ],
  },
  {
    id: 'CultureAdd',
    name: { 'en-US': 'Culture Add', 'jp-FI': 'カルチャーアド' },
    description: {
      'en-US': (l) => `When you recruit a human, ⚙️ +${l}`,
      'jp-FI': (l) => `人材を雇うたびに⚙️+${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'recruitHuman',
        apply: (gs: GameState, level: number) => ({ ...gs, up: gs.up + level }),
      },
    ],
  },
  {
    id: 'ViralVideos',
    name: { 'en-US': 'Viral Videos', 'jp-FI': 'バイラルビデオ' },
    description: {
      'en-US': (l) => `Gain ${l} influence each turn`,
      'jp-FI': (l) => `毎ターン影響力+${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => ({ ...gs, influence: gs.influence + level }),
      },
    ],
  },
  {
    id: 'AmplifiedOversight',
    name: { 'en-US': 'Amplified Oversight', 'jp-FI': '増幅された監視' },
    description: {
      'en-US': (l) => `When you increase ASI outcome, gain ${l * 12} 🔧`,
      'jp-FI': (l) => `ASI結果が増加すると、🔧+${l * 12}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'influenceAsiOutcome',
        apply: (gs: GameState, level: number) => ({ ...gs, ep: gs.ep + 12 * level }),
      },
    ],
  },
  {
    id: 'MultidisciplinaryCollaboration',
    name: { 'en-US': 'Multidisciplinary Collaboration', 'jp-FI': '学際的コラボレーション' },
    description: {
      'en-US': (l) => `When you finish a contract, ⚙️ +${l}`,
      'jp-FI': (l) => `契約を終了するたびに⚙️+${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, level: number) => ({ ...gs, up: gs.up + level }),
      },
    ],
  },
  {
    id: 'ConsensusFilter',
    name: { 'en-US': 'Consensus Filter', 'jp-FI': 'コンセンサスフィルター' },
    description: {
      'en-US': (l) => `Gain +${l} trust every turn`,
      'jp-FI': (l) => `毎ターン、信頼+${l}、だが公衆団結-${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
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
    id: 'OverclockedSimulations',
    name: { 'en-US': 'Overclocked Simulations', 'jp-FI': '過剰クロックシミュレーション' },
    description: {
      'en-US': (l) => `Each turn, 🧪+${l * 3} but 🔧-${l}`,
      'jp-FI': (l) => `毎ターン、🧪+${l * 3}、🔧-${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({ ...gs, ep: gs.ep - 1 * l, rp: gs.rp + 3 * l }),
      },
    ],
  },
  {
    id: 'SponsorshipLobby',
    name: { 'en-US': 'Sponsorship Lobby', 'jp-FI': 'スポンサーのロビー' },
    description: {
      'en-US': (l) => `When you finish a contract, gain ${l * 40} money, but lose ${l * 4} trust`,
      'jp-FI': (l) => `契約を終了するたび、${l * 40}kのお金を得るが、${l * 4}の信頼を失う`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, l: number) => ({ ...gs, money: gs.money + 40 * l, trust: gs.trust - 4 * l }),
      },
    ],
  },
  {
    id: 'PublicApology',
    name: { 'en-US': 'Public Apology', 'jp-FI': '公的謝り' },
    description: {
      'en-US': (l) => `Sets your trust to 85 when obtained or upgraded.`,
      'jp-FI': (l) => `取得またはアップグレード時に信頼を85に設定する`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    functionEffect: (gs: GameState) => ({ ...gs, trust: 85 }),
  },
  {
    id: 'MultiAgentCouncil',
    name: { 'en-US': 'Multi-Agent Council', 'jp-FI': 'マルチエージェント議会' },
    description: {
      'en-US': (l) => `When you upgrade a breakthrough, gain +${l} ⚙️`,
      'jp-FI': (l) => `研究をレベルアップするたびに⚙️+${l}`,
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
  {
    id: 'ReplicatorGrid',
    name: { 'en-US': 'Replicator Grid', 'jp-FI': '複製グリッド' },
    description: {
      'en-US': (l) => `Gain 1 🧪/🔧/💬 / turn`,
      'jp-FI': (l) => `毎ターン🧪/🔧/💬を1ずつ得る`,
    },
    rarity: 'uncommon',
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
    id: 'CallOfDuty',
    name: { 'en-US': 'Call of Duty', 'jp-FI': 'コール・オブ・デューティ' },
    description: {
      'en-US': (l) => `When you do government lobbying, select a new human`,
      'jp-FI': (l) => `団結を増加させると、新しい人材を獲得`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'influencePublicUnity',
        apply: (gs: GameState, level: number) => ({
          ...gs,
          currentScreen: 'selection',
          humanSelections: [...gs.humanSelections, generateHumanSelection(gs)],
        }),
      },
    ],
  },
]

////////////////////////////////////////////////////////////
// RARE
////////////////////////////////////////////////////////////

export const rareBreakthroughs: Breakthrough[] = [
  {
    id: 'ArmyOfConMen',
    name: { 'en-US': 'Army of Conmen', 'jp-FI': '詐欺師の軍' },
    description: {
      'en-US': (l) => `Gain +${l * 2} trust each turn, but lose ${l} public unity`,
      'jp-FI': (l) => `毎ターン信頼+${l}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    effect: [{ paramEffected: 'publicUnity', amount: -1 }],
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({ ...gs, trust: gs.trust + l * 2 }),
      },
    ],
  },
  {
    id: 'LethalityList',
    name: { 'en-US': 'List of Lethalities', 'jp-FI': '致命性リスト' },
    description: {
      'en-US': (l) => `Gain ${l * 40} influence, but public unity -${l}`,
      'jp-FI': (l) => `影響力が${l * 40}増加するが、公衆団結-${l}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    effect: [
      { paramEffected: 'influence', amount: 40 },
      { paramEffected: 'publicUnity', amount: -1 },
    ],
  },
  {
    id: 'StrategicBipartisanship',
    name: { 'en-US': 'Strategic Bipartisanship', 'jp-FI': '戦略的両党支持' },
    description: {
      'en-US': (l) => `Public unity +${l * 2}`,
      'jp-FI': (l) => `公衆団結+${l * 2}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    effect: [{ paramEffected: 'publicUnity', amount: 2 }],
  },
  {
    id: 'HypeEngine',
    name: { 'en-US': 'Hype Engine', 'jp-FI': 'ハイプエンジン' },
    description: {
      'en-US': (l) => `When you make a new breakthrough, gain ${l * 8} influence`,
      'jp-FI': (l) => `研究を行うたびに影響力+${l * 8}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    actionEventHandlers: [
      {
        trigger: 'researchBreakthrough',
        apply: (gs: GameState, level: number) => ({ ...gs, influence: gs.influence + 8 * level }),
      },
    ],
  },
  {
    id: 'PrecisionCorruption',
    name: { 'en-US': 'Precision Corruption', 'jp-FI': '精密な汚染' },
    description: {
      'en-US': (l) => `🧪 +${5 * l} / turn. Public unity -${l}`,
      'jp-FI': (l) => `毎ターン🧪+${5 * l}。公衆の支持 -1`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    effect: [{ paramEffected: 'publicUnity', amount: -1 }],
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({ ...gs, rp: gs.rp + 5 * l }),
      },
    ],
  },
  {
    id: 'InfiniteLoopRetries',
    name: { 'en-US': 'Infinite Loop Bypass', 'jp-FI': '無限ループバイパス' },
    description: {
      'en-US': (l) => `Gain +60 🔧 when you obtain or upgrade this`,
      'jp-FI': (l) => `取得またはアップグレード時に🔧+60`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    functionEffect: (gs: GameState) => ({ ...gs, ep: gs.ep + 60 }),
  },
  {
    id: 'IdealisticWorldview',
    name: { 'en-US': 'Idealistic Worldview', 'jp-FI': '理想主義的世界観' },
    description: {
      'en-US': (l) => `🧪 gain from humans is doubled, but you can no longer gain influence`,
      'jp-FI': (l) => `信頼獲得が0、🧪は2倍`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 1,
    modifiers: [
      {
        param: 'influence',
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
    id: 'ComputeTransparency',
    name: { 'en-US': 'Compute Transparency', 'jp-FI': '計算透明性' },
    description: {
      'en-US': (l) => `When you upgrade a breakthrough, gain ${l * 10} trust`,
      'jp-FI': (l) => `アップグレードを行うと、信頼+${l * 10}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    actionEventHandlers: [
      {
        trigger: 'gainUpgradePoint',
        apply: (gs: GameState, level: number) => ({ ...gs, trust: gs.trust + 10 * level }),
      },
    ],
  },
  {
    id: 'TechnicalAISafetyConference',
    name: { 'en-US': 'Technical AI Safety Conference', 'jp-FI': '技術的AI安全会議' },
    description: {
      'en-US': (l) => `When you do government lobbying, select a new breakthrough`,
      'jp-FI': (l) => `政府のロビー活動を行うと、新しいブレークスルーを獲得`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'influencePublicUnity',
        apply: (gs: GameState, level: number) => ({
          ...gs,
          currentScreen: 'selection',
          breakthroughSelections: [...gs.breakthroughSelections, generateBreakthroughSelection(gs)],
        }),
      },
    ],
  },
]

////////////////////////////////////////////////////////////
// EPIC
////////////////////////////////////////////////////////////

export const epicBreakthroughs: Breakthrough[] = [
  {
    id: 'UnitedIntervention',
    name: { 'en-US': 'United Intervention', 'jp-FI': 'ユニティ介入' },
    description: {
      'en-US': (l) => `+3 public unity, but lose 30 influence`,
      'jp-FI': (l) => `公衆団結+3、影響力-30`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [
      { paramEffected: 'publicUnity', amount: 3 },
      { paramEffected: 'influence', amount: -30 },
    ],
  },
  {
    id: 'EncodedProphecy',
    name: { 'en-US': 'Encoded Prophecy', 'jp-FI': '暗号化された予言' },
    description: {
      'en-US': (l) => `At the start of each year: +5 trust / influence / ASI outcome`,
      'jp-FI': (l) => `毎年終わりに信頼+5、影響力+5、ASI結果+5`,
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
              trust: gs.trust + 5,
              influence: gs.influence + 5,
              asiOutcome: gs.asiOutcome + 5,
            }
          }
          return gs
        },
      },
    ],
  },
  {
    id: 'HarmonyAccord',
    name: { 'en-US': 'Harmony Accord', 'jp-FI': 'ハーモニー協定' },
    description: {
      'en-US': (l) => `Gain 25 trust`,
      'jp-FI': (l) => `信頼+25`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [{ paramEffected: 'trust', amount: 25 }],
  },
  {
    id: 'HypnoDrones',
    name: { 'en-US': 'Hypno Drones', 'jp-FI': 'ヒプノドローン' },
    description: {
      'en-US': (l) => `Gain +5 💬 and -1 influence each turn`,
      'jp-FI': (l) => `毎ターン💬+5、影響力-1`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({
          ...gs,
          sp: gs.sp + 5 * l,
          influence: gs.influence - l,
        }),
      },
    ],
  },
  {
    id: 'TheThirdSignal',
    name: { 'en-US': 'The Third Signal', 'jp-FI': '第三の信号' },
    description: {
      'en-US': (l) => `Gain +40 🔧 and +40 🧪`,
      'jp-FI': (l) => `🔧+40、🧪+40`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [
      { paramEffected: 'ep', amount: 40 },
      { paramEffected: 'rp', amount: 40 },
    ],
  },
  {
    id: 'InstructionCollapse',
    name: { 'en-US': 'Instruction Collapse', 'jp-FI': '命令崩壊' },
    description: {
      'en-US': (l) => `Gain double 🔧, but 🧪 generation is halved`,
      'jp-FI': (l) => `🔧は2倍、🧪生成は半分`,
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
    id: 'RecursiveSelfImprovement',
    name: { 'en-US': 'Recursive Self-Improvement', 'jp-FI': '再帰的自己改善' },
    description: {
      'en-US': (l) => `Gain +5 🔧 and -1 ASI outcome each turn`,
      'jp-FI': (l) => `毎ターン🔧+5、ASI結果-1`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({
          ...gs,
          ep: gs.ep + 5 * l,
          asiOutcome: gs.asiOutcome - l,
        }),
      },
    ],
  },
  {
    id: 'StrategicExpansion',
    name: { 'en-US': 'Strategic Expansion', 'jp-FI': '戦略的拡大' },
    description: {
      'en-US': (l) => `Gain 25 influence`,
      'jp-FI': (l) => `影響力+25`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [{ paramEffected: 'influence', amount: 25 }],
  },
  {
    id: 'ArtificialConsciousness',
    name: { 'en-US': 'Artificial Consciousness', 'jp-FI': '人工意識' },
    description: {
      'en-US': (l) => `Gain +5 🧪 and -1 trust each turn`,
      'jp-FI': (l) => `毎ターン🧪+5、信頼-1`,
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
          rp: gs.rp + 5 * l,
        }),
      },
    ],
  },
  {
    id: 'SingularityTheorem',
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
    id: 'UpgradeRecycling',
    name: { 'en-US': 'Upgrade Recycling', 'jp-FI': 'アップグレードリサイクル' },
    description: {
      'en-US': (l) => `At the start of each year, gain +4 ⚙️`,
      'jp-FI': (l) => `毎年終わりに⚙️+4`,
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
  {
    id: 'AlignmentDividend',
    name: { 'en-US': 'Alignment Dividend', 'jp-FI': 'アラインメント配当' },
    description: {
      'en-US': (l) => `Gain 25 ASI outcome`,
      'jp-FI': (l) => `ASI結果+25`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [{ paramEffected: 'asiOutcome', amount: 25 }],
  },
  {
    id: 'ImperialMandate',
    name: { 'en-US': 'Imperial Mandate', 'jp-FI': '帝国の使命' },
    description: {
      'en-US': (l) => `Gain 2 humans and 1 breakthrough`,
      'jp-FI': (l) => `人材2人と研究1つを獲得`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    functionEffect: (gs: GameState) => ({
      ...gs,
      currentScreen: 'selection',
      humanSelections: [...gs.humanSelections, generateHumanSelection(gs), generateHumanSelection(gs)],
      breakthroughSelections: [...gs.breakthroughSelections, generateBreakthroughSelection(gs)],
    }),
  },
  {
    id: 'GlobalCoalition',
    name: { 'en-US': 'Global Coalition', 'jp-FI': 'グローバル連合' },
    description: {
      'en-US': (l) => `Gain 8 ⚙️`,
      'jp-FI': (l) => `⚙️+8`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [{ paramEffected: 'up', amount: 8 }],
  },
]

export const breakthroughs = [...commonBreakthroughs, ...uncommonBreakthroughs, ...rareBreakthroughs, ...epicBreakthroughs]
