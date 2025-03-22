import { Action, GameState, Human, Upgrade, YearlyContract } from '../types'
import { humans } from './data-humans'
import { yearlyContracts } from './data-contracts'
import { upgrades } from './data-upgrades'

export function generateHuman(gs: GameState, _rarity?: number): Human {
  // Return random human for now
  const filteredHumans = humans.filter((h) => !gs.humans.includes(h))
  return filteredHumans[Math.floor(Math.random() * filteredHumans.length)]
}

export function generateUpgrade(gs: GameState, _rarity?: number): Upgrade {
  // Return random upgrade for now
  const filteredUpgrades = upgrades.filter((u) => !gs.upgrades.includes(u))
  return filteredUpgrades[Math.floor(Math.random() * filteredUpgrades.length)]
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
