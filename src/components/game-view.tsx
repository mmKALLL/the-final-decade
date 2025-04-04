import { useGameState } from '../gamestate-hooks'
import { assertNever, getDateFromTurn, paramToLabel } from '../util'
import { GameOverScreen } from './screens/game-over-screen'
import { MainScreen } from './screens/main-screen'
import { SelectionScreen } from './screens/selection-screen/selection-screen'
import { VictoryScreen } from './screens/victory-screen'

export function GameView() {
  const { gs } = useGameState()

  return (
    <div className="app-container">
      <div className="game-header">
        <div className="date-display">{getDateFromTurn(gs.turn)}</div>
        <div className="game-meta">
          <div className="resource-pill">
            <span className="resource-icon">{paramToLabel('sp', gs.language)}</span>
            <span className="resource-value">{gs.sp}</span>
          </div>
          <div className="resource-pill">
            <span className="resource-icon">{paramToLabel('ep', gs.language)}</span>
            <span className="resource-value">{gs.ep}</span>
          </div>
          <div className="resource-pill">
            <span className="resource-icon">{paramToLabel('rp', gs.language)}</span>
            <span className="resource-value">{gs.rp}</span>
          </div>
          <div className="resource-pill">
            <span className="resource-icon">{paramToLabel('up', gs.language)}</span>
            <span className="resource-value">{gs.up}</span>
          </div>
        </div>
      </div>

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
