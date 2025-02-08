import { contracts, humans, upgrades } from "./data";
import { Contract, Human, Upgrade, } from "./types";

export function generateHuman(
  // _rarity: Rarity
): Human {
  // Return random human for now
  // TODO: Don't give duplicates
  return humans[Math.floor(Math.random() * humans.length)]
}

export function generateContract(): Contract {
  // Return random contract for now
  return contracts[Math.floor(Math.random() * contracts.length)]
}

export function generateUpgrade(): Upgrade {
  // Return random upgrade for now
  return upgrades[Math.floor(Math.random() * upgrades.length)]
}
