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

export type GameState = {
  currentScreen: 'main' | 'selection'

  turn: number // Each unit of time represents one month

  // 0-100. Public view of alignment. One of the win/loss conditions, influences what rate of org breakthroughs lead to alignment improvements. Second-order effect on asiOutcome.
  alignmentAcceptance: number

  // 0-100. Shifted whenever breakthroughs are made, by the level of the feature receiving the breakthrough. 0: capabilities win; misaligned ASI. 100: aligned ASI.
  asiOutcome: number

  // 0-200. Trust towards your organization. Gain or lose depending on how your fund/contract money is handled. If you have high trust you'll get better contracts
  trust: number

  // 0-200. Influence is a percentage multiplier to the effect of your social actions (like increasing alignment acceptance)
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

  humanSelections: []
  upgradeSelections: []
  contractSelections: []

  availableActions: Action[]
  recentActions: Action[]
  recentGS: GameState[]

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

export type Human = {
  name: string
  // description: string
  wage: number
  spGeneration: number
  epGeneration: number
  rpGeneration: number
  // specialEffects: Effect[]
}

export type Upgrade = {
  name: string
  description: string
  level: number
  maxLevel: number
  effects: Effect[]

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
  | 'alignmentAcceptance'
  | 'asiOutcome'
  | 'influence'
  | 'rp'
  | 'ep'
  | 'sp'
  | 'humanSelection'
  | 'upgradeSelection'
  | 'contractSelection'

export type Contract = {
  name: string
  acceptDescription: string
  successDescription: string
  failureDescription: string
  requirementDescription: string
  onAccept: Effect[]
  onSuccess: Effect[]
  // onFailure: Effect
  requirements: Effect[]
}

export type Action = {
  name: string
  description: string
  turnsInvested: number
  turnCost: number
  effects: Effect[]
  functionEffect?: (gs: GameState) => GameState
}

export type Effect = {
  paramEffected: Param
  apply: (value: number) => number
}

// const initialOrganizations = [
//   Organization('Meta AI', -20, FeatureName.automation, 0),
//   Organization('Anthropic', -5, FeatureName.boundedness, 0),
//   Organization('Noeon', -20, FeatureName.interpretability, 0),
//   Organization('OpenAI', 10, FeatureName.strategy, 0),
//   Organization('DeepMind', 0, FeatureName.predictability, 0),
//   Organization('Deepseek', 0, FeatureName.predictability, 0),
//   Organization('Neuroqueen', 0, FeatureName.predictability, 0),
// ]
