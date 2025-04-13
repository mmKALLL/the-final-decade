import { useGameState } from '../gamestate-hooks'
import { getDateFromTurn, paramToLabel } from '../util'
import { ContractItem } from './contract-item'

export function TopBar() {
  const { gs } = useGameState()

  if (gs.currentScreen === 'game-over' || gs.currentScreen === 'victory') {
    return null
  }

  // Get the first yearly goal to display
  const currentYearlyGoal = gs.yearlyContracts.length > 0 ? gs.yearlyContracts[0] : null

  return (
    <div className="top-bar-wrapper">
      <div className="top-bar-first-row">
        <div className="date-display">{getDateFromTurn(gs.turn)}</div>
        <div className="top-bar-resource-wrapper">
          <div className="resource-pill">
            <span className="resource-icon">💰</span>
            <span className="resource-value">{gs.money}</span>
          </div>
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
      {currentYearlyGoal && (
        <div className="top-bar-yearly-goal">
          {gs.turn === 0 && (gs.humanSelections.length > 0 || gs.breakthroughSelections.length > 0) ? (
            <span className="top-bar-tutorial-text">
              Select {3 - gs.humanSelections.length}/3 humans and {1 - gs.breakthroughSelections.length}/1 breakthroughs.
              <br />
              <br />
              After that, complete the goal that appears here.
              <br />
              Each turn represents one month.
            </span>
          ) : (
            <ContractItem contract={currentYearlyGoal} editable={false} index={0} language={gs.language} key="top-bar-yearly-goal" />
          )}
        </div>
      )}
    </div>
  )
}
