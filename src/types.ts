// Needed for Google Tag Manager interoperability; see https://github.com/vercel/next.js/discussions/20784 and https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export type CurrentScreen =
  | 'mainMenu' // unused
  | 'gameOver'
  | 'victory'
  | 'introduction' // unused
  | 'ingame'
  | 'breakthroughs'
  | 'breakthroughSelection'
  | 'humanAllocation' // unused
  | 'contracts'

export type Language = 'en-US' | 'jp-FI'
export type Label = Record<Language, string>
export type LabelByLevel = Record<Language, (level: number) => string>

export type GameState = {
  debug: boolean
  currentScreen: 'main' | 'selection' | 'game-over' | 'victory'
  language: Language

  turn: number // Each unit of time represents one month

  // -5 - 5 in most cases. Public view of alignment. ASI outcome is shifted by this amount each turn. Decreases by 1 every year. Originally one of the win/loss conditions, influences what rate of org breakthroughs lead to alignment improvements. Second-order effect on asiOutcome.
  publicUnity: number

  // 0-100. Shifted whenever breakthroughs are made, by the level of the feature receiving the breakthrough. 0: capabilities win; misaligned ASI. 100: aligned ASI.
  asiOutcome: number

  // 0-200. Trust towards your organization. Gain or lose depending on whether your engineering is more focused alignment or capabilities. If you have high trust you'll get better contracts and recruits
  trust: number

  // 0-200. Influence is a percentage multiplier to the effect of your social actions (like increasing public unity). It is bought using money. It reduces both monetary and SP cost of unity lobbying. Removed on 2025-10-03
  // influence: number

  // The various turn-based actions have an passive and active component - passive is gained each turn, active when a turn is used to take that action
  money: number
  income: number

  // getTeamPerformance: () => number // (30 / (25 + freeHumans)) // Unused. Effectiveness of each person. Having more decreases their efficiency.

  // Variables to track gain of SP/EP/RP/UP
  sp: number
  ep: number
  rp: number
  up: number

  humans: Human[]
  contracts: Contract[]
  breakthroughs: Breakthrough[]

  humanSelections: Human[][]
  breakthroughSelections: Breakthrough[][]

  maxContracts: number
  yearlyContracts: Contract[]

  // additionalActions: Action[] // Any actions that are granted by breakthroughs

  // recentActions: Action[]
  // recentGS: GameState[]

  // Organization playerOrganization: Organization('Meta AI', -30, FeatureName.automation);
  // organizations: Organization[]

  // modifiers that affect param gain/loss
  // addModifiers: Record<Param, CurriedModifier[]>
  // multModifiers: Record<Param, CurriedModifier[]>
  // functionModifiers: Record<Param, CurriedModifier[]>

  // paramEventHandlers: Record<Param, CurriedParamEventHandler[]> // handlers that can stack more effects when a parameter's value has been changed
  // eventHandlers: Record<Param, CurriedActionEventHandler[]> // handlers that can perform additional reductions when actions are taken

  // mods that affect contract generation
  // FIXME: Should these mods affect accept rewards too, or only success? Should failure be affected by multipliers? Need filtering for the modifier functions?
  // contractAddModifiers: Record<Param, CurriedModifier[]>
  // contractMultModifiers: Record<Param, CurriedModifier[]>
  // contractFunctionModifiers: Record<Param, CurriedModifier[]>

  // mods that affect organization generation
  // organizationAddModifiers: Record<Param, CurriedModifier[]>
  // organizationMultModifiers: Record<Param, CurriedModifier[]>
  // organizationFunctionModifiers: Record<Param, CurriedModifier[]>
}

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic'

export type HumanType = 'sp' | 'ep' | 'rp'
export type HumanRank = 'volunteer' | 'junior' | 'medior' | 'senior' | 'coach' | 'lead' // seniors, coaches, and leads multiply the output of others, but at high cost

export type Human = {
  name: Label
  // description: string
  rarity: Rarity
  type: HumanType
  wage: number
  rank: HumanRank
  spGeneration: number
  epGeneration: number
  rpGeneration: number
  specialEffect?: ParamEffect[] // NOTE: Don't allow functions in humans, makes save file serialization simpler
  guaranteed?: boolean // Used for testing, always prepends the human into selctions
}

export type Breakthrough = {
  id: string
  name: Label
  description: LabelByLevel
  rarity: Rarity
  level: number
  maxLevel: number // Should be 3 for everything
  effect?: Effect
  functionEffect?: (gs: GameState) => GameState
  modifiers?: Modifier[] // mods that affect resource gain
  actionEventHandlers?: ActionEventHandler[] // handlers that can perform additional reductions when actions are taken
  paramEventHandlers?: ParamEventHandler[] // handlers that can stack more effects when a parameter's value has been changed
  guaranteed?: boolean // Used for testing, always prepends the breakthrough into selctions
}

// Types for Breakthrough modifiers and event handlers

export enum ModifierType {
  Add = 'add',
  Multiply = 'multiply',
  Function = 'function',
}

export type ModifierFunction = (value: number, level: number) => number
export type CurriedModifier = (value: number) => number

export type Modifier = {
  param: Param
  type: ModifierType
  apply: ModifierFunction
  filter?: () => boolean
}

export type EventId =
  | 'allActions'

  // First-order actions
  | 'independentOutreach'
  | 'independentEngineering'
  | 'independentResearch'
  | 'independentFunding'
  // | 'gainUpgradePoint'

  // Second-order actions
  | 'recruitHuman'
  | 'buildUpgrades'
  | 'researchBreakthrough'
  | 'increaseUnity'

  // Game state related
  | 'refreshContracts'
  | 'contractSuccess'
  | 'turnEnd'
  | 'yearChange'
  | 'internalStateChange' // Should not be listened to in most cases
  | 'levelUpBreakthrough'

export type ActionEventHandlerFunction = (gs: GameState, level: number) => GameState
export type ActionEventHandler = { trigger: EventId; apply: ActionEventHandlerFunction }

export type ParamEventHandlerFunction = (gs: GameState, level: number, param: Param, value: number) => GameState
export type ParamEventHandler = { trigger: Param; apply: ParamEventHandlerFunction }

export type Param =
  | 'turn'
  | 'money'
  | 'income'
  | 'trust'
  | 'publicUnity'
  | 'asiOutcome'
  | 'rp'
  | 'ep'
  | 'sp'
  | 'up'
  | 'humanSelection'
  | 'breakthroughSelection'

export type ContractType = 'safety' | 'capabilities' | 'product'

export type Contract = {
  name: Label
  type?: ContractType
  rarity: Rarity
  // acceptDescription: Label
  successDescription: Label
  requirementDescription: Label
  costDescription: Label
  // onAccept: Effect
  onSuccess: Effect
  // onFailure: Effect
  requirements: Effect
  costs: Effect
}

export type YearlyContract = Contract & {
  year: number
}

export type Action = {
  eventId: EventId
  name: Label
  description?: Label
  enabledCondition?: (gs: GameState) => boolean
  turnCost: number
  turnsInvested: number
  effect: Effect
  functionEffect?: (gs: GameState) => GameState
}

export type SingleEffect = {
  source?: string
  condition?: (gs: GameState, paramEffected: Param, baseAmount: number) => boolean
} & ParamEffect

type ParamEffect = { paramEffected: Param; amount: number }

export type Effect = SingleEffect[]
export type EffectStack = (SingleEffect & { depth: number })[]

export type Weighted<T> = T & {
  weight: number
}
