import { useGameState } from '../gamestate-hooks'
import { getDateFromTurn, paramToLabel } from '../util'

export function TopBar() {
  const { gs } = useGameState()
  return (
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
  )
}
