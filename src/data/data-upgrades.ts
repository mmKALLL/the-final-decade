import { Upgrade } from '../types'

export const upgrades: Upgrade[] = [
  {
    name: { 'en-US': 'Upgrade 1', 'jp-FI': 'アップグレード1' },
    description: { 'en-US': 'desc', 'jp-FI': 'desc' },
    rarity: 'common',
    level: 0,
    maxLevel: 1,
    effect: [{ paramEffected: 'rp', amount: 10 }],
  },
]
