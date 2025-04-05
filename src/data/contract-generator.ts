import { Contract, ContractType, Effect, GameState, Language, SingleEffect } from '../types'
import { assertNever, getRandomInt, paramToLabel, pickListOfWeighted, withPlusSign } from '../util'
import { getRandomContractName } from './data-yearly-goals'

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

  const difficulty = 30 + gs.influence * 0.6 + Math.floor(Math.random() * (getYearIndex(gs.turn) * 30 + gs.influence * 0.7))

  // Generate the variables needed for generating action effects
  const rarity = difficulty > 260 ? 'epic' : difficulty > 200 ? 'rare' : difficulty > 150 ? 'uncommon' : 'common'
  const successEffects = rarity === 'epic' ? 3 : rarity === 'rare' ? 2 : rarity === 'uncommon' ? 1 : 0

  // Generate action effects
  const onSuccess: Effect = [
    // Accept effects = monetary reward from completing the contract; the name is historical
    ...getAcceptEffects(difficulty, successEffects, isSecondaryContract),
    ...(isSecondaryContract
      ? [
          {
            paramEffected: contractType === 'product' ? 'trust' : contractType === 'safety' ? 'asiOutcome' : assertNever(contractType),
            amount: Math.floor(3.5 * (difficulty / 100)),
          } as const,
        ]
      : []),
    ...getSuccessEffects(difficulty, successEffects, contractType),
  ]

  // Apply contract modifiers from the game state
  const modifiedOnSuccess = onSuccess.map((e) => applyContractModifiers(gs, e))

  // Requirements scale exponentially with difficulty. They are mapped to costs for now
  const totalRequirement = Math.round(Math.pow(((isSecondaryContract ? 100 : 120) + difficulty) / 100, 1.75))
  const secondaryRequirement = totalRequirement >= 2 && isSecondaryContract ? Math.round(totalRequirement * (0.5 + Math.random() * 0.3)) : 0

  const primaryCosts: Effect = [{ paramEffected: 'ep', amount: -(totalRequirement - secondaryRequirement) * 5 }]
  const secondaryCosts: Effect =
    secondaryRequirement > 0 ? [{ paramEffected: contractType === 'safety' ? 'rp' : 'sp', amount: -secondaryRequirement * 5 }] : []

  const capabilityCosts: Effect = [
    { paramEffected: Math.random() < 0.6 ? 'trust' : 'asiOutcome', amount: Math.ceil(-4 * (difficulty / 100)) },
  ]

  const costs: Effect = contractType === 'capabilities' ? [...primaryCosts, ...capabilityCosts] : [...secondaryCosts, ...primaryCosts]
  const requirements: Effect = []

  return {
    name: getRandomContractName(contractType),
    type: contractType,
    rarity,
    successDescription: { 'en-US': effectListToString(modifiedOnSuccess), 'jp-FI': effectListToString(modifiedOnSuccess) },
    requirementDescription: { 'en-US': effectListToString(requirements), 'jp-FI': effectListToString(requirements) },
    costDescription: { 'en-US': effectListToString(costs), 'jp-FI': effectListToString(costs) },
    onSuccess: modifiedOnSuccess,
    requirements,
    costs,
  }
}

// Utility functions adapted for TypeScript

// Gives a value between base to (0.8 - 1.2) * difficulty * difficultyFactor
// E.g., to get a value between 2 and 4 (2 + difficulty / 100), use base = 2, difficultyFactor = 0.01
function getRandomValue(base: number, difficulty: number, difficultyFactor: number = 1): number {
  return Math.floor(base + (difficulty * 0.8 + Math.random() * (difficulty * 0.4)) * difficultyFactor)
}

function getContractMoneyValue(difficulty: number, totalEffects: number, isSecondaryContract: boolean): number {
  let value = getRandomValue(40, difficulty, 1.5) * 0.2 // Multiplier to convert Alignment is Hard values into The Final Decade curve
  const effectMultiplier = [1.25, 1, 0.8, 0.7][Math.min(totalEffects, 3)] // Indexed access; contracts with more effects provide less money

  return Math.round(((isSecondaryContract ? 1 : 2.2) * effectMultiplier * value) / 5) * 5 // Round to nearest 5
}

function getAcceptEffects(difficulty: number, totalEffects: number, isSecondaryContract: boolean): Effect {
  return [{ paramEffected: 'money', amount: getContractMoneyValue(difficulty, totalEffects, isSecondaryContract) }]
}

function getSuccessEffects(difficulty: number, totalEffects: number, contractType: ContractType): Effect {
  if (totalEffects <= 0) return []
  const effectPool =
    contractType === 'safety' || contractType === 'product'
      ? getAlignmentSuccessEffects(difficulty, totalEffects, contractType)
      : getCapabilitySuccessEffects(difficulty, totalEffects, false)
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
function getAlignmentSuccessEffects(difficulty: number, totalEffects: number, contractType: ContractType): WeightedSingleEffect[] {
  return [
    { weight: difficulty > 260 ? 2 : 0, effect: { paramEffected: 'humanSelection', amount: getRandomValue(100, difficulty, 0.5) } },
    { weight: difficulty > 200 ? 2 : 0, effect: { paramEffected: 'breakthroughSelection', amount: getRandomValue(50, difficulty, 0.5) } },
    { weight: difficulty > 200 ? 1 : 3, effect: { paramEffected: 'ep', amount: getRandomValue(4, difficulty, 0.05) } },
    {
      weight: 4,
      effect: { paramEffected: contractType === 'safety' ? 'trust' : 'asiOutcome', amount: getRandomValue(3, difficulty, 0.05) }, // The compliment of the effect native to the contract type
    },
    { weight: 3, effect: { paramEffected: 'influence', amount: getRandomValue(3, difficulty, 0.04) } },
    {
      weight: difficulty > 150 ? 2 : 1,
      effect: {
        paramEffected: 'up',
        amount: getRandomInt(2, 3),
      },
    },
    { weight: difficulty > 200 ? 2 : 1, effect: { paramEffected: 'publicUnity', amount: 1 } },
  ]
}

// Function to get capability-focused success effects
function getCapabilitySuccessEffects(difficulty: number, totalEffects: number, isSecondaryContract: boolean): WeightedSingleEffect[] {
  return [
    { weight: difficulty > 200 ? 1 : 3, effect: { paramEffected: 'sp', amount: getRandomValue(4, difficulty, 0.05) } },
    { weight: difficulty > 200 ? 1 : 3, effect: { paramEffected: 'rp', amount: getRandomValue(4, difficulty, 0.05) } },
    { weight: 3, effect: { paramEffected: 'influence', amount: getRandomValue(3, difficulty, 0.04) } },
    { weight: difficulty > 200 ? 2 : 0, effect: { paramEffected: 'humanSelection', amount: getRandomValue(50, difficulty, 0.5) } },
    { weight: difficulty > 260 ? 2 : 0, effect: { paramEffected: 'breakthroughSelection', amount: getRandomValue(100, difficulty, 0.5) } },
    { weight: 3, effect: { paramEffected: 'up', amount: getRandomInt(2, 4) } },
    { weight: 3, effect: { paramEffected: 'passiveIncome', amount: getRandomValue(1, difficulty, 0.014) } },
  ]
}

function effectListToString(effects: Effect, language: Language): string {
  return effects.map((e) => `${paramToLabel(e.paramEffected, language)} ${withPlusSign(e.amount)}`).join(', ')
}
