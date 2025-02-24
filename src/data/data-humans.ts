import { Human } from "../types";

export const spHumans: Human[] = [
  // === SP-FOCUSED CHARACTERS (24 Total) ===
  // COMMON (2 per rank)
  { name: { 'en-US': "Logan Reeves", 'jp-FI': "ローガン・リーブス" }, rarity: "common", wage: 1, rank: "volunteer", spGeneration: 1, epGeneration: 0, rpGeneration: 0, specialEffect: [{ paramEffected: "trust", amount: -1 }] },
  { name: { 'en-US': "Nozomi Fujikawa", 'jp-FI': "藤川 希" }, rarity: "common", wage: 2, rank: "volunteer", spGeneration: 1, epGeneration: 0, rpGeneration: 0, specialEffect: [{ paramEffected: "alignmentFocus", amount: -1 }] },
  { name: { 'en-US': "Aoi Takahashi", 'jp-FI': "高橋 葵" }, rarity: "common", wage: 3, rank: "junior", spGeneration: 2, epGeneration: 0, rpGeneration: 0 },
  { name: { 'en-US': "Elena Duarte", 'jp-FI': "エレナ・ドゥアルテ" }, rarity: "common", wage: 4, rank: "junior", spGeneration: 2, epGeneration: 0, rpGeneration: 0 },
  { name: { 'en-US': "Haruto Ishii", 'jp-FI': "石井 陽翔" }, rarity: "common", wage: 6, rank: "medior", spGeneration: 3, epGeneration: 0, rpGeneration: 0 },
  { name: { 'en-US': "Isaac Romero", 'jp-FI': "アイザック・ロメロ" }, rarity: "common", wage: 8, rank: "medior", spGeneration: 3, epGeneration: 0, rpGeneration: 0 },
  { name: { 'en-US': "Daisuke Tanaka", 'jp-FI': "田中 大輔" }, rarity: "common", wage: 10, rank: "senior", spGeneration: 4, epGeneration: 0, rpGeneration: 0 },
  { name: { 'en-US': "Hana Okada", 'jp-FI': "岡田 華" }, rarity: "common", wage: 12, rank: "senior", spGeneration: 4, epGeneration: 0, rpGeneration: 0 },
  { name: { 'en-US': "Sebastian Klein", 'jp-FI': "セバスチャン・クライン" }, rarity: "common", wage: 15, rank: "lead", spGeneration: 3, epGeneration: 0, rpGeneration: 1 },
  { name: { 'en-US': "Lucia Moreno", 'jp-FI': "ルシア・モレノ" }, rarity: "common", wage: 20, rank: "lead", spGeneration: 3, epGeneration: 0, rpGeneration: 1 },

  // UNCOMMON (1 per rank)
  { name: { 'en-US': "Elio Marchesi", 'jp-FI': "エリオ・マルケージ" }, rarity: "uncommon", wage: 3, rank: "volunteer", spGeneration: 2, epGeneration: 0, rpGeneration: 0, specialEffect: [{ paramEffected: "alignmentFocus", amount: 1 }] },
  { name: { 'en-US': "Renji Oda", 'jp-FI': "織田 蓮司" }, rarity: "uncommon", wage: 5, rank: "junior", spGeneration: 2, epGeneration: 1, rpGeneration: 0 },
  { name: { 'en-US': "Marina Kobayashi", 'jp-FI': "小林 マリナ" }, rarity: "uncommon", wage: 7, rank: "medior", spGeneration: 3, epGeneration: 0, rpGeneration: 1 },
  { name: { 'en-US': "Nathaniel Cole", 'jp-FI': "ナサニエル・コール" }, rarity: "uncommon", wage: 11, rank: "senior", spGeneration: 4, epGeneration: 1, rpGeneration: 0, specialEffect: [{ paramEffected: "trust", amount: 1 }] },
  { name: { 'en-US': "Yuki Saito", 'jp-FI': "斉藤 優希" }, rarity: "uncommon", wage: 17, rank: "lead", spGeneration: 3, epGeneration: 0, rpGeneration: 2, specialEffect: [{ paramEffected: "sp", amount: 1 }] },

  // RARE (1 per rank)
  { name: { 'en-US': "Isolde Becker", 'jp-FI': "イゾルデ・ベッカー" }, rarity: "rare", wage: 7, rank: "volunteer", spGeneration: 3, epGeneration: 1, rpGeneration: 0, specialEffect: [{ paramEffected: "sp", amount: 1 }, { paramEffected: "trust", amount: -1 }] },
  { name: { 'en-US': "Hiroshi Sakamoto", 'jp-FI': "坂本 博" }, rarity: "rare", wage: 10, rank: "junior", spGeneration: 3, epGeneration: 1, rpGeneration: 0 },
  { name: { 'en-US': "Celeste Dupont", 'jp-FI': "セレステ・デュポン" }, rarity: "rare", wage: 14, rank: "medior", spGeneration: 4, epGeneration: 0, rpGeneration: 1 },
  { name: { 'en-US': "Victor Dupont", 'jp-FI': "ヴィクター・デュポン" }, rarity: "rare", wage: 18, rank: "senior", spGeneration: 5, epGeneration: 0, rpGeneration: 0, specialEffect: [{ paramEffected: "sp", amount: 2 }] },
  { name: { 'en-US': "Alessandro Ferreti", 'jp-FI': "アレッサンドロ・フェレッティ" }, rarity: "rare", wage: 25, rank: "lead", spGeneration: 4, epGeneration: 0, rpGeneration: 2, specialEffect: [{ paramEffected: "trust", amount: -1 }] },

  // EPIC (3 total)
  { name: { 'en-US': "Sophia Russo", 'jp-FI': "ソフィア・ルッソ" }, rarity: "epic", wage: 30, rank: "lead", spGeneration: 4, epGeneration: 0, rpGeneration: 3, specialEffect: [{ paramEffected: "sp", amount: 3 }, { paramEffected: "trust", amount: -2 }] },
  { name: { 'en-US': "Leonard Strauss", 'jp-FI': "レオナルド・ストラウス" }, rarity: "epic", wage: 40, rank: "lead", spGeneration: 3, epGeneration: 1, rpGeneration: 3, specialEffect: [{ paramEffected: "alignmentFocus", amount: -2 }] },
  { name: { 'en-US': "Veronika Ivanova", 'jp-FI': "ベロニカ・イヴァノヴァ" }, rarity: "epic", wage: 50, rank: "lead", spGeneration: 5, epGeneration: 0, rpGeneration: 4, specialEffect: [{ paramEffected: "sp", amount: 2 }, { paramEffected: "rp", amount: -1 }] },
]

export const epHumans: Human[] = [
  // === EP-FOCUSED CHARACTERS (24 Total) ===
  // COMMON (2 per rank)
  { name: { 'en-US': "Mia Patel", 'jp-FI': "ミア・パテル" }, rarity: "common", wage: 1, rank: "volunteer", spGeneration: 0, epGeneration: 1, rpGeneration: 0, specialEffect: [{ paramEffected: "trust", amount: -1 }] },
  { name: { 'en-US': "Kenji Nakamura", 'jp-FI': "中村 健二" }, rarity: "common", wage: 2, rank: "volunteer", spGeneration: 0, epGeneration: 1, rpGeneration: 0, specialEffect: [{ paramEffected: "alignmentFocus", amount: -1 }] },
  { name: { 'en-US': "Aria Sinclair", 'jp-FI': "アリア・シンクレア" }, rarity: "common", wage: 3, rank: "junior", spGeneration: 0, epGeneration: 2, rpGeneration: 0 },
  { name: { 'en-US': "Felix Grant", 'jp-FI': "フェリックス・グラント" }, rarity: "common", wage: 4, rank: "junior", spGeneration: 0, epGeneration: 2, rpGeneration: 0 },
  { name: { 'en-US': "Takumi Endo", 'jp-FI': "遠藤 拓海" }, rarity: "common", wage: 6, rank: "medior", spGeneration: 0, epGeneration: 3, rpGeneration: 0 },
  { name: { 'en-US': "Elliot Weiss", 'jp-FI': "エリオット・ワイス" }, rarity: "common", wage: 8, rank: "medior", spGeneration: 0, epGeneration: 3, rpGeneration: 0 },
  { name: { 'en-US': "Samantha Brooks", 'jp-FI': "サマンサ・ブルックス" }, rarity: "common", wage: 10, rank: "senior", spGeneration: 0, epGeneration: 4, rpGeneration: 0 },
  { name: { 'en-US': "Haruka Aizawa", 'jp-FI': "相沢 春香" }, rarity: "common", wage: 12, rank: "senior", spGeneration: 0, epGeneration: 4, rpGeneration: 0 },
  { name: { 'en-US': "Daniel Carter", 'jp-FI': "ダニエル・カーター" }, rarity: "common", wage: 15, rank: "lead", spGeneration: 1, epGeneration: 3, rpGeneration: 0 },
  { name: { 'en-US': "Lucille Fontaine", 'jp-FI': "ルシール・フォンテーヌ" }, rarity: "common", wage: 20, rank: "lead", spGeneration: 1, epGeneration: 3, rpGeneration: 0 },

  // UNCOMMON (1 per rank)
  { name: { 'en-US': "Gabriel Costa", 'jp-FI': "ガブリエル・コスタ" }, rarity: "uncommon", wage: 3, rank: "volunteer", spGeneration: 0, epGeneration: 2, rpGeneration: 0, specialEffect: [{ paramEffected: "trust", amount: 1 }] },
  { name: { 'en-US': "Marcus Lee", 'jp-FI': "マーカス・リー" }, rarity: "uncommon", wage: 5, rank: "junior", spGeneration: 1, epGeneration: 2, rpGeneration: 0 },
  { name: { 'en-US': "Naoko Fujiwara", 'jp-FI': "藤原 直子" }, rarity: "uncommon", wage: 7, rank: "medior", spGeneration: 0, epGeneration: 3, rpGeneration: 1 },
  { name: { 'en-US': "Jorge Valdez", 'jp-FI': "ホルヘ・バルデス" }, rarity: "uncommon", wage: 11, rank: "senior", spGeneration: 1, epGeneration: 4, rpGeneration: 0, specialEffect: [{ paramEffected: "trust", amount: 1 }] },
  { name: { 'en-US': "Katherine Holt", 'jp-FI': "キャサリン・ホルト" }, rarity: "uncommon", wage: 17, rank: "lead", spGeneration: 0, epGeneration: 3, rpGeneration: 2, specialEffect: [{ paramEffected: "ep", amount: 1 }] },

  // RARE (1 per rank)
  { name: { 'en-US': "Zahra Farouk", 'jp-FI': "ザフラ・ファルーク" }, rarity: "rare", wage: 6, rank: "volunteer", spGeneration: 0, epGeneration: 3, rpGeneration: 1, specialEffect: [{ paramEffected: "alignmentFocus", amount: 2 }] },
  { name: { 'en-US': "Louis Tremblay", 'jp-FI': "ルイ・トランブレ" }, rarity: "rare", wage: 10, rank: "junior", spGeneration: 1, epGeneration: 3, rpGeneration: 0 },
  { name: { 'en-US': "Celeste Dupont", 'jp-FI': "セレステ・デュポン" }, rarity: "rare", wage: 14, rank: "medior", spGeneration: 0, epGeneration: 4, rpGeneration: 1 },
  { name: { 'en-US': "Victor Chang", 'jp-FI': "ヴィクター・チャン" }, rarity: "rare", wage: 18, rank: "senior", spGeneration: 0, epGeneration: 5, rpGeneration: 0, specialEffect: [{ paramEffected: "ep", amount: 2 }] },
  { name: { 'en-US': "Anastasia Petrov", 'jp-FI': "アナスタシア・ペトロフ" }, rarity: "rare", wage: 25, rank: "lead", spGeneration: 0, epGeneration: 4, rpGeneration: 2, specialEffect: [{ paramEffected: "trust", amount: -1 }] },

  // EPIC (3 total)
  { name: { 'en-US': "Ethan Carter", 'jp-FI': "イーサン・カーター" }, rarity: "epic", wage: 30, rank: "lead", spGeneration: 0, epGeneration: 5, rpGeneration: 3, specialEffect: [{ paramEffected: "ep", amount: 3 }, { paramEffected: "alignmentFocus", amount: -2 }] },
  { name: { 'en-US': "Leonard Strauss", 'jp-FI': "レオナルド・ストラウス" }, rarity: "epic", wage: 40, rank: "lead", spGeneration: 1, epGeneration: 4, rpGeneration: 3, specialEffect: [{ paramEffected: "trust", amount: -2 }] },
  { name: { 'en-US': "Veronika Ivanova", 'jp-FI': "ベロニカ・イヴァノヴァ" }, rarity: "epic", wage: 50, rank: "lead", spGeneration: 2, epGeneration: 5, rpGeneration: 4, specialEffect: [{ paramEffected: "ep", amount: 2 }, { paramEffected: "rp", amount: -1 }] },
]

export const rpHumans: Human[] = [
  // === RP-FOCUSED CHARACTERS (24 Total) ===
  // COMMON (2 per rank)
  { name: { 'en-US': "Isabella Montoya", 'jp-FI': "イザベラ・モントヤ" }, rarity: "common", wage: 1, rank: "volunteer", spGeneration: 0, epGeneration: 0, rpGeneration: 1, specialEffect: [{ paramEffected: "trust", amount: -1 }] },
  { name: { 'en-US': "Renji Oda", 'jp-FI': "織田 蓮司" }, rarity: "common", wage: 2, rank: "volunteer", spGeneration: 0, epGeneration: 0, rpGeneration: 1, specialEffect: [{ paramEffected: "alignmentFocus", amount: -1 }] },
  { name: { 'en-US': "Haruka Aizawa", 'jp-FI': "相沢 春香" }, rarity: "common", wage: 3, rank: "junior", spGeneration: 0, epGeneration: 0, rpGeneration: 2 },
  { name: { 'en-US': "Nathaniel Blackwell", 'jp-FI': "ナサニエル・ブラックウェル" }, rarity: "common", wage: 4, rank: "junior", spGeneration: 0, epGeneration: 0, rpGeneration: 2 },
  { name: { 'en-US': "Lucia Moreno", 'jp-FI': "ルシア・モレノ" }, rarity: "common", wage: 6, rank: "medior", spGeneration: 0, epGeneration: 0, rpGeneration: 3 },
  { name: { 'en-US': "Victor Hernández", 'jp-FI': "ビクター・エルナンデス" }, rarity: "common", wage: 8, rank: "medior", spGeneration: 0, epGeneration: 0, rpGeneration: 3 },
  { name: { 'en-US': "Daisuke Tanaka", 'jp-FI': "田中 大輔" }, rarity: "common", wage: 10, rank: "senior", spGeneration: 0, epGeneration: 0, rpGeneration: 4 },
  { name: { 'en-US': "Sophie Lemoine", 'jp-FI': "ソフィ・ルモワーヌ" }, rarity: "common", wage: 12, rank: "senior", spGeneration: 0, epGeneration: 0, rpGeneration: 4 },
  { name: { 'en-US': "Daniel Carter", 'jp-FI': "ダニエル・カーター" }, rarity: "common", wage: 15, rank: "lead", spGeneration: 1, epGeneration: 0, rpGeneration: 3 },
  { name: { 'en-US': "Kiyomi Saito", 'jp-FI': "斉藤 清美" }, rarity: "common", wage: 20, rank: "lead", spGeneration: 1, epGeneration: 0, rpGeneration: 3 },

  // UNCOMMON (1 per rank, including a Volunteer)
  { name: { 'en-US': "Theodore Vasquez", 'jp-FI': "テオテオ・バスケス" }, rarity: "uncommon", wage: 3, rank: "volunteer", spGeneration: 1, epGeneration: 0, rpGeneration: 2, specialEffect: [{ paramEffected: "alignmentFocus", amount: 1 }] },
  { name: { 'en-US': "Theo Vasquez", 'jp-FI': "テオ・バスケス" }, rarity: "uncommon", wage: 3, rank: "volunteer", spGeneration: 1, epGeneration: 0, rpGeneration: 2, specialEffect: [{ paramEffected: "alignmentFocus", amount: 1 }] },
  { name: { 'en-US': "Mirai Yoshida", 'jp-FI': "吉田 未来" }, rarity: "uncommon", wage: 5, rank: "junior", spGeneration: 0, epGeneration: 1, rpGeneration: 2 },
  { name: { 'en-US': "Adrian Novak", 'jp-FI': "エイドリアン・ノヴァク" }, rarity: "uncommon", wage: 7, rank: "medior", spGeneration: 0, epGeneration: 0, rpGeneration: 3 },
  { name: { 'en-US': "Camille Durand", 'jp-FI': "カミーユ・デュラン" }, rarity: "uncommon", wage: 11, rank: "senior", spGeneration: 1, epGeneration: 0, rpGeneration: 4, specialEffect: [{ paramEffected: "rp", amount: 1 }] },
  { name: { 'en-US': "Hassan Farouk", 'jp-FI': "ハッサン・ファルーク" }, rarity: "uncommon", wage: 17, rank: "lead", spGeneration: 0, epGeneration: 0, rpGeneration: 4, specialEffect: [{ paramEffected: "trust", amount: 1 }] },

  // RARE (1 per rank, can be any rank)
  { name: { 'en-US': "Victor Alave", 'jp-FI': "ヴィクター・アラブゥー" }, rarity: "rare", wage: 8, rank: "volunteer", spGeneration: 0, epGeneration: 1, rpGeneration: 3, specialEffect: [{ paramEffected: "rp", amount: 1 }] },
  { name: { 'en-US': "Victor Moreau", 'jp-FI': "ヴィクター・モロー" }, rarity: "rare", wage: 8, rank: "volunteer", spGeneration: 0, epGeneration: 1, rpGeneration: 3, specialEffect: [{ paramEffected: "rp", amount: 1 }] },
  { name: { 'en-US': "Celeste Dupont", 'jp-FI': "セレステ・デュポン" }, rarity: "rare", wage: 12, rank: "junior", spGeneration: 0, epGeneration: 0, rpGeneration: 4 },
  { name: { 'en-US': "Rafael Costa", 'jp-FI': "ラファエル・コスタ" }, rarity: "rare", wage: 16, rank: "medior", spGeneration: 0, epGeneration: 1, rpGeneration: 4 },
  { name: { 'en-US': "Anika Mehta", 'jp-FI': "アニカ・メータ" }, rarity: "rare", wage: 22, rank: "senior", spGeneration: 1, epGeneration: 0, rpGeneration: 5, specialEffect: [{ paramEffected: "alignmentFocus", amount: 2 }] },
  { name: { 'en-US': "Stefan Kozlov", 'jp-FI': "ステファン・コズロフ" }, rarity: "rare", wage: 30, rank: "lead", spGeneration: 0, epGeneration: 0, rpGeneration: 5, specialEffect: [{ paramEffected: "rp", amount: 2 }] },

  // EPIC (Can be any rank)
  { name: { 'en-US': "Leonard Strauss", 'jp-FI': "レオナルド・ストラウス" }, rarity: "epic", wage: 25, rank: "junior", spGeneration: 1, epGeneration: 0, rpGeneration: 5, specialEffect: [{ paramEffected: "trust", amount: -2 }] },
  { name: { 'en-US': "Veronika Ivanova", 'jp-FI': "ベロニカ・イヴァノヴァ" }, rarity: "epic", wage: 40, rank: "senior", spGeneration: 2, epGeneration: 0, rpGeneration: 6, specialEffect: [{ paramEffected: "alignmentFocus", amount: 3 }] },
  { name: { 'en-US': "Maximilian Zhang", 'jp-FI': "マクシミリアン・チャン" }, rarity: "epic", wage: 50, rank: "lead", spGeneration: 1, epGeneration: 0, rpGeneration: 7, specialEffect: [{ paramEffected: "rp", amount: 3 }, { paramEffected: "trust", amount: -3 }] },
]

export const humans: Human[] = spHumans.concat(epHumans, rpHumans)
