import { Action, Breakthrough, Contract, Effect, GameState, Param, SingleEffect, Weighted } from './types'

export const getYear = (turn: number) => Math.floor(turn / 12) + 1
export const isGameOver = (gs: GameState): boolean => gs.money <= 0 || gs.asiOutcome <= 0 || gs.trust <= 0 || gs.influence <= 0
export const isGameWon = (gs: GameState): boolean => (getYear(gs.turn) >= 6 && gs.asiOutcome >= 100) || gs.publicUnity >= 100

export const levelUpCost = (breakthrough: Breakthrough) => breakthrough.level * 2 + 1

export const assertNever = (x: never): never => {
  throw new Error('Unexpected object: ' + x)
}

export const effectToString = (e: Effect): string => e.map(singleEffectToString).join(', ')

export const singleEffectToString = ({ paramEffected, amount }: SingleEffect) =>
  `${paramToLabel(paramEffected)} ${withPlusSign(Math.round(amount))}${paramEffected === 'money' ? 'k' : ''}`

export const withPlusSign = (value: number) => (value > 0 ? `+${value}` : `${value}`)

export const paramToLabel = (p: Param): string => {
  // prettier-ignore
  switch (p) {
    case 'turn':             return 'turn'
    case 'money':            return 'money'
    case 'passiveIncome':    return 'passive income'
    case 'trust':            return 'trust'
    case 'publicUnity':      return 'public unity'
    case 'asiOutcome':       return 'ASI outcome'
    case 'influence':        return 'influence'
    case 'rp':               return 'RP'
    case 'ep':               return 'EP'
    case 'sp':               return 'SP'
    case 'up':               return 'UP'
    case 'humanSelection':   return 'new human'
    case 'breakthroughSelection': return 'new breakthrough'
    default: return assertNever(p)
  }
}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const convertRequirementsToCondition = (requirements: Effect): ((gs: GameState) => boolean) => {
  return (gs: GameState) =>
    requirements.every(
      (req) =>
        req.paramEffected !== 'humanSelection' && req.paramEffected !== 'breakthroughSelection' && gs[req.paramEffected] >= req.amount
    )
}

export const convertContractToAction = (contract: Contract): Action => ({
  ...contract,
  eventId: 'internalStateChange',
  enabledCondition: convertRequirementsToCondition(contract.requirements),
  effect: [...contract.onSuccess, ...contract.costs],
  turnCost: 0,
  turnsInvested: 0,
})

// Convert turn to date format (2025 Jan + months)
export const getDateFromTurn = (turn: number) => {
  const startYear = 2025
  const year = startYear + Math.floor(turn / 12)
  const month = (turn % 12) + 1

  return `${year}-${month < 10 ? '0' : ''}${month}`
}

export function pickWeighted<T>(items: Weighted<T>[]): T {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  const roll = Math.random() * totalWeight

  let cumulative = 0
  for (const item of items) {
    cumulative += item.weight
    if (roll < cumulative) return item.value
  }

  // Fallback in case of rounding errors
  return items[items.length - 1].value
}

export function pickListOfWeighted<T extends { weight: number }>(elementsToPick: number, originalPool: T[]): T[] {
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

export const rarityColors = {
  common: '#CCC',
  uncommon: '#00BFFF',
  rare: '#FFD700',
  epic: '#FF4500',
}

// Format value display to be more readable
export const formatValue = (value: any): string | number => {
  if (typeof value === 'number' || typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    return value.length // Just show the count for arrays
  }
  return JSON.stringify(value)
}

// Calculate team multipliers based on senior and lead ranks
export const calculateTeamMultipliers = (gs: GameState) => {
  const seniors = gs.humans.filter((human) => human.rank === 'senior').length
  const leads = gs.humans.filter((human) => human.rank === 'lead').length

  // Seniors give 10% boost per senior, Leads give 25% boost per lead. The boosts are multiplicative.
  return Math.pow(1.1, seniors) * Math.pow(1.25, leads)
}

// Calculate resource production broken down by type
export const calculateResourceProduction = (gs: GameState) => {
  const baseSpProduction = gs.humans.reduce((acc, human) => acc + human.spGeneration, 0)
  const baseEpProduction = gs.humans.reduce((acc, human) => acc + human.epGeneration, 0)
  const baseRpProduction = gs.humans.reduce((acc, human) => acc + human.rpGeneration, 0)

  const teamMultiplier = calculateTeamMultipliers(gs)

  const totalSpProduction = Math.round(baseSpProduction * teamMultiplier)
  const totalEpProduction = Math.round(baseEpProduction * teamMultiplier)
  const totalRpProduction = Math.round(baseRpProduction * teamMultiplier)

  return {
    sp: { base: baseSpProduction, multiplier: teamMultiplier.toFixed(2), total: totalSpProduction },
    ep: { base: baseEpProduction, multiplier: teamMultiplier.toFixed(2), total: totalEpProduction },
    rp: { base: baseRpProduction, multiplier: teamMultiplier.toFixed(2), total: totalRpProduction },
  }
}
