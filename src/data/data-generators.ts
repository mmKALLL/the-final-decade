import { Action, GameState, Human, Breakthrough, YearlyContract } from '../types'
import { humans } from './data-humans'
import { breakthroughs } from './data-breakthroughs'
import { yearlyContracts } from './data-contracts'

export function generateHuman(gs: GameState, _rarity?: number): Human {
  // Return random human for now
  const filteredHumans = humans.filter((h) => !gs.humans.includes(h))
  return filteredHumans[Math.floor(Math.random() * filteredHumans.length)]
}

export function generateBreakthrough(gs: GameState, _rarity?: number): Breakthrough {
  // Return random breakthrough for now
  const filteredBreakthroughs = breakthroughs.filter((b) => !gs.breakthroughs.some((existing) => existing.id === b.id))
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
