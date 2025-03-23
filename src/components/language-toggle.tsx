import { languageToggleAction } from '../data/data-actions'
import { useGameState } from '../gamestate-hooks'

export const LanguageToggle = () => {
  const { gs, dispatch } = useGameState()

  // Get flag emoji based on current language
  const getLanguageFlag = (language: string) => {
    return language === 'en-US' ? '🇺🇸' : '🇯🇵'
  }

  return (
    <div className="language-toggle-section">
      <button className="language-toggle-button" onClick={() => dispatch(languageToggleAction)}>
        <span className="language-flag">{getLanguageFlag(gs.language)} </span>
        <span>{languageToggleAction.name[gs.language]}</span>
      </button>
    </div>
  )
}
