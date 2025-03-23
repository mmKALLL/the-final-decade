import { getMoneyGain, useGameState } from '../gamestate-hooks'
import { calculateResourceProduction } from '../util'
import { formatValue } from '../util'

export function GameStateDisplay() {
  const { gs } = useGameState()

  // Get resource production details
  const resourceProduction = calculateResourceProduction(gs)

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

  return (
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
  )
}
