import { upgrades } from './data-gamestate'
import { Action, Human, Upgrade, YearlyContract } from '../types'
import { humans } from './data-humans'
import { yearlyContracts } from './data-contracts'

export function generateHuman(): Human {
  // _rarity: Rarity
  // Return random human for now
  // TODO: Don't give duplicates
  return humans[Math.floor(Math.random() * humans.length)]
}

export function generateUpgrade(): Upgrade {
  // Return random upgrade for now
  return upgrades[Math.floor(Math.random() * upgrades.length)]
}

export function generateActionDescription(action: Action): string {
  return action.effect
    .map((effect) => {
      const { amount } = effect
      return `${effect.paramEffected} ${amount >= 0 ? '+' : ''}${amount}`
    })
    .join(', ')
}

export function generateYearlyContracts(): YearlyContract[] {
  return [2025, 2026, 2027, 2028, 2029].map((year) => {
    const currentYearContracts = yearlyContracts.filter((contract) => contract.year === year)
    return currentYearContracts[Math.floor(Math.random() * currentYearContracts.length)]
  })
}
