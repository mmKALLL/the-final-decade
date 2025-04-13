import { useGameState } from '../gamestate-hooks'
import { assertNever } from '../util'
import { GameOverScreen } from './screens/game-over-screen'
import { MainScreen } from './screens/main-screen'
import { SelectionScreen } from './screens/selection-screen/selection-screen'
import { VictoryScreen } from './screens/victory-screen'
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
        ) : gs.currentScreen === 'game-over' ? (
          <GameOverScreen />
        ) : gs.currentScreen === 'victory' ? (
          <VictoryScreen />
        ) : (
          assertNever(gs.currentScreen)
        )}
      </div>
    </div>
  )
}
