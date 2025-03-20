import { languageToggleAction } from '../data/data-gamestate'
import { useGameState } from '../gamestate-hooks'
import { Button } from './button'
import { ContractList } from './contract-list'

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
      'passive income': gs.passiveMoneyGain,
    },
    Organization: {
      trust: gs.trust,
      influence: gs.influence,
    },
    ASI: {
      outcome: gs.asiOutcome,
      'public opinion': gs.publicOpinion,
    },
    Team: {
      humans: gs.humans.length,
      upgrades: gs.upgrades.length,
    },
  }

  // Filter out Toggle language action since it's now in the footer
  const filteredActions = gs.availableActions.filter((action) => !action.name[gs.language].includes('Toggle language'))

  // Get flag emoji based on current language
  const getLanguageFlag = (language: string) => {
    return language === 'en-US' ? '🇺🇸' : '🇯🇵'
  }

  return (
    <div className="main-screen">
      <div className="action-section">
        <h2>Available actions:</h2>
        <div className="action-buttons">
          {filteredActions.map((action, index) => (
            <Button key={`action-${index}`} action={action} />
          ))}
        </div>
      </div>

      <div className="game-state-section">
        <h2>Game state:</h2>
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

      <ContractList />

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
