import { firstOrderActions, languageToggleAction, secondOrderActions, thirdOrderActions } from '../../data/data-actions'
import { useGameState } from '../../gamestate-hooks'
import { Button } from '../button'
import { ContractList } from '../contract-list'

export const MainScreen = () => {
  const { gs, dispatch } = useGameState()

  // Format value display to be more readable
  const formatValue = (value: any) => {
    if (typeof value === 'number') {
      return value
    }
    if (Array.isArray(value)) {
      return value.length // Just show the count for arrays
    }
    return JSON.stringify(value)
  }

  // Create more compact category names for mobile
  const compactCategories = {
    Resources: {
      money: gs.money,
      'passive income': gs.passiveIncome,
    },
    Organization: {
      influence: gs.influence,
      trust: gs.trust,
    },
    ASI: {
      outcome: gs.asiOutcome,
      'public unity': gs.publicUnity,
    },
    Team: {
      humans: gs.humans.length,
      breakthroughs: gs.breakthroughs.length,
    },
  }

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

      <div className="game-state-section">
        <div className="stat-categories">
          {Object.entries(compactCategories).map(([category, stats]) => (
            <div className="stat-category" key={`category-${category}`}>
              <h3 className="category-title">{category}</h3>
              <div className="game-state-grid">
                {Object.entries(stats).map(([key, value]) => (
                  <div className="stat-card" key={`stat-${category}-${key}`}>
                    <div className="stat-name">{key}</div>
                    <div className="stat-value">{formatValue(value)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

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
