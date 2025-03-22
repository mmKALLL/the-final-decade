import { Breakthrough } from '../types'

export const breakthroughs: Breakthrough[] = [
  {
    name: { 'en-US': 'Breakthrough 1', 'jp-FI': 'ブレークスルー1' },
    description: { 'en-US': 'A simple AI breakthrough.', 'jp-FI': '簡単なAIブレークスルー。' },
    rarity: 'common',
    level: 1,
    maxLevel: 3,
    effect: [
      {
        paramEffected: 'influence',
        amount: 10,
      },
    ],
  },
]
