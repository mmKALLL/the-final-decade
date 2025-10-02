// TypeScript version of the Dart Upgrade definitions, renamed to Breakthrough

import { Breakthrough, ModifierType, GameState } from '../types'
import { generateBreakthroughSelection, generateHumanSelection } from './data-generators'

////////////////////////////////////////////////////////////
// COMMON
////////////////////////////////////////////////////////////

export const commonBreakthroughs: Breakthrough[] = [
  {
    id: 'DebateCourse',
    name: { 'en-US': 'Debate Course', 'jp-FI': 'ディベートコース' },
    description: {
      'en-US': (l) => `Gain +${l * 2} 💬 every turn`,
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
    id: 'PoetryGenerator',
    name: { 'en-US': 'Poetry Generator', 'jp-FI': '詩ジェネレーター' },
    description: {
      'en-US': (l) => `When you do independent outreach, gain +${l * 10} 💬`,
      'jp-FI': (l) => `個人交流を行うたびに+${l * 10}💬を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'independentOutreach',
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
    id: 'SocialEngineering',
    name: { 'en-US': 'Social Engineering', 'jp-FI': 'ソーシャルエンジニアリング' },
    description: {
      'en-US': (l) => `When you finish a contract, gain +${l * 8} 💬`,
      'jp-FI': (l) => `契約を終了するたびに${l * 8}💬を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, level: number) => ({ ...gs, sp: gs.sp + 8 * level }),
      },
    ],
  },
  {
    id: 'FakeNews',
    name: { 'en-US': 'Fake News', 'jp-FI': 'フェイクニュース' },
    description: {
      'en-US': (l) => `When you do government lobbying, gain +${l * 30} 💬, but increase wages by 5%`,
      'jp-FI': (l) => `ロビー活動を行うと、+${l * 30}💬を獲得するが、賃金が5%増加する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'increaseUnity',
        apply: (gs: GameState, level: number) => ({
          ...gs,
          sp: gs.sp + 30 * level,
          trust: gs.trust - 5,
        }),
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
    id: 'EngineeringAdvisor',
    name: { 'en-US': 'Engineering Advisor', 'jp-FI': 'エンジニアリングアドバイザー' },
    description: {
      'en-US': (l) => `Gain ${l * 8} 🔧 every time you finish a contract`,
      'jp-FI': (l) => `契約を終了するたびに${l * 8}🔧を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, level: number) => ({ ...gs, ep: gs.ep + 8 * level }),
      },
    ],
  },
  {
    id: 'TrustedAdvisor',
    name: { 'en-US': 'Trusted Advisor', 'jp-FI': '信頼されるアドバイザー' },
    description: {
      'en-US': (l) => `When you finish a contract, gain +${l * 3} trust`,
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
    id: 'InterpretabilityModel',
    name: { 'en-US': 'Interpretability Model', 'jp-FI': '解釈可能性モデル' },
    description: {
      'en-US': (l) => `When you finish a contract, gain +${l * 3} outcome`,
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
    id: 'Duplicator',
    name: { 'en-US': 'Duplicator', 'jp-FI': '複製機' },
    description: {
      'en-US': (l) => `Gain +${l * 2} 🧪 every turn`,
      'jp-FI': (l) => `各ターンに+${l * 2}🧪を獲得する`,
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
    id: 'MoneyLaundering',
    name: { 'en-US': 'Money Laundering', 'jp-FI': 'マネーロンダリング' },
    description: {
      'en-US': (l) => `Gain +${l * 8} income, but trust -${l * 10}`,
      'jp-FI': (l) => `ターンごとに${l * 8}のお金を得るが、${l * 10}の信頼を失う`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [
      { paramEffected: 'trust', amount: -10 },
      { paramEffected: 'income', amount: 8 },
    ],
  },
  {
    id: 'SingularLearningTheory',
    name: { 'en-US': 'Singular Learning Theory', 'jp-FI': 'シンギュラー・ラーニング・セオリー' },
    description: {
      'en-US': (l) => `When you level up a breakthrough, gain +${l * 20} 🧪`,
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
  // {
  //   id: 'AdversarialRedTeaming',
  //   name: { 'en-US': 'Adversarial Red-Teaming', 'jp-FI': '敵対的レッドチーミング' },
  //   description: {
  //     'en-US': (l) => `When you increase outcome, gain +${l * 12} 💬`,
  //     'jp-FI': (l) => `ASI結果を増加させると、💬+${l * 12}`,
  //   },
  //   rarity: 'common',
  //   level: 0,
  //   maxLevel: 3,
  //   actionEventHandlers: [
  //     {
  //       trigger: 'increaseAsiOutcome',
  //       apply: (gs: GameState, level: number) => ({ ...gs, sp: gs.sp + 12 * level }),
  //     },
  //   ],
  // },
  {
    id: 'InstrumentalityProject',
    name: { 'en-US': 'Instrumentality Project', 'jp-FI': 'インストルメンタリティプロジェクト' },
    description: {
      'en-US': (l) => `When you do independent research, gain ${l * 10} 🧪`,
      'jp-FI': (l) => `個人研究を行うたびに🧪+${l * 10}`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'independentResearch',
        apply: (gs: GameState, l: number) => ({ ...gs, rp: gs.rp + 10 * l }),
      },
    ],
  },
  {
    id: 'AngelInvestors',
    name: { 'en-US': 'Angel Investors', 'jp-FI': 'エンジェル投資家' },
    description: {
      'en-US': (l) => `Gain ${150 * l} money, but wages are 10% higher`,
      'jp-FI': (l) => `${150 * l}kのお金を得るが、賃金が10%増加する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    effect: [
      { paramEffected: 'money', amount: 150 },
      { paramEffected: 'trust', amount: -10 },
    ],
  },
  {
    id: 'QualiaOfHarmony',
    name: { 'en-US': 'Qualia of Harmony', 'jp-FI': '調和のクオリア' },
    description: {
      'en-US': (l) => `When you do government lobbying, get +${15 * l} 💬`,
      'jp-FI': (l) => `治安を安定するたびに+${15 * l}💬を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'increaseUnity',
        apply: (gs: GameState, l: number) => ({
          ...gs,
          sp: gs.sp + 15 * l,
        }),
      },
    ],
  },
  {
    id: 'CoherentVolition',
    name: { 'en-US': 'Coherent Volition', 'jp-FI': '首尾一貫した意志' },
    description: {
      'en-US': (l) => `Gain 💬/🔧/🧪 equal to public unity each turn (when positive)`,
      'jp-FI': (l) => `公衆団結が正の場合、毎ターン公衆団結と同じ量の💬/🔧/🧪を獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => {
          const unityBonus = Math.max(0, gs.publicUnity)
          return {
            ...gs,
            sp: gs.sp + unityBonus,
            ep: gs.ep + unityBonus,
            rp: gs.rp + unityBonus,
          }
        },
      },
    ],
  },
  {
    id: 'WaluigiEffect',
    name: { 'en-US': 'Waluigi Effect', 'jp-FI': 'ワルイージ効果' },
    description: {
      'en-US': (l) => `Gain 1 💬/🔧/🧪 each turn while trust is under 100`,
      'jp-FI': (l) => `信頼が100未満の間、毎ターン💬/🔧/🧪を1ずつ獲得する`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => {
          return {
            ...gs,
            ...(gs.trust < 100 && {
              sp: gs.sp + 1,
              ep: gs.ep + 1,
              rp: gs.rp + 1,
            }),
          }
        },
      },
    ],
  },
]

////////////////////////////////////////////////////////////
// UNCOMMON
////////////////////////////////////////////////////////////

export const uncommonBreakthroughs: Breakthrough[] = [
  {
    id: 'NonviolentCommunication',
    name: { 'en-US': 'Nonviolent Communication', 'jp-FI': 'コンセンサスフィルター' },
    description: {
      'en-US': (l) => `Gain +${l} trust every turn`,
      'jp-FI': (l) => `毎ターン、信頼+${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({
          ...gs,
          trust: gs.trust + l,
        }),
      },
    ],
  },
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
  // {
  //   id: 'EchoChamberCollapse',
  //   name: { 'en-US': 'Echo Chamber Collapse', 'jp-FI': 'エコーチェンバー崩壊' },
  //   description: {
  //     'en-US': (l) => `When you increase trust, gain +${l * 8} outcome`,
  //     'jp-FI': (l) => `信頼を増加させると、ASI結果+${l * 8}`,
  //   },
  //   rarity: 'uncommon',
  //   level: 0,
  //   maxLevel: 3,
  //   actionEventHandlers: [
  //     {
  //       trigger: 'increaseTrust',
  //       apply: (gs: GameState, level: number) => ({ ...gs, asiOutcome: gs.asiOutcome + 8 * level }),
  //     },
  //   ],
  // },
  {
    id: 'InfluenceIncubator',
    name: { 'en-US': 'Influence Incubator', 'jp-FI': '影響力インキュベーター' },
    description: {
      'en-US': (l) => `When you recruit a human, gain +${5 * l} outcome`,
      'jp-FI': (l) => `人材を雇うたびに影響力+${5 * l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'recruitHuman',
        apply: (gs: GameState, level: number) => ({ ...gs, asiOutcome: gs.asiOutcome + 5 * level }),
      },
    ],
  },
  {
    id: 'PublicApology',
    name: { 'en-US': 'Public Apology', 'jp-FI': '公的謝り' },
    description: {
      'en-US': (l) => `Sets your trust to 85 when obtained or leveled up`,
      'jp-FI': (l) => `取得またはアップグレード時に信頼を85に設定する`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    functionEffect: (gs: GameState) => ({ ...gs, trust: 85 }),
  },
  {
    id: 'SponsorshipLobby',
    name: { 'en-US': 'Sponsorship Lobby', 'jp-FI': 'スポンサーのロビー' },
    description: {
      'en-US': (l) => `When you finish a contract, gain +${l * 3} income, but lose ${l * 8} trust`,
      'jp-FI': (l) => `契約を終了するたび、収入+${l * 3}、信頼-${l * 8}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, l: number) => ({
          ...gs,
          income: gs.income + 3 * l,
          trust: gs.trust - 8 * l,
        }),
      },
    ],
  },
  {
    id: 'ViralVideos',
    name: { 'en-US': 'Viral Videos', 'jp-FI': 'バイラルビデオ' },
    description: {
      'en-US': (l) => `Gain ${l} outcome each turn`,
      'jp-FI': (l) => `毎ターンASI結果+${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => ({ ...gs, asiOutcome: gs.asiOutcome + level }),
      },
    ],
  },
  // {
  //   id: 'AmplifiedOversight',
  //   name: { 'en-US': 'Amplified Oversight', 'jp-FI': '増幅された監視' },
  //   description: {
  //     'en-US': (l) => `When you increase outcome, gain ${l * 8} 💬 and 🧪`,
  //     'jp-FI': (l) => `ASI結果が増加すると、🧪と💬+${l * 8}`,
  //   },
  //   rarity: 'uncommon',
  //   level: 0,
  //   maxLevel: 3,
  //   actionEventHandlers: [
  //     {
  //       trigger: 'increaseAsiOutcome',
  //       apply: (gs: GameState, level: number) => ({ ...gs, sp: gs.sp + 8 * level, rp: gs.rp + 8 * level }),
  //     },
  //   ],
  // },
  {
    id: 'OverclockedSimulations',
    name: { 'en-US': 'Overclocked Simulations', 'jp-FI': '過剰クロックシミュレーション' },
    description: {
      'en-US': (l) => `Each turn, gain ${l * 3} 🧪 but lose ${l} 🔧`,
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
    id: 'MultiAgentBoost',
    name: { 'en-US': 'Multi-Agent Boost', 'jp-FI': 'マルチエージェントブースト' },
    description: {
      'en-US': (l) => `When you level up a breakthrough, gain +${l * 2} ⚙️`,
      'jp-FI': (l) => `研究をレベルアップするたびに⚙️+${l * 2}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'levelUpBreakthrough',
        apply: (gs: GameState, level: number) => ({ ...gs, up: gs.up + 2 * level }),
      },
    ],
  },
  {
    id: 'AlignmentAgenda',
    name: { 'en-US': 'Alignment Agenda', 'jp-FI': 'アラインメントアジェンダ' },
    description: {
      'en-US': (l) => `Gain ${l} outcome each turn`,
      'jp-FI': (l) => `毎ターンASI結果+${l}`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, level: number) => ({ ...gs, asiOutcome: gs.asiOutcome + level }),
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
    id: 'CallOfDuty',
    name: { 'en-US': 'Dutiful Diligence', 'jp-FI': 'コール・オブ・デューティ' },
    description: {
      'en-US': (l) => `When you do government lobbying, select a new human`,
      'jp-FI': (l) => `政府ロビー活動を行うと、新しい人材を選択`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'increaseUnity',
        apply: (gs: GameState, level: number) => ({
          ...gs,
          currentScreen: 'selection',
          humanSelections: [...gs.humanSelections, generateHumanSelection(gs)],
        }),
      },
    ],
  },
  {
    id: 'TheChosenOne',
    name: { 'en-US': 'The Chosen One', 'jp-FI': '選ばれし者' },
    description: {
      'en-US': (l) => `Select a rare human to your team`,
      'jp-FI': (l) => `レアな人材をチームに選ぶ`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 1,
    functionEffect: (gs: GameState) => ({
      ...gs,
      currentScreen: 'selection',
      humanSelections: [...gs.humanSelections, generateHumanSelection(gs, 200, 'rare')],
    }),
  },
  {
    id: 'ReplicatorGrid',
    name: { 'en-US': 'Replicator Grid', 'jp-FI': '複製グリッド' },
    description: {
      'en-US': (l) => `Gain +${l} 💬/🔧/🧪 each turn`,
      'jp-FI': (l) => `毎ターン💬/🔧/🧪を${l}ずつ得る`,
    },
    rarity: 'uncommon',
    level: 0,
    maxLevel: 3,
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
]

////////////////////////////////////////////////////////////
// RARE
////////////////////////////////////////////////////////////

export const rareBreakthroughs: Breakthrough[] = [
  {
    id: 'LethalityList',
    name: { 'en-US': 'List of Lethalities', 'jp-FI': '致命性リスト' },
    description: {
      'en-US': (l) => `Gain ${l * 40} outcome, but public unity -${l}`,
      'jp-FI': (l) => `影響力が${l * 40}増加するが、公衆団結-${l}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    effect: [
      { paramEffected: 'asiOutcome', amount: 40 },
      { paramEffected: 'publicUnity', amount: -1 },
    ],
  },
  {
    id: 'StrategicBipartisanship',
    name: { 'en-US': 'Strategic Bipartisanship', 'jp-FI': '戦略的両党支持' },
    description: {
      'en-US': (l) => `Gain +${l * 2} public unity, but income -${l * 6}`,
      'jp-FI': (l) => `公衆団結+${l * 2}、収入-${l * 6}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    effect: [
      { paramEffected: 'publicUnity', amount: 2 },
      { paramEffected: 'income', amount: -6 },
    ],
  },
  {
    id: 'CultureAdd',
    name: { 'en-US': 'Culture Add', 'jp-FI': 'カルチャーアド' },
    description: {
      'en-US': (l) => `When you recruit a human, gain +${l * 2} ⚙️`,
      'jp-FI': (l) => `人材を雇うたびに⚙️+${l * 2}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    actionEventHandlers: [
      {
        trigger: 'recruitHuman',
        apply: (gs: GameState, level: number) => ({ ...gs, up: gs.up + 2 * level }),
      },
    ],
  },
  {
    id: 'ArmyOfConMen',
    name: { 'en-US': 'Army of Conmen', 'jp-FI': '詐欺師の軍' },
    description: {
      'en-US': (l) => `Gain +${l * 2} trust every turn, but public unity -${l}`,
      'jp-FI': (l) => `毎ターン信頼+${l * 2}、公衆団結-${l}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    effect: [{ paramEffected: 'publicUnity', amount: -1 }],
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({ ...gs, trust: gs.trust + 2 * l }),
      },
    ],
  },
  {
    id: 'InfiniteLoopBypass',
    name: { 'en-US': 'Infinite Loop Bypass', 'jp-FI': '無限ループバイパス' },
    description: {
      'en-US': (l) => `Gain +60 🔧 when obtained or leveled up`,
      'jp-FI': (l) => `取得またはアップグレード時に🔧+60`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    functionEffect: (gs: GameState) => ({ ...gs, ep: gs.ep + 60 }),
  },
  {
    id: 'HypeEngine',
    name: { 'en-US': 'Hype Engine', 'jp-FI': 'ハイプエンジン' },
    description: {
      'en-US': (l) => `When you make a new breakthrough, gain ${l * 8} outcome`,
      'jp-FI': (l) => `新しいブレークスルーを作るたびにASI結果+${l * 8}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    actionEventHandlers: [
      {
        trigger: 'researchBreakthrough',
        apply: (gs: GameState, level: number) => ({ ...gs, asiOutcome: gs.asiOutcome + 8 * level }),
      },
    ],
  },
  {
    id: 'LogicalInduction',
    name: { 'en-US': 'Logical Induction', 'jp-FI': '論理的帰納法' },
    description: {
      'en-US': (l) => `When you finish a contract, gain ${l * 10} 🔧 and ${l * 5} 🧪`,
      'jp-FI': (l) => `契約を終了するたびに🔧+${l * 10}と🧪+${l * 5}を獲得する`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, level: number) => ({
          ...gs,
          ep: gs.ep + 10 * level,
          rp: gs.rp + 5 * level,
        }),
      },
    ],
  },
  {
    id: 'DataScraping',
    name: { 'en-US': 'Data Scraping', 'jp-FI': 'データスクレイピング' },
    description: {
      'en-US': (l) => `Gain +${70 * l} 🧪 when this is obtained or leveled up`,
      'jp-FI': (l) => `取得またはアップグレード時に🧪+${70 * l}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    effect: [{ paramEffected: 'rp', amount: 70 }],
    actionEventHandlers: [],
  },
  {
    id: 'ComputeTransparency',
    name: { 'en-US': 'Compute Transparency', 'jp-FI': '計算の透明性' },
    description: {
      'en-US': (l) => `When you level up a breakthrough, gain +${l * 10} trust`,
      'jp-FI': (l) => `研究をレベルアップするたびに信頼+${l * 10}`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 2,
    actionEventHandlers: [
      {
        trigger: 'levelUpBreakthrough',
        apply: (gs: GameState, level: number) => ({ ...gs, trust: gs.trust + 10 * level }),
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
    id: 'IdealisticWorldview',
    name: { 'en-US': 'Idealistic Worldview', 'jp-FI': '理想主義的世界観' },
    description: {
      'en-US': (l) => `🧪 gain from humans is doubled, but wages are increased by 50%`,
      'jp-FI': (l) => `人材からの🧪獲得が2倍になるが、賃金が50%増加する`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 1,
    functionEffect: (gs: GameState) => ({ ...gs, trust: gs.trust - 50 }),
    modifiers: [
      {
        param: 'rp',
        type: ModifierType.Multiply,
        apply: (v: number) => v * 2,
      },
    ],
  },
  // {
  //   id: 'InnerCorrigibility',
  //   name: { 'en-US': 'Inner Corrigibility', 'jp-FI': '内部修正可能性' },
  //   description: {
  //     'en-US': (l) => `When you increase trust, gain ${l * 8} outcome`,
  //     'jp-FI': (l) => `信頼を増加させると、ASI結果+${l * 8}`,
  //   },
  //   rarity: 'rare',
  //   level: 0,
  //   maxLevel: 2,
  //   actionEventHandlers: [
  //     {
  //       trigger: 'increaseTrust',
  //       apply: (gs: GameState, level: number) => ({ ...gs, asiOutcome: gs.asiOutcome + 8 * level }),
  //     },
  //   ],
  // },
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
        trigger: 'increaseUnity',
        apply: (gs: GameState, level: number) => ({
          ...gs,
          currentScreen: 'selection',
          breakthroughSelections: [...gs.breakthroughSelections, generateBreakthroughSelection(gs)],
        }),
      },
    ],
  },
  {
    id: 'ShardTheory',
    name: { 'en-US': 'Shard Theory', 'jp-FI': 'シャード理論' },
    description: {
      'en-US': (l) => `Public unity no longer affects outcome`,
      'jp-FI': (l) => `公衆団結はASI結果に影響しない`,
    },
    rarity: 'rare',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'turnEnd',
        apply: (gs: GameState, l: number) => ({
          ...gs,
          asiOutcome: gs.asiOutcome - gs.publicUnity,
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
      'en-US': (l) => `+3 public unity, but -30 income`,
      'jp-FI': (l) => `公衆団結+3、収入-30`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [
      { paramEffected: 'publicUnity', amount: 3 },
      { paramEffected: 'income', amount: -30 },
    ],
  },
  {
    id: 'EncodedProphecy',
    name: { 'en-US': 'Encoded Prophecy', 'jp-FI': '暗号化された予言' },
    description: {
      'en-US': (l) => `At the end of each year: +10 trust / outcome (from next year onwards)`,
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
              trust: gs.trust + 10,
              asiOutcome: gs.asiOutcome + 10,
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
      'en-US': (l) => `Gain +5 💬 and -1 outcome each turn`,
      'jp-FI': (l) => `毎ターン💬+5、ASI結果-1`,
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
          asiOutcome: gs.asiOutcome - l,
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
      'en-US': (l) => `Gain +5 🔧 and -1 outcome each turn`,
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
      'en-US': (l) => `Gain +15 🔧 when you finish a contract`,
      'jp-FI': (l) => `契約を終了するたびに🔧+15`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    actionEventHandlers: [
      {
        trigger: 'contractSuccess',
        apply: (gs: GameState, level: number) => ({ ...gs, ep: gs.ep + 15 }),
      },
    ],
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
      'en-US': (l) => `When you research a breakthrough, gain ${l * 10} outcome`,
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
    id: 'Control Policy',
    name: { 'en-US': 'Control Policy', 'jp-FI': 'アラインメント配当' },
    description: {
      'en-US': (l) => `Gain 25 outcome`,
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
      'en-US': (l) => `Select 2 humans and 1 breakthrough`,
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
      'en-US': (l) => `Gain +8 ⚙️`,
      'jp-FI': (l) => `⚙️+8`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [{ paramEffected: 'up', amount: 8 }],
  },
  {
    id: 'TheUltimateGrant',
    name: { 'en-US': 'The Ultimate Grant', 'jp-FI': '最終的な助成金' },
    description: {
      'en-US': (l) => `Gain 250 money`,
      'jp-FI': (l) => `お金+250`,
    },
    rarity: 'epic',
    level: 0,
    maxLevel: 1,
    effect: [{ paramEffected: 'money', amount: 250 }],
  },
]

export const breakthroughs: Breakthrough[] = [...commonBreakthroughs, ...uncommonBreakthroughs, ...rareBreakthroughs, ...epicBreakthroughs]
