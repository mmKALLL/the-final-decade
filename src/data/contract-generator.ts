import { Contract, Effect, GameState, SingleEffect } from '../types'
import { paramToLabel, pickListOfWeighted } from '../util'
import { getRandomContractName } from './data-contracts'

export const refreshContracts = (gs: GameState): GameState => ({
  ...gs,
  contracts: Array(gs.maxContracts)
    .fill(null)
    .map(() => generateContract(gs)),
})

function getYearIndex(turn: number): number {
  return Math.floor(turn / 12)
}

export function generateContract(gs: GameState): Contract {
  // Setup base parameters that control complexity
  const contractType = Math.random() < 0.33 ? 'safety' : Math.random() < 0.5 ? 'capabilities' : 'product'
  const isSecondaryContract = contractType === 'safety' || contractType === 'product'

  const difficulty = 10 + gs.trust / 2 + Math.floor(Math.random() * (getYearIndex(gs.turn) * 50 + gs.trust / 2))

  // Generate the variables needed for generating action effects
  const difficultyWithVariance = () => difficulty + Math.floor(Math.random() * (20 + Math.floor(difficulty / 5)))
  const successEffects = Math.floor(difficultyWithVariance() / 125)

  // Generate action effects
  const onSuccess: Effect = [
    ...getAcceptEffects(difficulty, successEffects, isSecondaryContract, gs.trust), // Monetary reward from accepting is included into success now
    ...getSuccessEffects(difficulty, successEffects, isSecondaryContract, gs.trust),
    ...(isSecondaryContract ? [{ paramEffected: 'trust', amount: Math.round(2 * ((2 * difficulty) / 100)) } as const] : []),
  ]

  // Apply contract modifiers from the game state
  const modifiedOnSuccess = onSuccess.map((e) => applyContractModifiers(gs, e))

  // Requirements scale exponentially with difficulty. They are mapped to costs for now
  const totalRequirement = Math.round(Math.pow((100 + difficulty) / 100, 1.7))
  const secondaryRequirement = totalRequirement >= 2 && isSecondaryContract ? Math.round(totalRequirement * 0.64) : 0

  const primaryCosts: Effect = [{ paramEffected: 'ep', amount: -(totalRequirement - secondaryRequirement) * 5 }]
  const secondaryCosts: Effect =
    secondaryRequirement > 0 ? [{ paramEffected: contractType === 'safety' ? 'rp' : 'sp', amount: -secondaryRequirement * 5 }] : []

  const capabilityCosts: Effect = [
    { paramEffected: Math.random() < 0.5 ? 'trust' : 'asiOutcome', amount: Math.floor(-1 * ((2 * difficulty) / 100)) },
  ]

  const costs: Effect = contractType === 'capabilities' ? [...primaryCosts, ...capabilityCosts] : [...secondaryCosts, ...primaryCosts]
  const requirements: Effect = []

  return {
    name: getRandomContractName(contractType),
    type: contractType,
    rarity: difficulty > 200 ? 'rare' : difficulty > 150 ? 'uncommon' : 'common',
    successDescription: { 'en-US': effectListToString(modifiedOnSuccess), 'jp-FI': effectListToString(modifiedOnSuccess) },
    requirementDescription: { 'en-US': effectListToString(requirements), 'jp-FI': effectListToString(requirements) },
    costDescription: { 'en-US': effectListToString(costs), 'jp-FI': effectListToString(costs) },
    onSuccess: modifiedOnSuccess,
    requirements,
    costs,
  }
}

// Utility functions adapted for TypeScript

function getRandomValue(base: number, difficulty: number, difficultyFactor: number = 1): number {
  return Math.floor(base + (difficulty * 0.85 + Math.random() * (difficulty / 3)) * difficultyFactor)
}

function getContractMoneyValue(difficulty: number, totalEffects: number, isSecondaryContract: boolean, trust: number): number {
  let value = getRandomValue(40, difficulty, 1.5) * 0.2 // Multiplier to convert Alignment is Hard values into The Final Decade curve
  const effectMultiplier = [1.25, 1, 0.4, 0.25][Math.min(totalEffects, 3)] // Indexed access; contracts with more effects provide less money

  return Math.round(((isSecondaryContract ? 0.9 : 2.05) * effectMultiplier * (trust / 100) * value) / 5) * 5 // Round to nearest 5
}

function getAcceptEffects(difficulty: number, totalEffects: number, isSecondaryContract: boolean, trust: number): Effect {
  return [{ paramEffected: 'money', amount: getContractMoneyValue(difficulty, totalEffects, isSecondaryContract, trust) }]
}

function getSuccessEffects(difficulty: number, totalEffects: number, isSecondaryContract: boolean, trust: number): Effect {
  if (totalEffects === 0) return []
  const effectPool = isSecondaryContract
    ? getAlignmentSuccessEffects(difficulty, trust, totalEffects, isSecondaryContract)
    : getCapabilitySuccessEffects(difficulty, trust, totalEffects, isSecondaryContract)
  return getEffectsFromPool(totalEffects, effectPool)
}

// function getFailureEffects(difficulty: number, totalEffects: number, isSecondaryContract: boolean, trust: number): Effect {
//   if (totalEffects === 0) return []
//   const effectPool = isSecondaryContract
//     ? getAlignmentFailureEffects(difficulty, trust, totalEffects, isSecondaryContract)
//     : getCapabilityFailureEffects(difficulty, trust, totalEffects, isSecondaryContract)
//   return getEffectsFromPool(totalEffects, effectPool)
// }

function getEffectsFromPool(totalEffects: number, effectPool: WeightedSingleEffect[]): Effect {
  return pickListOfWeighted(totalEffects, effectPool).map((e) => e.effect)
}

// This function was originally for applying contract modifiers from GS, but those are not implemented yet
function applyContractModifiers(_gs: GameState, effect: SingleEffect, _isForFailure: boolean = false): SingleEffect {
  return effect
  // return {
  //   paramEffected: effect.paramEffected,
  //   amount: applyParamModifiers(
  //     effect,
  //     isForFailure ? {} : gs.contractAddModifiers,
  //     gs.contractMultModifiers,
  //     isForFailure ? {} : gs.contractFunctionModifiers
  //   ),
  // }
}

// Example weighted effect structure for success/failure pools
interface WeightedSingleEffect {
  weight: number
  effect: SingleEffect
}

// Function to get alignment-focused success effects
function getAlignmentSuccessEffects(
  difficulty: number,
  trust: number,
  totalEffects: number,
  isSecondaryContract: boolean
): WeightedSingleEffect[] {
  return [
    { weight: 10, effect: { paramEffected: 'asiOutcome', amount: getRandomValue(1, difficulty, 0.02) } },
    { weight: 6, effect: { paramEffected: 'trust', amount: getRandomValue(3, difficulty, 0.015) } },
    { weight: difficulty > 300 ? 1 : 0, effect: { paramEffected: 'humanSelection', amount: getRandomValue(25, difficulty, 0.33) } },
    { weight: difficulty > 220 ? 2 : 0, effect: { paramEffected: 'breakthroughSelection', amount: getRandomValue(25, difficulty, 0.33) } },
    { weight: 1, effect: { paramEffected: 'rp', amount: getRandomValue(1, difficulty, 0.005) } },
    { weight: 4, effect: { paramEffected: 'influence', amount: getRandomValue(3, difficulty, 0.022) } },
    {
      weight: 1,
      effect: {
        paramEffected: 'money',
        amount: Math.round(getContractMoneyValue(difficulty, totalEffects, isSecondaryContract, trust) * 0.25),
      },
    },
    { weight: difficulty > 150 ? 2 : 1, effect: { paramEffected: 'publicUnity', amount: 1 } },
  ]
}

// Function to get capability-focused success effects
function getCapabilitySuccessEffects(
  difficulty: number,
  trust: number,
  totalEffects: number,
  isSecondaryContract: boolean
): WeightedSingleEffect[] {
  return [
    {
      weight: 4,
      effect: {
        paramEffected: 'money',
        amount: Math.round(getContractMoneyValue(difficulty, totalEffects, isSecondaryContract, trust) * 0.2),
      },
    },
    { weight: 3, effect: { paramEffected: 'influence', amount: getRandomValue(3, difficulty, 0.022) } },
    { weight: difficulty > 200 ? 2 : 0, effect: { paramEffected: 'humanSelection', amount: getRandomValue(25, difficulty, 0.33) } },
    { weight: difficulty > 300 ? 1 : 0, effect: { paramEffected: 'breakthroughSelection', amount: getRandomValue(25, difficulty, 0.33) } },
    { weight: 2, effect: { paramEffected: 'sp', amount: getRandomValue(1, difficulty, 0.005) } },
    { weight: 1, effect: { paramEffected: 'passiveIncome', amount: getRandomValue(1, difficulty, 0.005) } },
  ]
}

function effectListToString(effects: Effect): string {
  return effects.map((e) => `${paramToLabel(e.paramEffected)} ${e.amount > 0 ? '+' : ''}${e.amount}`).join(', ')
}
