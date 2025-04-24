import { useGameState } from '../gamestate-hooks'
import { assertNever } from '../util'
import { GameEndScreen } from './screens/game-end-screen'
import { MainScreen } from './screens/main-screen'
import { SelectionScreen } from './screens/selection-screen/selection-screen'
import { TopBar } from './top-bar'

export function GameView() {
  const { gs } = useGameState()

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
