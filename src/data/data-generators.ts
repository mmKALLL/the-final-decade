import { contracts, upgrades, yearlyContracts } from "./data";
import { Action, Contract, Human, Upgrade, } from "../types";
import { humans } from "./data-humans";

export function generateHuman(
  // _rarity: Rarity
): Human {
  // Return random human for now
  // TODO: Don't give duplicates
  return humans[Math.floor(Math.random() * humans.length)]
}

export function generateUpgrade(): Upgrade {
  // Return random upgrade for now
  return upgrades[Math.floor(Math.random() * upgrades.length)]
}

export function generateActionDescription(action: Action): string {
  return action.effect.map((effect) => {
    const { amount } = effect
    return `${effect.paramEffected} ${amount >= 0 ? '+' : ''}${amount}`
  }).join(', ')
}

export function generateYearlyContracts(): Contract[] {
  return yearlyContracts
}

export function generateContract(): Contract {
  // Return random contract for now
  return contracts[Math.floor(Math.random() * contracts.length)]
}
