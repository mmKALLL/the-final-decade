import { Contract, Effect, GameState, SingleEffect } from '../types'

function getYearIndex(turn: number): number {
  return Math.floor(turn / 12)
}

export function getRandomContract(gs: GameState): Contract {
  // Setup base parameters that control complexity
  const isAlignmentContract = Math.random() < 0.5
  let difficulty = 50 + Math.floor(Math.random() * (getYearIndex(gs.turn) * 50 + 75))
  let deadline = 5 + Math.floor(Math.random() * 200) + Math.max(200 - difficulty, 0)
  difficulty += Math.max(100 - deadline, 0)

  // Generate the variables needed for generating action effects
  const difficultyWithVariance = () => difficulty + Math.floor(Math.random() * (20 + Math.floor(difficulty / 5)))
  const acceptEffects = 1 + Math.floor(difficultyWithVariance() / 250)
  const successEffects = Math.floor(difficultyWithVariance() / 125)
  // const failureEffects = 1 + Math.floor(difficultyWithVariance() / 150)

  // Generate action effects
  // const onAccept: Effect = getAcceptEffects(difficulty, acceptEffects, isAlignmentContract, gs.trust)
  const onSuccess: Effect = [
    ...getAcceptEffects(difficulty, acceptEffects, isAlignmentContract, gs.trust), // Monetary reward from accepting is included into success now
    { paramEffected: 'trust', amount: Math.round((isAlignmentContract ? 2 : 1) * ((2 * difficulty) / 100)) },
    ...getSuccessEffects(difficulty, successEffects, isAlignmentContract, gs.trust),
  ]
  // const onFailure: Effect = [
  //   { paramEffected: 'trust', amount: Math.round((-6 * (difficulty + 100)) / 100) },
  //   ...getFailureEffects(difficulty, failureEffects, isAlignmentContract, gs.trust),
  // ]

  // Apply contract modifiers from the game state
  // const modifiedOnAccept = onAccept.map((e) => applyContractModifiers(gs, e))
  const modifiedOnSuccess = onSuccess.map((e) => applyContractModifiers(gs, e))
  // const modifiedOnFailure = onFailure.map((e) => applyContractModifiers(gs, e, true))

  // Requirements scale exponentially with difficulty. They are mapped to costs for now
  const totalRequirement = Math.round(Math.pow((100 + difficulty) / 100, 1.7))
  const alignmentRequirement = totalRequirement >= 2 && isAlignmentContract ? Math.round(totalRequirement * 0.64) : 0
  const alignmentCosts: Effect = alignmentRequirement > 0 ? [{ paramEffected: 'rp', amount: -alignmentRequirement }] : []
  const capabilityCosts: Effect = [{ paramEffected: 'ep', amount: -(totalRequirement - alignmentRequirement) }]
  const costs: Effect = [...alignmentCosts, ...capabilityCosts]
  const requirements: Effect = []

  return {
    name: { 'en-US': 'Generated Contract', 'jp-FI': '生成された契約' },
    rarity: 'common',
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

function getContractMoneyValue(difficulty: number, totalEffects: number, isAlignmentContract: boolean, trust: number): number {
  let value = getRandomValue(40, difficulty, 1.5)
  return Math.round((isAlignmentContract ? 0.9 : 2.05) * [1.25, 1, 0.4, 0.25][Math.min(totalEffects, 3)] * (trust / 100) * value)
}

function getAcceptEffects(difficulty: number, totalEffects: number, isAlignmentContract: boolean, trust: number): Effect {
  return [{ paramEffected: 'money', amount: getContractMoneyValue(difficulty, totalEffects, isAlignmentContract, trust) }]
}

function getSuccessEffects(difficulty: number, totalEffects: number, isAlignmentContract: boolean, trust: number): Effect {
  if (totalEffects === 0) return []
  const effectPool = isAlignmentContract
    ? getAlignmentSuccessEffects(difficulty, trust, totalEffects, isAlignmentContract)
    : getCapabilitySuccessEffects(difficulty, trust, totalEffects, isAlignmentContract)
  return getEffectsFromPool(totalEffects, effectPool)
}

// function getFailureEffects(difficulty: number, totalEffects: number, isAlignmentContract: boolean, trust: number): Effect {
//   if (totalEffects === 0) return []
//   const effectPool = isAlignmentContract
//     ? getAlignmentFailureEffects(difficulty, trust, totalEffects, isAlignmentContract)
//     : getCapabilityFailureEffects(difficulty, trust, totalEffects, isAlignmentContract)
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

/**
 * 
  if (totalEffects == 0) {
    return [];
  }

  // success

  List<WeightedEffect> alignmentEffectPool = [
    WeightedEffect(10, ActionEffect(Param.alignmentAcceptance, getRandomValue(1, difficulty, 0.02))),
    WeightedEffect(6, ActionEffect(Param.trust, getRandomValue(3, difficulty, 0.015))),
    WeightedEffect(difficulty > 300 ? 1 : 0, ActionEffect(Param.freeHumans, 1)),
    WeightedEffect(difficulty > 220 ? 1 : 0, ActionEffect(Param.upgradeSelection, getRandomValue(25, difficulty, 0.33))),
    WeightedEffect(1, ActionEffect(Param.rp, getRandomValue(1, difficulty, 0.005))),
    WeightedEffect(4, ActionEffect(Param.influence, getRandomValue(3, difficulty, 0.022))),
    WeightedEffect(
        1, ActionEffect(Param.money, (getContractMoneyValue(difficulty, totalEffects, isAlignmentContract, trust) * 0.25).round())),
    WeightedEffect(5, ActionEffect(Param.asiOutcome, getRandomValue(1, difficulty, 0.01))),
  ];

  List<WeightedEffect> capabilityEffectPool = [
    WeightedEffect(20, ActionEffect(Param.alignmentAcceptance, -getRandomValue(1, difficulty, 0.02))),
    WeightedEffect(
        3, ActionEffect(Param.money, (getContractMoneyValue(difficulty, totalEffects, isAlignmentContract, trust) * 0.2).round())),
    WeightedEffect(6, ActionEffect(Param.trust, getRandomValue(3, difficulty, 0.015))),
    WeightedEffect(2, ActionEffect(Param.influence, getRandomValue(3, difficulty, 0.022))),
    WeightedEffect(difficulty > 220 ? 1 : 0, ActionEffect(Param.freeHumans, 1)),
    WeightedEffect(difficulty > 300 ? 1 : 0, ActionEffect(Param.upgradeSelection, getRandomValue(25, difficulty, 0.33))),
    WeightedEffect(2, ActionEffect(Param.sp, getRandomValue(1, difficulty, 0.005))),
  ];

  // failure

  List<WeightedEffect> alignmentEffectPool = [
    WeightedEffect(4, ActionEffect(Param.alignmentAcceptance, -getRandomValue(2, difficulty, 0.04))),
    WeightedEffect(2, ActionEffect(Param.trust, -getRandomValue(5, difficulty, 0.06))),
    // WeightedEffect(1, ActionEffect(Param.freeHumans, 1)),
    // WeightedEffect(1, ActionEffect(Param.upgradeSelection, getRandomValue(25, difficulty, 0.33))),
    WeightedEffect(3, ActionEffect(Param.sp, -getRandomValue(1, difficulty, 0.013))),
    WeightedEffect(3, ActionEffect(Param.influence, -getRandomValue(7, difficulty, 0.04))),
    WeightedEffect(
        2, ActionEffect(Param.money, -(getContractMoneyValue(difficulty, totalEffects, isAlignmentContract, trust) * 0.6).round())),
  ];

  List<WeightedEffect> capabilityEffectPool = [
    WeightedEffect(1, ActionEffect(Param.alignmentAcceptance, -getRandomValue(2, difficulty, 0.04))),
    WeightedEffect(4, ActionEffect(Param.trust, -getRandomValue(5, difficulty, 0.08))),
    // WeightedEffect(1, ActionEffect(Param.freeHumans, 1)),
    // WeightedEffect(1, ActionEffect(Param.upgradeSelection, getRandomValue(25, difficulty, 0.33))),
    WeightedEffect(2, ActionEffect(Param.sp, -getRandomValue(1, difficulty, 0.01))),
    WeightedEffect(3, ActionEffect(Param.influence, -getRandomValue(8, difficulty, 0.05))),
    WeightedEffect(
        4, ActionEffect(Param.money, -(getContractMoneyValue(difficulty, totalEffects, isAlignmentContract, trust) * 0.7).round())),
  ];
 */

// Function to get alignment-focused success effects
function getAlignmentSuccessEffects(
  difficulty: number,
  trust: number,
  totalEffects: number,
  isAlignmentContract: boolean
): WeightedSingleEffect[] {
  return [
    { weight: 10, effect: { paramEffected: 'alignmentFocus', amount: getRandomValue(1, difficulty, 0.02) } },
    { weight: 6, effect: { paramEffected: 'trust', amount: getRandomValue(3, difficulty, 0.015) } },
    { weight: difficulty > 300 ? 1 : 0, effect: { paramEffected: 'humanSelection', amount: getRandomValue(25, difficulty, 0.33) } },
    { weight: difficulty > 220 ? 2 : 0, effect: { paramEffected: 'upgradeSelection', amount: getRandomValue(25, difficulty, 0.33) } },
    { weight: 1, effect: { paramEffected: 'rp', amount: getRandomValue(1, difficulty, 0.005) } },
    { weight: 4, effect: { paramEffected: 'influence', amount: getRandomValue(3, difficulty, 0.022) } },
    {
      weight: 1,
      effect: {
        paramEffected: 'money',
        amount: Math.round(getContractMoneyValue(difficulty, totalEffects, isAlignmentContract, trust) * 0.25),
      },
    },
    { weight: 5, effect: { paramEffected: 'asiOutcome', amount: getRandomValue(1, difficulty, 0.01) } },
  ]
}

// Function to get capability-focused success effects
function getCapabilitySuccessEffects(
  difficulty: number,
  trust: number,
  totalEffects: number,
  isAlignmentContract: boolean
): WeightedSingleEffect[] {
  return [
    { weight: 20, effect: { paramEffected: 'alignmentFocus', amount: -getRandomValue(1, difficulty, 0.02) } },
    {
      weight: 3,
      effect: {
        paramEffected: 'money',
        amount: Math.round(getContractMoneyValue(difficulty, totalEffects, isAlignmentContract, trust) * 0.2),
      },
    },
    { weight: 6, effect: { paramEffected: 'trust', amount: getRandomValue(3, difficulty, 0.015) } },
    { weight: 2, effect: { paramEffected: 'influence', amount: getRandomValue(3, difficulty, 0.022) } },
    { weight: difficulty > 220 ? 2 : 0, effect: { paramEffected: 'humanSelection', amount: getRandomValue(25, difficulty, 0.33) } },
    { weight: difficulty > 300 ? 1 : 0, effect: { paramEffected: 'upgradeSelection', amount: getRandomValue(25, difficulty, 0.33) } },
    { weight: 2, effect: { paramEffected: 'sp', amount: getRandomValue(1, difficulty, 0.005) } },
  ]
}

// function getAlignmentFailureEffects(
//   difficulty: number,
//   trust: number,
//   totalEffects: number,
//   isAlignmentContract: boolean
// ): WeightedSingleEffect[] {
//   return [
//     { weight: 4, effect: { paramEffected: 'alignmentFocus', amount: -getRandomValue(2, difficulty, 0.04) } },
//     { weight: 2, effect: { paramEffected: 'trust', amount: -getRandomValue(5, difficulty, 0.06) } },
//     { weight: 3, effect: { paramEffected: 'sp', amount: -getRandomValue(1, difficulty, 0.013) } },
//     { weight: 3, effect: { paramEffected: 'influence', amount: -getRandomValue(7, difficulty, 0.04) } },
//     {
//       weight: 2,
//       effect: {
//         paramEffected: 'money',
//         amount: -Math.round(getContractMoneyValue(difficulty, totalEffects, isAlignmentContract, trust) * 0.6),
//       },
//     },
//   ]
// }

// function getCapabilityFailureEffects(
//   difficulty: number,
//   trust: number,
//   totalEffects: number,
//   isAlignmentContract: boolean
// ): WeightedSingleEffect[] {
//   return [
//     { weight: 1, effect: { paramEffected: 'alignmentFocus', amount: -getRandomValue(2, difficulty, 0.04) } },
//     { weight: 4, effect: { paramEffected: 'trust', amount: -getRandomValue(5, difficulty, 0.08) } },
//     { weight: 2, effect: { paramEffected: 'sp', amount: -getRandomValue(1, difficulty, 0.01) } },
//     { weight: 3, effect: { paramEffected: 'influence', amount: -getRandomValue(8, difficulty, 0.05) } },
//     {
//       weight: 4,
//       effect: {
//         paramEffected: 'money',
//         amount: -Math.round(getContractMoneyValue(difficulty, totalEffects, isAlignmentContract, trust) * 0.7),
//       },
//     },
//   ]
// }

function effectListToString(effects: Effect): string {
  return effects.map((e) => `${e.paramEffected} ${e.amount > 0 ? '+' : ''}${e.amount}`).join(', ')
}

function pickListOfWeighted<T extends { weight: number }>(elementsToPick: number, originalPool: T[]): T[] {
  const pool = [...originalPool] // Shallow copy

  return Array.from({ length: Math.min(elementsToPick, pool.length) }, () => {
    const totalWeight = pool.reduce((acc, cur) => acc + cur.weight, 0)
    if (totalWeight === 0) throw new Error(`totalWeight became 0, pool=${JSON.stringify(pool)}`)

    let weightIndex = Math.floor(Math.random() * totalWeight) + 1 // Random value in range [1, totalWeight]

    for (let i = 0; i < pool.length; i++) {
      weightIndex -= pool[i].weight
      if (weightIndex <= 0) {
        const selected = pool[i]
        pool.splice(i, 1) // Remove element to avoid duplicates
        return selected
      }
    }

    throw new Error(`Was not able to pick an effect, totalWeight=${totalWeight}, weightIndex=${weightIndex}, pool=${JSON.stringify(pool)}`)
  })
}
