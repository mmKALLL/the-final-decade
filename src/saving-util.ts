import { breakthroughs } from './data/data-breakthroughs'
import { initialConfig } from './data/data-gamestate'
import type { Breakthrough, Config, GameState } from './types'

const purgeBreakthroughFunctions = (breakthrough: Partial<Breakthrough>) => {
  // Delete everything that may contain a function; crucially, selected state and current level are not touched
  delete breakthrough.actionEventHandlers
  delete breakthrough.paramEventHandlers
  delete breakthrough.functionEffect
  delete breakthrough.modifiers
  delete breakthrough.effect
  delete breakthrough.description

  return breakthrough
}

const restoreBreakthrough = (breakthrough: Breakthrough): Breakthrough => {
  const initialBreakthrough = breakthroughs.find((b) => b.id === breakthrough.id)
  if (!initialBreakthrough) throw new Error(`Could not find initial breakthrough data for id=${breakthrough.id}`)

  // Initialize the breakthrough with any missing props
  return { ...initialBreakthrough, ...breakthrough }
}

const fromGameStateToSave = (gameState: GameState) => {
  const deepCopy: GameState = JSON.parse(JSON.stringify(gameState))
  deepCopy.breakthroughs.map((b, i) => purgeBreakthroughFunctions(b) as Breakthrough)
  deepCopy.breakthroughSelections.map((bs) => bs.map((b) => purgeBreakthroughFunctions(b) as Breakthrough))

  return deepCopy
}

const fromSaveToGameState = (save: string): GameState => {
  const parsed: GameState = JSON.parse(save)

  // Re-add removed properties and functions
  parsed.breakthroughs = parsed.breakthroughs.map((b) => restoreBreakthrough(b))
  parsed.breakthroughSelections = parsed.breakthroughSelections.map((bs) => bs.map((b) => restoreBreakthrough(b)))

  return parsed
}

export const saveGame = (gameState: GameState): void => {
  const serializedState = JSON.stringify(fromGameStateToSave(gameState))
  console.log('saved game on turn', gameState.turn)
  localStorage.setItem('gameState', serializedState)

  const config = loadConfig()
  if (config) {
    saveConfig({ ...config, language: gameState.language })
  }
}

export const loadGame = (): GameState | null => {
  const serializedState = localStorage.getItem('gameState')
  if (!serializedState) return null

  try {
    return fromSaveToGameState(serializedState)
  } catch (e) {
    console.error('Error loading save:', e)
    return null
  }
}

export const clearSaveAndReset = (gs: GameState): void => {
  // Update run history before resetting
  const config = loadConfig()
  if (config && gs.turn > 4) {
    saveConfig({
      ...config,
      runHistory: [
        ...config.runHistory,
        { date: new Date().toISOString(), turns: gs.turn, victory: gs.currentScreen === 'victory', gs: fromGameStateToSave(gs) },
      ],
    })
  }

  localStorage.removeItem('gameState')
  window.location.reload() // Reload to reset the game state
}

export const saveConfig = (config: Config): void => {
  const serializedConfig = JSON.stringify(config)
  localStorage.setItem('config', serializedConfig)
}

export const loadConfig = (): Config | null => {
  const serializedConfig = localStorage.getItem('config')
  if (!serializedConfig) return initialConfig

  try {
    return JSON.parse(serializedConfig)
  } catch (e) {
    console.error('Error loading config:', e)
    return null
  }
}
