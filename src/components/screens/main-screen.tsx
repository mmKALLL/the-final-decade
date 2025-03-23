import { firstOrderActions, languageToggleAction, secondOrderActions, thirdOrderActions } from '../../data/data-actions'
import { useGameState } from '../../gamestate-hooks'
import { Button } from '../button'
import { ContractList } from '../contract-list'
import { GameStateDisplay } from '../game-state-display'

export const MainScreen = () => {
  const { gs, dispatch } = useGameState()

  // Get flag emoji based on current language
  const getLanguageFlag = (language: string) => {
    return language === 'en-US' ? '🇺🇸' : '🇯🇵'
  }

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

      {/* Language toggle section at the bottom */}
      <div className="language-toggle-section">
        <button className="language-toggle-button" onClick={() => dispatch(languageToggleAction)}>
          <span className="language-flag">{getLanguageFlag(gs.language)} </span>
          <span>{languageToggleAction.name[gs.language]}</span>
        </button>
      </div>
    </div>
  )
}
