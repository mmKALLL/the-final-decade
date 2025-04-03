// TypeScript version of the Dart Upgrade definitions, renamed to Breakthrough

import { Breakthrough, ModifierType, GameState } from '../types'

////////////////////////////////////////////////////////////
// COMMON
////////////////////////////////////////////////////////////

export const commonBreakthroughs: Breakthrough[] = [
  {
    // Tested: ok
    id: 'RewardHacking',
    name: { 'en-US': 'Reward Hacking', 'jp-FI': 'リワードハッキング' },
    description: {
      'en-US': (l) => `RP/EP/SP gain from humans is increased by ${l * 10}%`,
      'jp-FI': (l) => `人材からのRP/EP/SP獲得が${l * 10}%増加`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    modifiers: [
      {
        param: 'rp',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => value * (1 + 0.1 * level),
      },
      {
        param: 'ep',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => value * (1 + 0.1 * level),
      },
      {
        param: 'sp',
        type: ModifierType.Multiply,
        apply: (value: number, level: number) => value * (1 + 0.1 * level),
      },
    ],
  },
  {
    id: 'Duplicator',
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
    id: 'Monosemanticity',
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
    id: 'DebateCourse',
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
    id: 'PoetryGenerator',
    name: { 'en-US': 'Poetry Generator', 'jp-FI': '詩ジェネレーター' },
    description: {
      'en-US': (l) => `When you do independent outreach, gain ${l * 9} SP`,
      'jp-FI': (l) => `独立のアウトリーチを行うたびに${l * 9}SPを獲得する`,
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
      'en-US': (l) => `Gain ${l * 6} EP every time you refresh contracts`,
      'jp-FI': (l) => `契約を更新するたびに${l * 6}EPを獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'refreshContracts',
        apply: (gs: GameState, level: number) => ({ ...gs, ep: gs.ep + 6 * level }),
      },
    ],
  },
  {
    id: 'ResearchAdvisor',
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
    id: 'EngineeringAdvisor',
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
    id: 'SocialAdvisor',
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
      'en-US': (l) => `When you finish a contract, +${l * 4} ASI outcome`,
      'jp-FI': (l) => `契約を終了するたびに+${l * 4}%ASI報酬を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, level: number) => ({ ...gs, asiOutcome: gs.asiOutcome + 4 * level }),
      },
    ],
  },
  {
    id: 'TrustedAdvisor',
    name: { 'en-US': 'Trusted Advisor', 'jp-FI': '信頼されるアドバイザー' },
    description: {
      'en-US': (l) => `When you finish a contract, gain ${l * 4} trust`,
      'jp-FI': (l) => `契約を終了するたびに${l * 4}信頼を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, level: number) => ({ ...gs, trust: gs.trust + 4 * level }),
      },
    ],
  },
  {
    id: 'PassiveIncome',
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
    id: 'SocialEngineering',
    name: { 'en-US': 'Social Engineering', 'jp-FI': 'ソーシャルエンジニアリング' },
    description: {
      'en-US': (l) => `When you finish a contract, gain ${l * 4} influence`,
      'jp-FI': (l) => `契約を終了するたびに${l * 4}影響力を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, level: number) => ({ ...gs, influence: gs.influence + 4 * level }),
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
      'en-US': (l) => `Gain ${5 * l} money per turn, but lose ${10 * l} trust`,
      'jp-FI': (l) => `ターンごとに${5 * l}のお金を得るが、${10 * l}の信頼を失う`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [{ paramEffected: 'trust', amount: -10 }],
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => ({ ...gs, money: gs.money + 5 * level }),
      },
    ],
  },
  {
    id: 'DataScraping',
    name: { 'en-US': 'Data Scraping', 'jp-FI': 'データスクレイピング' },
    description: {
      'en-US': (l) => `Get ${l * 3} income, but lose ${l * 10} trust`,
      'jp-FI': (l) => `各ターン開始時に${l * 3}kの収入を得るが、信頼が${l * 10}失われる`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [
      { paramEffected: 'trust', amount: -10 },
      { paramEffected: 'passiveIncome', amount: 3 },
    ],
  },
  {
    id: 'SingularLearningTheory',
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
    id: 'InstrumentalityProject',
    name: { 'en-US': 'Instrumentality Project', 'jp-FI': 'インストルメンタリティプロジェクト' },
    description: {
      'en-US': (l) => `When you do independent research, gain ${l * 9} RP`,
      'jp-FI': (l) => `独立の研究を行うたびにRP+${l * 9}`,
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
    id: 'ConsensusFilter',
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
    id: 'OverclockedSimulations',
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
    id: 'FailsafeDaemon',
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
    id: 'MultiAgentCouncil',
    name: { 'en-US': 'Multi-Agent Council', 'jp-FI': 'マルチエージェント議会' },
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

////////////////////////////////////////////////////////////
// RARE
////////////////////////////////////////////////////////////

export const rareBreakthroughs: Breakthrough[] = [
  {
    id: 'LethalityList',
    name: { 'en-US': 'List of Lethalities', 'jp-FI': '致命性リスト' },
    description: {
      'en-US': (l) => `Gain ${l * 25} influence, but public unity -${l}`,
      'jp-FI': (l) => `影響力が${l * 25}増加するが、公衆団結-${l}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 3,
    effect: [
      { paramEffected: 'influence', amount: 25 },
      { paramEffected: 'publicUnity', amount: -1 },
    ],
  },
  {
    id: 'StrategicBipartisanship',
    name: { 'en-US': 'Strategic Bipartisanship', 'jp-FI': '戦略的両党支持' },
    description: {
      'en-US': (l) => `Public unity increased by ${l * 2}`,
      'jp-FI': (l) => `公衆団結+${l * 2}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 3,
    effect: [{ paramEffected: 'publicUnity', amount: 2 }],
  },
  {
    id: 'PrecisionCorruption',
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
    id: 'InfiniteLoopRetries',
    name: { 'en-US': 'Infinite Loop Bypass', 'jp-FI': '無限ループバイパス' },
    description: {
      'en-US': (l) => `Gain ${l * 2} EP each turn`,
      'jp-FI': (l) => `毎ターン${l * 2}EPを得る`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({ ...gs, ep: gs.ep + 2 * l }),
      },
    ],
  },
  {
    id: 'ReplicatorGrid',
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
    id: 'AestheticImpairment',
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
    id: 'ArmyOfConMen',
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

////////////////////////////////////////////////////////////
// EPIC
////////////////////////////////////////////////////////////

export const epicBreakthroughs: Breakthrough[] = [
  {
    id: 'ArtificialConsciousness',
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
    id: 'TheThirdSignal',
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
    id: 'UnitedIntervention',
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
    id: 'InstructionCollapse',
    name: { 'en-US': 'Instruction Collapse', 'jp-FI': '命令崩壊' },
    description: {
      'en-US': (l) => `Gain double EP, but RP generation is halved`,
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
    id: 'EncodedProphecy',
    name: { 'en-US': 'Encoded Prophecy', 'jp-FI': '暗号化された予言' },
    description: {
      'en-US': (l) => `At the start of each year: +5 trust and +5 influence`,
      'jp-FI': (l) => `毎年終わりに信頼+5、影響力+5`,
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
            }
          }
          return gs
        },
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
