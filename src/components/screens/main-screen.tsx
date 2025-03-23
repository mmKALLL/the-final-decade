import { firstOrderActions, secondOrderActions, thirdOrderActions } from '../../data/data-actions'
import { useGameState } from '../../gamestate-hooks'
import { BreakthroughList } from '../breakthrough-list'
import { Button } from '../button'
import { ContractList } from '../contract-list'
import { GameStateDisplay } from '../game-state-display'
import { LanguageToggle } from '../language-toggle'

export const MainScreen = () => {
  const { gs } = useGameState()

  return (
    <div className="main-screen">
      <div className="action-section">
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

      <GameStateDisplay />
      <ContractList editable={true} />
      <BreakthroughList editable={true} />
      <LanguageToggle />
    </div>
  )
}
