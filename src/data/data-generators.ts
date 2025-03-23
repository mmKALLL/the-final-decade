import { Action, GameState, Human, Breakthrough, YearlyContract, Rarity, Weighted } from '../types'
import { humans } from './data-humans'
import { breakthroughs } from './data-breakthroughs'
import { yearlyContracts } from './data-contracts'
import { pickWeighted } from '../util'

// Goal: 100 => 57% common, 30% uncommon, 10% rare, 3% epic by selecting best of 3 picks
const rarityDistribution: (rarityNumber: number) => Weighted<Rarity>[] = (rarityNumber) => [
  { value: 'common', weight: 82 },
  { value: 'uncommon', weight: Math.round((13 * rarityNumber) / 100) },
  { value: 'rare', weight: Math.round((4 * rarityNumber) / 100) },
  { value: 'epic', weight: Math.round((1 * rarityNumber) / 100) },
]

export function generateHuman(gs: GameState, rarityNumberOverride?: number, rarityOverride?: Rarity): Human {
  const rarityNumber = rarityNumberOverride ?? Math.floor(Math.random() * 300)
  const rarity = rarityOverride ?? pickWeighted(rarityDistribution(rarityNumber))

  const filteredHumans = humans.filter((h) => !gs.humans.includes(h) && h.rarity === rarity)
  return filteredHumans[Math.floor(Math.random() * filteredHumans.length)]
}

export function generateBreakthrough(gs: GameState, rarityNumberOverride?: number, rarityOverride?: Rarity): Breakthrough {
  const rarityNumber = rarityNumberOverride ?? Math.floor(Math.random() * 300)
  // FIXME: Use pickListOfWeighted instead so we don't get duplicates
  const rarity = rarityOverride ?? pickWeighted(rarityDistribution(rarityNumber))

  const filteredBreakthroughs = breakthroughs.filter(
    (b) => !gs.breakthroughs.some((existing) => existing.id === b.id) && b.rarity === rarity
  )
  return filteredBreakthroughs[Math.floor(Math.random() * filteredBreakthroughs.length)]
}

export function generateActionDescription(action: Action): string {
  function paramToLabel(param: string): string {
    switch (param) {
      case 'asiOutcome':
        return 'ASI outcome'
      case 'passiveIncome':
        return 'income'
      case 'publicUnity':
        return 'unity'

      default:
        return param
    }
  }

  return action.effect
    .map((effect) => {
      const { amount } = effect
      return `${paramToLabel(effect.paramEffected)} ${amount >= 0 ? '+' : ''}${amount}`
    })
    .join(', ')
}

export function generateYearlyContracts(): YearlyContract[] {
  return [2025, 2026, 2027, 2028, 2029].map((year) => {
    const currentYearContracts = yearlyContracts.filter((contract) => contract.year === year)
    return currentYearContracts[Math.floor(Math.random() * currentYearContracts.length)]
  })
}
