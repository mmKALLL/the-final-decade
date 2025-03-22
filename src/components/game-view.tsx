import { useGameState } from '../gamestate-hooks'
import { assertNever, getDateFromTurn } from '../util'
import { GameOverScreen } from './game-over-screen'
import { MainScreen } from './main-screen'
import { SelectionScreen } from './selection-screen/selection-screen'
import { VictoryScreen } from './victory-screen'

export function GameView() {
  const { gs } = useGameState()

  return (
    <div className="app-container">
      <div className="game-header">
        <div className="date-display">{getDateFromTurn(gs.turn)}</div>
        <div className="game-meta">
          <div className="resource-pill">
            <span className="resource-icon">SP</span>
            <span className="resource-value">{gs.sp}</span>
          </div>
          <div className="resource-pill">
            <span className="resource-icon">EP</span>
            <span className="resource-value">{gs.ep}</span>
          </div>
          <div className="resource-pill">
            <span className="resource-icon">RP</span>
            <span className="resource-value">{gs.rp}</span>
          </div>
          <div className="resource-pill">
            <span className="resource-icon">UP</span>
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
          <GameOverScreen gs={gs} turn={gs.turn} />
        ) : gs.currentScreen === 'victory' ? (
          <VictoryScreen gs={gs} />
        ) : (
          assertNever(gs.currentScreen)
        )}
      </div>
    </div>
  )
}
