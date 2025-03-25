import { Action, GameState, Human, Breakthrough, YearlyContract, Rarity, Weighted } from '../types'
import { humans } from './data-humans'
import { breakthroughs } from './data-breakthroughs'
import { yearlyContracts } from './data-yearly-goals'
import { pickListOfWeighted } from '../util'

// Goal: 100 => 57% common, 30% uncommon, 10% rare, 3% epic by selecting best of 3 picks
const rarityDistribution: (rarityNumber: number) => Weighted<{ value: Rarity }>[] = (rarityNumber) => [
  { value: 'common', weight: 82 },
  { value: 'uncommon', weight: Math.round((13 * rarityNumber) / 100) },
  { value: 'rare', weight: Math.round((4 * rarityNumber) / 100) },
  { value: 'epic', weight: Math.round((1 * rarityNumber) / 100) },
]

export function generateHumanSelection(gs: GameState, rarityNumberOverride?: number, rarityOverride?: Rarity): Human[] {
  const rarityNumber = rarityNumberOverride ?? Math.floor(gs.trust + Math.random() * 100)
  let weightedHumans: Weighted<Human>[] = []
  let filteredHumans: Human[] = humans.filter((h) => !gs.humans.includes(h))

  if (!rarityOverride) {
    // Pick three random humans using the rarity distribution, with normalization to account for large number of commons
    weightedHumans = filteredHumans.map((h) => ({
      ...h,
      weight:
        (rarityDistribution(rarityNumber).find((r) => r.value === h.rarity)?.weight ?? 0) /
        humans.filter((h) => h.rarity === h.rarity).length,
    }))

    // Else: Get humans only from the specified rarity
  } else {
    // Filter humans not already in the game state with the desired rarity
    filteredHumans = filteredHumans.filter((h) => h.rarity === rarityOverride)

    // If not enough humans of the desired rarity are available, add some rare ones
    if (filteredHumans.length <= 3) {
      filteredHumans = [...filteredHumans, ...humans.filter((h) => !gs.humans.includes(h) && h.rarity === 'rare').slice(0, 3)]
    }

    // Convert to weighted format for pickListOfWeighted
    weightedHumans = filteredHumans.map((h) => ({ ...h, weight: 1 }))
  }

  // Pick three random human from the filtered list, with guaranteed humans at the start
  const guaranteedHumans = humans.filter((h) => h.guaranteed)
  return [...guaranteedHumans, ...pickListOfWeighted(3, weightedHumans)]
}

export function generateBreakthroughSelection(gs: GameState, rarityNumberOverride?: number, rarityOverride?: Rarity): Breakthrough[] {
  const rarityNumber = rarityNumberOverride ?? Math.floor(Math.random() * 300 + 50)

  const guaranteedBreakthroughs = breakthroughs.filter((b) => b.guaranteed)
  let weightedBreakthroughs: Weighted<Breakthrough>[] = []
  let filteredBreakthroughs: Breakthrough[] = breakthroughs.filter((b) => !gs.breakthroughs.some((existing) => existing.id === b.id))

  if (!rarityOverride) {
    weightedBreakthroughs = filteredBreakthroughs.map((b) => ({
      ...b,
      weight:
        (rarityDistribution(rarityNumber).find((r) => r.value === b.rarity)?.weight ?? 0) /
        breakthroughs.filter((b) => b.rarity === b.rarity).length,
    }))

    // Else: Get breakthroughs only from the specified rarity
  } else {
    // Filter breakthroughs not already in the game state with the desired rarity
    filteredBreakthroughs = filteredBreakthroughs.filter((b) => b.rarity === rarityOverride)

    // If no breakthroughs of the desired rarity are available, add some rare ones
    if (filteredBreakthroughs.length <= 3) {
      filteredBreakthroughs = [
        ...filteredBreakthroughs,
        ...breakthroughs.filter((b) => !gs.breakthroughs.some((existing) => existing.id === b.id) && b.rarity === 'rare').slice(0, 3),
      ]
    }
    // Pick three random breakthroughs from the filtered list
    weightedBreakthroughs = filteredBreakthroughs.map((b) => ({ ...b, weight: 1 }))
  }

  return [...guaranteedBreakthroughs, ...pickListOfWeighted(3, weightedBreakthroughs)]
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
