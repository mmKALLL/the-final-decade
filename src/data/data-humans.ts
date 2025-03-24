import { Human } from '../types'

export const spHumans: Human[] = [
  // === SP-FOCUSED CHARACTERS (24 Total) ===
  // COMMON (3 volunteer/junior, 2 medior, 1 senior/lead)
  {
    name: { 'en-US': 'Logan Reeves', 'jp-FI': 'ローガン・リーブス' },
    rarity: 'common',
    type: 'sp',
    wage: 0,
    rank: 'volunteer',
    spGeneration: 1,
    epGeneration: 0,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'trust', amount: -5 }],
  },
  {
    name: { 'en-US': 'Nozomi Fujikawa', 'jp-FI': '藤川 希' },
    rarity: 'common',
    type: 'sp',
    wage: 2,
    rank: 'volunteer',
    spGeneration: 2,
    epGeneration: 0,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'sp', amount: -12 }],
  },
  {
    name: { 'en-US': 'Yuto Suzuki', 'jp-FI': '鈴木 雄斗' },
    rarity: 'common',
    type: 'sp',
    wage: 2,
    rank: 'volunteer',
    spGeneration: 2,
    epGeneration: 0,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'influence', amount: -5 }],
  },
  {
    name: { 'en-US': 'Sora Yamamoto', 'jp-FI': '山本 空' },
    rarity: 'common',
    type: 'sp',
    wage: 3,
    rank: 'junior',
    spGeneration: 2,
    epGeneration: 0,
    rpGeneration: 0,
  },
  {
    name: { 'en-US': 'Aoi Takahashi', 'jp-FI': '高橋 葵' },
    rarity: 'common',
    type: 'sp',
    wage: 3,
    rank: 'junior',
    spGeneration: 2,
    epGeneration: 0,
    rpGeneration: 0,
  },
  {
    name: { 'en-US': 'Elena Duarte', 'jp-FI': 'エレナ・ドゥアルテ' },
    rarity: 'common',
    type: 'sp',
    wage: 4,
    rank: 'junior',
    spGeneration: 1,
    epGeneration: 0,
    rpGeneration: 1,
  },
  {
    name: { 'en-US': 'Haruto Ishii', 'jp-FI': '石井 陽翔' },
    rarity: 'common',
    type: 'sp',
    wage: 6,
    rank: 'medior',
    spGeneration: 3,
    epGeneration: 0,
    rpGeneration: 0,
  },
  {
    name: { 'en-US': 'Isaac Romero', 'jp-FI': 'アイザック・ロメロ' },
    rarity: 'common',
    type: 'sp',
    wage: 8,
    rank: 'medior',
    spGeneration: 4,
    epGeneration: 0,
    rpGeneration: 0,
  },
  {
    name: { 'en-US': 'Rajiv Gupta', 'jp-FI': 'ラジブ・グプタ' },
    rarity: 'common',
    type: 'sp',
    wage: 10,
    rank: 'senior',
    spGeneration: 4,
    epGeneration: 0,
    rpGeneration: 0,
  },
  {
    name: { 'en-US': 'Sebastian Klein', 'jp-FI': 'セバスチャン・クライン' },
    rarity: 'common',
    type: 'sp',
    wage: 15,
    rank: 'lead',
    spGeneration: 3,
    epGeneration: 1,
    rpGeneration: 1,
  },

  // UNCOMMON (1 per rank)
  {
    name: { 'en-US': 'Elio Marchesi', 'jp-FI': 'エリオ・マルケージ' },
    rarity: 'uncommon',
    type: 'sp',
    wage: 3,
    rank: 'volunteer',
    spGeneration: 2,
    epGeneration: 0,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'asiOutcome', amount: -10 }],
  },
  {
    name: { 'en-US': 'Renji Oda', 'jp-FI': '織田 蓮司' },
    rarity: 'uncommon',
    type: 'sp',
    wage: 5,
    rank: 'junior',
    spGeneration: 2,
    epGeneration: 1,
    rpGeneration: 0,
  },
  {
    name: { 'en-US': 'Marina Kobayashi', 'jp-FI': '小林 マリナ' },
    rarity: 'uncommon',
    type: 'sp',
    wage: 7,
    rank: 'medior',
    spGeneration: 3,
    epGeneration: 0,
    rpGeneration: 1,
  },
  {
    name: { 'en-US': 'Nathaniel Cole', 'jp-FI': 'ナサニエル・コール' },
    rarity: 'uncommon',
    type: 'sp',
    wage: 12,
    rank: 'senior',
    spGeneration: 4,
    epGeneration: 2,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'trust', amount: 10 }],
  },
  {
    name: { 'en-US': 'Yuki Saito', 'jp-FI': '斉藤 優希' },
    rarity: 'uncommon',
    type: 'sp',
    wage: 17,
    rank: 'lead',
    spGeneration: 3,
    epGeneration: 2,
    rpGeneration: 2,
    specialEffect: [{ paramEffected: 'up', amount: 3 }],
  },

  // RARE (1 per rank)
  {
    name: { 'en-US': 'Isolde Becker', 'jp-FI': 'イゾルデ・ベッカー' },
    rarity: 'rare',
    type: 'sp',
    wage: 7,
    rank: 'volunteer',
    spGeneration: 4,
    epGeneration: 0,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'sp', amount: -20 }],
  },
  {
    name: { 'en-US': 'Hiroshi Sakamoto', 'jp-FI': '坂本 博' },
    rarity: 'rare',
    type: 'sp',
    wage: 10,
    rank: 'junior',
    spGeneration: 3,
    epGeneration: 1,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'publicUnity', amount: 1 }],
  },
  {
    name: { 'en-US': 'Sophia Mendez', 'jp-FI': 'ソフィア・メンデス' },
    rarity: 'rare',
    type: 'sp',
    wage: 14,
    rank: 'medior',
    spGeneration: 4,
    epGeneration: 1,
    rpGeneration: 1,
    specialEffect: [{ paramEffected: 'asiOutcome', amount: 10 }],
  },
  {
    name: { 'en-US': 'Victor Dupont', 'jp-FI': 'ヴィクター・デュポン' },
    rarity: 'rare',
    type: 'sp',
    wage: 18,
    rank: 'senior',
    spGeneration: 5,
    epGeneration: 0,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'influence', amount: 15 }],
  },
  {
    name: { 'en-US': 'Alessandro Ferreti', 'jp-FI': 'アレッサンドロ・フェレッティ' },
    rarity: 'rare',
    type: 'sp',
    wage: 25,
    rank: 'lead',
    spGeneration: 4,
    epGeneration: 0,
    rpGeneration: 2,
    specialEffect: [{ paramEffected: 'sp', amount: 40 }],
  },

  // EPIC (3 total)
  {
    name: { 'en-US': 'Sophia Russo', 'jp-FI': 'ソフィア・ルッソ' },
    rarity: 'epic',
    type: 'sp',
    wage: 30,
    rank: 'medior',
    spGeneration: 6,
    epGeneration: 3,
    rpGeneration: 0,
    specialEffect: [
      { paramEffected: 'influence', amount: 15 },
      { paramEffected: 'trust', amount: 15 },
    ],
  },
  {
    name: { 'en-US': 'Leonard Strauss', 'jp-FI': 'レオナルド・ストラウス' },
    rarity: 'epic',
    type: 'sp',
    wage: 40,
    rank: 'senior',
    spGeneration: 10,
    epGeneration: 5,
    rpGeneration: 5,
    specialEffect: [{ paramEffected: 'publicUnity', amount: -2 }],
  },
  {
    name: { 'en-US': 'Veronika Ivanova', 'jp-FI': 'ベロニカ・イヴァノヴァ' },
    rarity: 'epic',
    type: 'sp',
    wage: 50,
    rank: 'lead',
    spGeneration: 10,
    epGeneration: 0,
    rpGeneration: 4,
    specialEffect: [
      { paramEffected: 'humanSelection', amount: 100 },
      { paramEffected: 'humanSelection', amount: 100 },
    ],
  },
]

export const epHumans: Human[] = [
  // === EP-FOCUSED CHARACTERS (24 Total) ===
  // COMMON (3 volunteer/junior, 2 medior, 1 senior/lead)
  {
    name: { 'en-US': 'Maya Sharma', 'jp-FI': 'マヤ・シャルマ' },
    rarity: 'common',
    type: 'ep',
    wage: 1,
    rank: 'volunteer',
    spGeneration: 0,
    epGeneration: 1,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'trust', amount: -5 }],
  },
  {
    name: { 'en-US': 'Takashi Miyazaki', 'jp-FI': '宮崎 隆' },
    rarity: 'common',
    type: 'ep',
    wage: 1,
    rank: 'volunteer',
    spGeneration: 0,
    epGeneration: 1,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'up', amount: -3 }],
  },
  {
    name: { 'en-US': 'Lucille Fontaine', 'jp-FI': 'ルシール・フォンテーヌ' },
    rarity: 'common',
    type: 'ep',
    wage: 0,
    rank: 'volunteer',
    spGeneration: 0,
    epGeneration: 1,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'ep', amount: -10 }],
  },
  {
    name: { 'en-US': 'Jordan Lee', 'jp-FI': 'ジョーダン・リー' },
    rarity: 'common',
    type: 'ep',
    wage: 3,
    rank: 'junior',
    spGeneration: 0,
    epGeneration: 2,
    rpGeneration: 0,
  },
  {
    name: { 'en-US': 'Aria Sinclair', 'jp-FI': 'アリア・シンクレア' },
    rarity: 'common',
    type: 'ep',
    wage: 3,
    rank: 'junior',
    spGeneration: 0,
    epGeneration: 2,
    rpGeneration: 0,
  },
  {
    name: { 'en-US': 'Felix Grant', 'jp-FI': 'フェリックス・グラント' },
    rarity: 'common',
    type: 'ep',
    wage: 4,
    rank: 'junior',
    spGeneration: 0,
    epGeneration: 1,
    rpGeneration: 1,
  },
  {
    name: { 'en-US': 'Takumi Endo', 'jp-FI': '遠藤 拓海' },
    rarity: 'common',
    type: 'ep',
    wage: 6,
    rank: 'medior',
    spGeneration: 0,
    epGeneration: 3,
    rpGeneration: 0,
  },
  {
    name: { 'en-US': 'Elliot Weiss', 'jp-FI': 'エリオット・ワイス' },
    rarity: 'common',
    type: 'ep',
    wage: 8,
    rank: 'medior',
    spGeneration: 0,
    epGeneration: 4,
    rpGeneration: 0,
  },
  {
    name: { 'en-US': 'Samantha Brooks', 'jp-FI': 'サマンサ・ブルックス' },
    rarity: 'common',
    type: 'ep',
    wage: 10,
    rank: 'senior',
    spGeneration: 0,
    epGeneration: 4,
    rpGeneration: 0,
  },
  {
    name: { 'en-US': 'Mateo Diaz', 'jp-FI': 'マテオ・ディアス' },
    rarity: 'common',
    type: 'ep',
    wage: 15,
    rank: 'lead',
    spGeneration: 0,
    epGeneration: 5,
    rpGeneration: 0,
  },

  // UNCOMMON (1 per rank)
  {
    name: { 'en-US': 'Gabriel Costa', 'jp-FI': 'ガブリエル・コスタ' },
    rarity: 'uncommon',
    type: 'ep',
    wage: 3,
    rank: 'volunteer',
    spGeneration: 0,
    epGeneration: 2,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'trust', amount: -5 }],
  },
  {
    name: { 'en-US': 'Marcus Lee', 'jp-FI': 'マーカス・リー' },
    rarity: 'uncommon',
    type: 'ep',
    wage: 5,
    rank: 'junior',
    spGeneration: 0,
    epGeneration: 3,
    rpGeneration: 0,
  },
  {
    name: { 'en-US': 'Naoko Fujiwara', 'jp-FI': '藤原 直子' },
    rarity: 'uncommon',
    type: 'ep',
    wage: 7,
    rank: 'medior',
    spGeneration: 1,
    epGeneration: 3,
    rpGeneration: 1,
  },
  {
    name: { 'en-US': 'Jorge Valdez', 'jp-FI': 'ホルヘ・バルデス' },
    rarity: 'uncommon',
    type: 'ep',
    wage: 11,
    rank: 'senior',
    spGeneration: 1,
    epGeneration: 4,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'trust', amount: 15 }],
  },
  {
    name: { 'en-US': 'Katherine Holt', 'jp-FI': 'キャサリン・ホルト' },
    rarity: 'uncommon',
    type: 'ep',
    wage: 17,
    rank: 'lead',
    spGeneration: 0,
    epGeneration: 5,
    rpGeneration: 2,
    specialEffect: [{ paramEffected: 'ep', amount: 40 }],
  },

  // RARE (1 per rank)
  {
    name: { 'en-US': 'Zahra Farouk', 'jp-FI': 'ザフラ・ファルーク' },
    rarity: 'rare',
    type: 'ep',
    wage: 3,
    rank: 'volunteer',
    spGeneration: 1,
    epGeneration: 4,
    rpGeneration: 1,
    specialEffect: [{ paramEffected: 'asiOutcome', amount: -20 }],
  },
  {
    name: { 'en-US': 'Louis Tremblay', 'jp-FI': 'ルイ・トランブレ' },
    rarity: 'rare',
    type: 'ep',
    wage: 8,
    rank: 'junior',
    spGeneration: 1,
    epGeneration: 4,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'asiOutcome', amount: 10 }],
  },
  {
    name: { 'en-US': 'Priya Mehta', 'jp-FI': 'プリヤ・メータ' },
    rarity: 'rare',
    type: 'ep',
    wage: 14,
    rank: 'medior',
    spGeneration: 1,
    epGeneration: 6,
    rpGeneration: 1,
  },
  {
    name: { 'en-US': 'Wei Lin', 'jp-FI': 'ウェイ・リン' },
    rarity: 'rare',
    type: 'ep',
    wage: 18,
    rank: 'senior',
    spGeneration: 0,
    epGeneration: 5,
    rpGeneration: 0,
    specialEffect: [{ paramEffected: 'influence', amount: 15 }],
  },
  {
    name: { 'en-US': 'Anastasia Petrov', 'jp-FI': 'アナスタシア・ペトロフ' },
    rarity: 'rare',
    type: 'ep',
    wage: 25,
    rank: 'lead',
    spGeneration: 2,
    epGeneration: 5,
    rpGeneration: 2,
    specialEffect: [{ paramEffected: 'trust', amount: 20 }],
  },

  // EPIC (3 total)
  {
    name: { 'en-US': 'Ibrahim Ahmed', 'jp-FI': 'イブラヒム・アフメド' },
    rarity: 'epic',
    type: 'ep',
    wage: 30,
    rank: 'medior',
    spGeneration: 0,
    epGeneration: 5,
    rpGeneration: 2,
    specialEffect: [
      { paramEffected: 'ep', amount: 60 },
      { paramEffected: 'publicUnity', amount: -2 },
    ],
  },
  {
    name: { 'en-US': 'Heinrich Mueller', 'jp-FI': 'ハインリヒ・ミュラー' },
    rarity: 'epic',
    type: 'ep',
    wage: 40,
    rank: 'senior',
    spGeneration: 4,
    epGeneration: 12,
    rpGeneration: 4,
    specialEffect: [{ paramEffected: 'trust', amount: -35 }],
  },
  {
    name: { 'en-US': 'Nadia Petrova', 'jp-FI': 'ナディア・ペトロワ' },
    rarity: 'epic',
    type: 'ep',
    wage: 50,
    rank: 'lead',
    spGeneration: 2,
    epGeneration: 5,
    rpGeneration: 2,
    specialEffect: [{ paramEffected: 'publicUnity', amount: 3 }],
  },
]

export const rpHumans: Human[] = [
  // === RP-FOCUSED CHARACTERS (24 Total) ===
  // COMMON (3 volunteer/junior, 2 medior, 1 senior/lead)
  {
    name: { 'en-US': 'Isabella Montoya', 'jp-FI': 'イザベラ・モントヤ' },
    rarity: 'common',
    type: 'rp',
    wage: 2,
    rank: 'volunteer',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 1,
  },
  {
    name: { 'en-US': 'Arjun Singh', 'jp-FI': 'アルジュン・シン' },
    rarity: 'common',
    type: 'rp',
    wage: 0,
    rank: 'volunteer',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 2,
    specialEffect: [{ paramEffected: 'publicUnity', amount: -1 }],
  },
  {
    name: { 'en-US': 'Mia Patel', 'jp-FI': 'ミア・パテル' },
    rarity: 'common',
    type: 'rp',
    wage: 1,
    rank: 'volunteer',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 1,
    specialEffect: [{ paramEffected: 'trust', amount: -6 }],
  },
  {
    name: { 'en-US': 'Kenji Nakamura', 'jp-FI': '中村 健二' },
    rarity: 'common',
    type: 'rp',
    wage: 3,
    rank: 'junior',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 2,
  },
  {
    name: { 'en-US': 'Haruka Aizawa', 'jp-FI': '相沢 春香' },
    rarity: 'common',
    type: 'rp',
    wage: 3,
    rank: 'junior',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 2,
  },
  {
    name: { 'en-US': 'Nathaniel Blackwell', 'jp-FI': 'ナサニエル・ブラックウェル' },
    rarity: 'common',
    type: 'rp',
    wage: 4,
    rank: 'junior',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 2,
  },
  {
    name: { 'en-US': 'Lucia Moreno', 'jp-FI': 'ルシア・モレノ' },
    rarity: 'common',
    type: 'rp',
    wage: 6,
    rank: 'medior',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 3,
  },
  {
    name: { 'en-US': 'Oscar Rodriguez', 'jp-FI': 'オスカー・ロドリゲス' },
    rarity: 'common',
    type: 'rp',
    wage: 8,
    rank: 'medior',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 3,
  },
  {
    name: { 'en-US': 'Daisuke Tanaka', 'jp-FI': '田中 大輔' },
    rarity: 'common',
    type: 'rp',
    wage: 10,
    rank: 'senior',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 4,
  },
  {
    name: { 'en-US': 'Daniel Carter', 'jp-FI': 'ダニエル・カーター' },
    rarity: 'common',
    type: 'rp',
    wage: 15,
    rank: 'lead',
    spGeneration: 1,
    epGeneration: 0,
    rpGeneration: 3,
  },

  // UNCOMMON (1 per rank, including a Volunteer)
  {
    name: { 'en-US': 'Theodore Vasquez', 'jp-FI': 'テオテオ・バスケス' },
    rarity: 'uncommon',
    type: 'rp',
    wage: 3,
    rank: 'volunteer',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 2,
    specialEffect: [{ paramEffected: 'influence', amount: -3 }],
  },
  {
    name: { 'en-US': 'Amara Okafor', 'jp-FI': 'アマラ・オカフォー' },
    rarity: 'uncommon',
    type: 'rp',
    wage: 3,
    rank: 'volunteer',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 2,
    specialEffect: [{ paramEffected: 'trust', amount: -6 }],
  },
  {
    name: { 'en-US': 'Mirai Yoshida', 'jp-FI': '吉田 未来' },
    rarity: 'uncommon',
    type: 'rp',
    wage: 5,
    rank: 'junior',
    spGeneration: 0,
    epGeneration: 1,
    rpGeneration: 2,
  },
  {
    name: { 'en-US': 'Adrian Novak', 'jp-FI': 'エイドリアン・ノヴァク' },
    rarity: 'uncommon',
    type: 'rp',
    wage: 7,
    rank: 'medior',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 3,
  },
  {
    name: { 'en-US': 'Camille Durand', 'jp-FI': 'カミーユ・デュラン' },
    rarity: 'uncommon',
    type: 'rp',
    wage: 11,
    rank: 'senior',
    spGeneration: 1,
    epGeneration: 0,
    rpGeneration: 4,
  },
  {
    name: { 'en-US': 'Hassan Farouk', 'jp-FI': 'ハッサン・ファルーク' },
    rarity: 'uncommon',
    type: 'rp',
    wage: 17,
    rank: 'lead',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 4,
    specialEffect: [{ paramEffected: 'trust', amount: 5 }],
  },

  // RARE (1 per rank, can be any rank)
  {
    name: { 'en-US': 'Victor Alave', 'jp-FI': 'ヴィクター・アラブゥー' },
    rarity: 'rare',
    type: 'rp',
    wage: 4,
    rank: 'volunteer',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 3,
  },
  {
    name: { 'en-US': 'Fatima Al-Zahrani', 'jp-FI': 'ファティマ・アルザハラニ' },
    rarity: 'rare',
    type: 'rp',
    wage: 6,
    rank: 'junior',
    spGeneration: 0,
    epGeneration: 1,
    rpGeneration: 4,
  },
  {
    name: { 'en-US': 'Rafael Costa', 'jp-FI': 'ラファエル・コスタ' },
    rarity: 'rare',
    type: 'rp',
    wage: 11,
    rank: 'medior',
    spGeneration: 0,
    epGeneration: 2,
    rpGeneration: 4,
    specialEffect: [{ paramEffected: 'rp', amount: 20 }],
  },
  {
    name: { 'en-US': 'Anika Mehta', 'jp-FI': 'アニカ・メータ' },
    rarity: 'rare',
    type: 'rp',
    wage: 22,
    rank: 'senior',
    spGeneration: 1,
    epGeneration: 0,
    rpGeneration: 5,
    specialEffect: [{ paramEffected: 'publicUnity', amount: 2 }],
  },
  {
    name: { 'en-US': 'Stefan Kozlov', 'jp-FI': 'ステファン・コズロフ' },
    rarity: 'rare',
    type: 'rp',
    wage: 32,
    rank: 'lead',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 5,
    specialEffect: [{ paramEffected: 'asiOutcome', amount: 16 }],
  },

  // EPIC (Can be any rank)
  {
    name: { 'en-US': 'Sven Johansson', 'jp-FI': 'スヴェン・ヨハンソン' },
    rarity: 'epic',
    type: 'rp',
    wage: 20,
    rank: 'junior',
    spGeneration: 1,
    epGeneration: 1,
    rpGeneration: 8,
    specialEffect: [{ paramEffected: 'up', amount: 10 }],
  },
  {
    name: { 'en-US': 'Layla Al-Farsi', 'jp-FI': 'ライラ・アルファルシ' },
    rarity: 'epic',
    type: 'rp',
    wage: 40,
    rank: 'senior',
    spGeneration: 2,
    epGeneration: 0,
    rpGeneration: 6,
    specialEffect: [{ paramEffected: 'publicUnity', amount: 3 }],
  },
  {
    name: { 'en-US': 'Maximilian Zhang', 'jp-FI': 'マクシミリアン・チャン' },
    rarity: 'epic',
    type: 'rp',
    wage: 50,
    rank: 'lead',
    spGeneration: 0,
    epGeneration: 0,
    rpGeneration: 12,
    specialEffect: [
      { paramEffected: 'breakthroughSelection', amount: 100 },
      { paramEffected: 'breakthroughSelection', amount: 100 },
    ],
  },
]

export const humans: Human[] = spHumans.concat(epHumans, rpHumans)
