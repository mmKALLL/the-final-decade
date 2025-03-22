// TypeScript version of the Dart Upgrade definitions, renamed to Breakthrough

import { Breakthrough, ParamEventHandler, Modifier, ActionEventHandler, ModifierType } from '../types'

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
}

export const breakthroughs: Breakthrough[] = [
  {
    id: BreakthroughId.RewardHacking,
    name: { 'en-US': 'Reward Hacking', 'jp-FI': 'リワードハッキング' },
    description: {
      'en-US': (l) => `${l * 8}% chance to get an extra point when receiving RP/EP/SP`,
      'jp-FI': (l) => `RP/EP/SPを受け取るとき、${l * 8}%の確率で追加ポイントを得る`,
    },
    rarity: 'common',
    level: 0,
    maxLevel: 5,
    effect: [],
    modifiers: [],
    actionEventHandlers: [],
    paramEventHandlers: [
      new ParamEventHandler('rp', (gs, stack, param, value, l) => {
        if (Math.random() <= 0.08 * l) stack.push({ paramEffected: 'rp', amount: 1 })
      }),
      new ParamEventHandler('ep', (gs, stack, param, value, l) => {
        if (Math.random() <= 0.08 * l) stack.push({ paramEffected: 'ep', amount: 1 })
      }),
      new ParamEventHandler('sp', (gs, stack, param, value, l) => {
        if (Math.random() <= 0.08 * l) stack.push({ paramEffected: 'sp', amount: 1 })
      }),
    ],
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
      new ParamEventHandler('ep', (gs, stack, param, value, l) => {
        if (Math.random() < 0.25 * l) stack.push({ paramEffected: 'rp', amount: 1 })
      }),
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
      new ParamEventHandler('sp', (gs, stack, param, value, l) => {
        if (Math.random() < 0.25 * l) stack.push({ paramEffected: 'ep', amount: 1 })
      }),
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
      new ParamEventHandler('rp', (gs, stack, param, value, l) => {
        if (Math.random() < 0.25 * l) stack.push({ paramEffected: 'sp', amount: 1 })
      }),
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
    modifiers: [new Modifier('money', ModifierType.Add, (value, level) => (value > 0 ? value + 10 * level : value))],
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
    modifiers: [new Modifier('sp', ModifierType.Multiply, (value, level) => (value >= 0 ? value : value * (1 - 0.2 * level)))],
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
      new ActionEventHandler('dayChange', (gs, stack, eventId, level) => {
        stack.push({ paramEffected: 'rp', amount: 1 * level })
      }),
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
    modifiers: [new Modifier('rp', ModifierType.Multiply, (value, l) => (value >= 0 ? value * (1 + 0.2 * l) : value))],
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
    modifiers: [new Modifier('ep', ModifierType.Multiply, (value, l) => (value >= 0 ? value * (1 + 0.2 * l) : value))],
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
    modifiers: [new Modifier('sp', ModifierType.Multiply, (value, l) => (value >= 0 ? value * (1 + 0.2 * l) : value))],
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
    modifiers: [new Modifier('trust', ModifierType.Multiply, (value, l) => value * (1 + 0.5 * l))],
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
    modifiers: [new Modifier('trust', ModifierType.Add, (value, l) => value + l * 3)],
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
      new ActionEventHandler('dayChange', (gs, stack, eventId, l) => {
        stack.push({ paramEffected: 'money', amount: 1 * l })
      }),
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
      new ActionEventHandler('dayChange', (gs, stack, eventId, l) => {
        stack.push({ paramEffected: 'rp', amount: l })
      }),
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
      new ActionEventHandler('dayChange', (gs, stack, eventId, l) => {
        stack.push({ paramEffected: 'asiOutcome', amount: l })
      }),
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
    modifiers: [new Modifier('influence', ModifierType.Add, (value, l) => value + l * 6)],
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
      new ActionEventHandler('dayChange', (gs, stack, eventId, l) => {
        stack.push({ paramEffected: 'money', amount: 2 * l })
      }),
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
      new ActionEventHandler('dayChange', (gs, stack, eventId, l) => {
        stack.push({ paramEffected: 'asiOutcome', amount: 2 * l })
      }),
    ],
    paramEventHandlers: [],
  },
]
