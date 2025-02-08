export type CurrentScreen =
  | 'mainMenu' // unused
  | 'gameOver'
  | 'victory'
  | 'introduction' // unused
  | 'ingame'
  | 'upgrades'
  | 'upgradeSelection'
  | 'humanAllocation' // unused
  | 'contracts'

export type Language = 'en-US' | 'jp-FI'

export type GameState = {
  currentScreen: 'main' | 'selection'
  language: Language

  turn: number // Each unit of time represents one month

  // -5 - 5. Public view of alignment. ASI outcome is shifted by this amount each turn. Decreases by 1 every year. Originally one of the win/loss conditions, influences what rate of org breakthroughs lead to alignment improvements. Second-order effect on asiOutcome.
  alignmentFocus: number

  // 0-100. Shifted whenever breakthroughs are made, by the level of the feature receiving the breakthrough. 0: capabilities win; misaligned ASI. 100: aligned ASI.
  asiOutcome: number

  // 0-200. Trust towards your organization. Gain or lose depending on how your fund/contract money is handled. If you have high trust you'll get better contracts and recruits
  trust: number

  // 0-200. Influence is a percentage multiplier to the effect of your social actions (like increasing alignment focus)
  influence: number

  // The various turn-based actions have an passive and active component - passive is gained each turn, active when a turn is used to take that action
  money: number
  passiveMoneyGain: number

  // getTeamPerformance: () => number // (30 / (25 + freeHumans)) // Unused. Effectiveness of each person. Having more decreases their efficiency.

  // Variables to track gain of SP/EP/RP
  sp: number
  ep: number
  rp: number

  humans: Human[]
  contracts: Contract[]
  upgrades: Upgrade[]

  humanSelections: Human[][]
  upgradeSelections: Upgrade[][]
  contractSelections: Contract[][]

  yearlyContracts: Contract[]

  availableActions: Action[]

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

export type Human = {
  name: Record<Language, string>
  // description: string
  rarity: Rarity
  wage: number
  rank: 'volunteer' | 'junior' | 'intermediate' | 'senior' | 'lead' // seniors and leads multiply the output of others, but at high cost
  spGeneration: number
  epGeneration: number
  rpGeneration: number
  specialEffects?: Effect
}

export type Upgrade = {
  name: Record<Language, string>
  description: Record<Language, string>
  rarity: Rarity
  level: number
  maxLevel: number
  effect: Effect

  // List<Modifier> modifiers = []; // mods that affect resource gain
  // List<ParamEventHandler> paramEventHandlers = []; // handlers that can stack more effects when a parameter's value has been changed
  // List<ActionEventHandler> eventHandlers = []; // handlers that can perform additional reductions when actions are taken
  // List<Modifier> contractModifiers = []; // mods that affect contract generation
  // List<Modifier> organizationModifiers = []; // mods that affect organization generation
  // bool owned = false;
  // int level = 0;
  // int getLevel() => level;
  // final int maxLevel;
  // final bool alwaysAppear; // Debug use only, can result in duplicates (see shuffleNextUpgrades)
}

export type Param =
  | 'turn'
  | 'money'
  | 'trust'
  | 'alignmentFocus'
  | 'asiOutcome'
  | 'influence'
  | 'rp'
  | 'ep'
  | 'sp'

export type Contract = {
  name: Record<Language, string>
  rarity: Rarity
  // acceptDescription: Record<Language, string>
  successDescription: Record<Language, string>
  requirementDescription: Record<Language, string>
  costDescription: Record<Language, string>
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
  name: Record<Language, string>
  description?: Record<Language, string>
  enabledCondition?: (gs: GameState) => boolean
  turnCost: number
  turnsInvested: number
  effect: Effect
  functionEffect?: (gs: GameState) => GameState
}

export type SingleEffect = {
  source?: string
  condition?: (gs: GameState, paramEffected: Param, baseAmount: number) => boolean
  paramEffected: Param
  amount: number
}

export type Effect = SingleEffect[]

// const initialOrganizations = [
//   Organization('Meta AI', -20, FeatureName.automation, 0),
//   Organization('Anthropic', -5, FeatureName.boundedness, 0),
//   Organization('Noeon', -20, FeatureName.interpretability, 0),
//   Organization('OpenAI', 10, FeatureName.strategy, 0),
//   Organization('DeepMind', 0, FeatureName.predictability, 0),
//   Organization('Deepseek', 0, FeatureName.predictability, 0),
//   Organization('Neuroqueen', 0, FeatureName.predictability, 0),
// ]
