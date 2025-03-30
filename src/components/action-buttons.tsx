import { firstOrderActions, secondOrderActions, thirdOrderActions } from '../data/data-actions'
import { useGameState } from '../gamestate-hooks'
import { Button } from './button'
import { InfoTooltip } from './info-tooltip'

export function ActionButtons() {
  const { gs } = useGameState()

  return (
    <>
      <div className="action-section">
        <InfoTooltip>
          <>
            <p style={{ fontWeight: 'bold' }}>Action Types</p>
            <p>
              <span style={{ fontWeight: 'bold' }}>First-order:</span> Basic resource-generating actions that only have an opportunity cost
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Second-order:</span> Strategic actions to help you produce resources automatically
            </p>
            <p>
              <span style={{ fontWeight: 'bold' }}>Third-order:</span> Long-term impact actions affecting game outcome
            </p>
            <hr style={{ border: '0.5px solid rgba(80, 80, 120, 0.3)', margin: '0.5rem 0' }} />
            <p>Click on any action button to perform that action. All actions cost one turn (month), and have the written effect.</p>
          </>
        </InfoTooltip>

        <div className="section-header"></div>
        <h2>First-order actions:</h2>
        <div className="action-buttons">
          {firstOrderActions(gs).map((action, index) => (
            <Button key={`action-${index}`} action={action} />
          ))}
        </div>
        <h2>Second-order actions:</h2>
        <div className="action-buttons">
          {secondOrderActions(gs).map((action, index) => (
            <Button key={`action-${index}`} action={action} />
          ))}
        </div>
        <h2>Third-order actions:</h2>
        <div className="action-buttons">
          {thirdOrderActions(gs).map((action, index) => (
            <Button key={`action-${index}`} action={action} />
          ))}
        </div>
      </div>
    </>
  )
}
