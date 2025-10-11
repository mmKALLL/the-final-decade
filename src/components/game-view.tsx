import { useEffect } from 'preact/hooks'
import { useGameState } from '../gamestate-hooks'
import { assertNever } from '../util'
import { GameEndScreen } from './screens/game-end-screen'
import { MainScreen } from './screens/main-screen'
import { SelectionScreen } from './screens/selection-screen/selection-screen'
import { TopBar } from './top-bar'
import { loadConfig, loadGame } from '../savegame-util'

export function GameView() {
  const { gs, dispatch } = useGameState()

  useEffect(() => {
    const loadedSave = loadGame()
    console.log('Loaded save:', loadedSave)

    const config = loadConfig()
    console.log('Loaded config:', config)

    if (loadedSave || config) {
      dispatch({
        eventId: 'internalStateChange',
        name: { 'en-US': 'Game loaded', 'jp-FI': 'ゲームがロードされました' },
        turnCost: 0,
        turnsInvested: 0,
        effect: [],
        functionEffect: (gs) => {
          return {
            ...gs,
            ...loadedSave,
            ...config,
          }
        },
      })
    }
  }, [])

  return (
    <div className="app-container">
      <TopBar />
      <div className="game-content">
        {gs.currentScreen === 'main' ? (
          <MainScreen />
        ) : gs.currentScreen === 'selection' ? (
          <SelectionScreen />
        ) : gs.currentScreen === 'game-over' || gs.currentScreen === 'victory' ? (
          <GameEndScreen />
        ) : (
          assertNever(gs.currentScreen)
        )}
      </div>
    </div>
  )
}
