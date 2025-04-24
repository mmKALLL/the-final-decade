import { Breakthrough, Effect, GameState, HumanRank, HumanType, Language, Param, SingleEffect, Weighted } from './types'

export const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
export const getYear = (turn: number) => Math.floor(turn / 12) + 1
export const getYearForDisplay = (turn: number) => 2025 + Math.floor(turn / 12)

export const isGameOver = (gs: GameState): boolean => gs.money <= 0 || gs.asiOutcome <= 0 || gs.trust <= 0 || gs.influence <= 0
export const isGameWon = (gs: GameState): boolean => (getYear(gs.turn) >= 6 && gs.asiOutcome >= 100) || gs.publicUnity >= 100

export const levelUpCost = (breakthrough: Breakthrough) => breakthrough.level + 3 // 4, 5, 6, ...

export const assertNever = (x: never): never => {
  throw new Error('Unexpected object: ' + x)
}

export const effectToString = (e: Effect, language: Language): string =>
  e.map((effect) => singleEffectToString(effect, language)).join(', ')

export const singleEffectToString = ({ paramEffected, amount }: SingleEffect, language: Language): string =>
  `${paramToLabel(paramEffected, language)} ${withPlusSign(Math.round(amount))}`

export const withPlusSign = (value: number) => (value >= 0 ? `+${value}` : `${value}`)

export const paramToLabel = (p: Param, language: Language): string => {
  // prettier-ignore
  if (language === 'jp-FI') {
    switch (p) {
      case 'turn':             return 'ターン'
      case 'money':            return 'お金'
      case 'passiveIncome':    return '受動的収入'
      case 'trust':            return '信頼'
      case 'publicUnity':      return '公共団結'
      case 'asiOutcome':       return 'ASI結果'
      case 'influence':        return '影響力'
      case 'sp':               return '💬'
      case 'ep':               return '🔧'
      case 'rp':               return '🧪'
      case 'up':               return '⚙️'
      case 'humanSelection':   return '人材選択'
      case 'breakthroughSelection': return '突破選択'
      default: return assertNever(p)
    }
  } else {
    switch (p) {
      case 'turn':             return 'turn'
      case 'money':            return 'money'
      case 'passiveIncome':    return 'income'
      case 'trust':            return 'trust'
      case 'publicUnity':      return 'unity'
      case 'asiOutcome':       return 'ASI outcome'
      case 'influence':        return 'influence'
      case 'sp':               return '💬'
      case 'ep':               return '🔧'
      case 'rp':               return '🧪'
      case 'up':               return '⚙️'
      case 'humanSelection':   return 'new human'
      case 'breakthroughSelection': return 'new breakthrough'
      default: return assertNever(p)
    }
  }
}

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

// Convert turn to date format (2025 Jan + months)
export const getDateFromTurn = (turn: number) => {
  const year = getYearForDisplay(turn)
  const month = (turn % 12) + 1

  return `${year}-${month < 10 ? '0' : ''}${month}`
}

export function pickWeighted<T>(items: Weighted<T>[]): T {
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  const roll = Math.random() * totalWeight

  let cumulative = 0
  for (const item of items) {
    cumulative += item.weight
    if (roll < cumulative) return item
  }

  // Fallback in case of rounding errors
  return items[items.length - 1]
}

export function pickListOfWeighted<T extends { weight: number }>(elementsToPick: number, originalPool: T[]): T[] {
  const pool = [...originalPool] // Shallow copy

  return Array.from({ length: Math.min(elementsToPick, pool.length) }, () => {
    const totalWeight = pool.reduce((acc, cur) => acc + cur.weight, 0)
    if (totalWeight === 0) throw new Error(`totalWeight became 0, pool=${JSON.stringify(pool)}`)

    const initialWeightIndex = Math.random() * totalWeight // Random value in range [0, totalWeight)
    let weightIndex = initialWeightIndex

    for (let i = 0; i < pool.length; i++) {
      weightIndex -= pool[i].weight
      if (weightIndex <= 0) {
        const selected = pool[i]
        pool.splice(i, 1) // Remove element to avoid duplicates
        return selected
      }
    }

    throw new Error(
      `Was not able to pick an effect, totalWeight=${totalWeight}, initialWeightIndex=${initialWeightIndex}, weightIndex=${weightIndex}, pool=${JSON.stringify(
        pool
      )}`
    )
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

export const seniorityMultipliers: Record<HumanRank, number> = {
  volunteer: 1,
  junior: 1,
  medior: 1,
  senior: 1.1,
  lead: 1.25,
}

// Calculate team multipliers based on senior and lead ranks
export const calculateTeamMultipliers = (gs: GameState): Record<HumanType, number> => {
  const seniors = gs.humans.filter((human) => human.rank === 'senior')
  const leads = gs.humans.filter((human) => human.rank === 'lead')

  const spSeniors = seniors.filter((h) => h.type === 'sp').length
  const epSeniors = seniors.filter((h) => h.type === 'ep').length
  const rpSeniors = seniors.filter((h) => h.type === 'rp').length

  const spLeads = leads.filter((h) => h.type === 'sp').length
  const epLeads = leads.filter((h) => h.type === 'ep').length
  const rpLeads = leads.filter((h) => h.type === 'rp').length

  // Seniors give 10% boost per senior, Leads give 25% boost per lead. The boosts are multiplicative.
  return {
    sp: Math.pow(1.1, spSeniors) * Math.pow(1.25, spLeads),
    ep: Math.pow(1.1, epSeniors) * Math.pow(1.25, epLeads),
    rp: Math.pow(1.1, rpSeniors) * Math.pow(1.25, rpLeads),
  }
}

// Calculate resource production broken down by type
// TODO: Add calculation of multipliers from breakthoughts
export const calculateResourceProduction = (gs: GameState) => {
  const baseSpProduction = gs.humans.reduce((acc, human) => acc + human.spGeneration, 0)
  const baseEpProduction = gs.humans.reduce((acc, human) => acc + human.epGeneration, 0)
  const baseRpProduction = gs.humans.reduce((acc, human) => acc + human.rpGeneration, 0)

  const teamMultiplier = calculateTeamMultipliers(gs)

  const totalSpProduction = Math.round(baseSpProduction * teamMultiplier.sp)
  const totalEpProduction = Math.round(baseEpProduction * teamMultiplier.ep)
  const totalRpProduction = Math.round(baseRpProduction * teamMultiplier.rp)

  return {
    sp: { base: baseSpProduction, multiplier: teamMultiplier.sp.toFixed(2), total: totalSpProduction },
    ep: { base: baseEpProduction, multiplier: teamMultiplier.ep.toFixed(2), total: totalEpProduction },
    rp: { base: baseRpProduction, multiplier: teamMultiplier.rp.toFixed(2), total: totalRpProduction },
  }
}
