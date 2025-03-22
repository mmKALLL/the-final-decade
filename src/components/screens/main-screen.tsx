import { firstOrderActions, languageToggleAction, secondOrderActions, thirdOrderActions } from '../../data/data-actions'
import { getMoneyGain, useGameState } from '../../gamestate-hooks'
import { Button } from '../button'
import { ContractList } from '../contract-list'

export const MainScreen = () => {
  const { gs, dispatch } = useGameState()

  // Format value display to be more readable
  const formatValue = (value: any) => {
    if (typeof value === 'number' || typeof value === 'string') {
      return value
    }
    if (Array.isArray(value)) {
      return value.length // Just show the count for arrays
    }
    return JSON.stringify(value)
  }

  // Calculate team multipliers based on senior and lead ranks
  const calculateTeamMultipliers = () => {
    const seniors = gs.humans.filter((human) => human.rank === 'senior').length
    const leads = gs.humans.filter((human) => human.rank === 'lead').length

    // Seniors give 10% boost per senior, Leads give 25% boost per lead. The boosts are multiplicative.
    return Math.pow(1.1, seniors) * Math.pow(1.25, leads)
  }

  // Calculate resource production broken down by type
  const calculateResourceProduction = () => {
    const baseSpProduction = gs.humans.reduce((acc, human) => acc + human.spGeneration, 0)
    const baseEpProduction = gs.humans.reduce((acc, human) => acc + human.epGeneration, 0)
    const baseRpProduction = gs.humans.reduce((acc, human) => acc + human.rpGeneration, 0)

    const teamMultiplier = calculateTeamMultipliers()

    const totalSpProduction = Math.round(baseSpProduction * teamMultiplier)
    const totalEpProduction = Math.round(baseEpProduction * teamMultiplier)
    const totalRpProduction = Math.round(baseRpProduction * teamMultiplier)

    return {
      sp: { base: baseSpProduction, multiplier: teamMultiplier.toFixed(1), total: totalSpProduction },
      ep: { base: baseEpProduction, multiplier: teamMultiplier.toFixed(1), total: totalEpProduction },
      rp: { base: baseRpProduction, multiplier: teamMultiplier.toFixed(1), total: totalRpProduction },
    }
  }

  // Get resource production details
  const resourceProduction = calculateResourceProduction()

  // Create more compact category names for mobile
  const compactCategories = {
    Resources: {
      money: gs.money,
      'passive income': getMoneyGain(gs),
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
      breakthroughs: gs.breakthroughs.length,
      'SP gain': `${resourceProduction.sp.base} * ${resourceProduction.sp.multiplier} = ${resourceProduction.sp.total}`,
      'EP gain': `${resourceProduction.ep.base} * ${resourceProduction.ep.multiplier} = ${resourceProduction.ep.total}`,
      'RP gain': `${resourceProduction.rp.base} * ${resourceProduction.rp.multiplier} = ${resourceProduction.rp.total}`,
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
