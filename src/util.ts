import { Action, Contract, Effect, GameState, Param, SingleEffect, Weighted } from './types'

export const getYear = (turn: number) => Math.floor(turn / 12) + 1
export const isGameOver = (gs: GameState) => gs.asiOutcome <= 0 || gs.publicUnity <= 0 || gs.money <= 0
export const isGameWon = (gs: GameState) => (getYear(gs.turn) >= 6 && gs.asiOutcome >= 100) || gs.publicUnity >= 100

export const assertNever = (x: never): never => {
  throw new Error('Unexpected object: ' + x)
}

export const effectToString = (e: Effect): string => e.map(singleEffectToString).join(', ')

const singleEffectToString = ({ paramEffected, amount }: SingleEffect) =>
  `${paramToLabel(paramEffected)} ${withPlusSign(Math.round(amount))}${paramEffected === 'money' ? 'k' : ''}`

const withPlusSign = (value: number) => (value > 0 ? `+${value}` : `${value}`)

const paramToLabel = (p: Param): string => {
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

export const convertContractToAction = (contract: Contract): Action => {
  return {
    ...contract,
    enabledCondition: convertRequirementsToCondition(contract.requirements),
    effect: [...contract.onSuccess, ...contract.costs],
    turnCost: 0,
    turnsInvested: 0,
  }
}

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
