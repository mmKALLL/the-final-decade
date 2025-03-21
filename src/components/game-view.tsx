import { useGameState } from '../gamestate-hooks'
import { assertNever } from '../util'
import { MainScreen } from './main-screen'
import { SelectionScreen } from './selection-screen/selection-screen'

export function GameView() {
  const { gs } = useGameState()

  // Convert turn to date format (2025 Jan + months)
  const getDateFromTurn = (turn: number) => {
    const startYear = 2025
    const year = startYear + Math.floor(turn / 12)
    const month = (turn % 12) + 1

    return `${year}-${month < 10 ? '0' : ''}${month}`
  }

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
        ) : (
          assertNever(gs.currentScreen)
        )}
      </div>
    </div>
  )
}
