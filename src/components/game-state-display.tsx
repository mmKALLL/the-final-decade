import { getMoneyGain, useGameState } from '../gamestate-hooks'
import { calculateResourceProduction } from '../util'
import { formatValue } from '../util'
import { InfoTooltip } from './info-tooltip'

export function GameStateDisplay() {
  const { gs } = useGameState()

  // Get resource production details
  const resourceProduction = calculateResourceProduction(gs)
  const moneyGain = getMoneyGain(gs)

  // Create more compact category names for mobile with descriptions
  const compactCategories = {
    Resources: {
      money: { value: gs.money, desc: 'Funds for hiring and actions' },
      income: { value: moneyGain.total, desc: 'Change to money each turn' },
    },
    Organization: {
      influence: { value: gs.influence, desc: 'Multiplier for social actions' },
      trust: { value: gs.trust, desc: 'Better contracts and cheaper recruits' },
    },
    ASI: {
      outcome: { value: gs.asiOutcome, desc: 'Progress toward aligned AI (0-100)' },
      'public unity': { value: gs.publicUnity, desc: 'Change to ASI outcome each turn' },
    },
    Team: {
      'SP gain': {
        value: `${resourceProduction.sp.base} * ${resourceProduction.sp.multiplier} = ${resourceProduction.sp.total}`,
        desc: 'Social Points for recruiting',
      },
      'EP gain': {
        value: `${resourceProduction.ep.base} * ${resourceProduction.ep.multiplier} = ${resourceProduction.ep.total}`,
        desc: 'Engineering Points for contracts',
      },
      'RP gain': {
        value: `${resourceProduction.rp.base} * ${resourceProduction.rp.multiplier} = ${resourceProduction.rp.total}`,
        desc: 'Research Points for breakthroughs',
      },
      wages: {
        value: `-${moneyGain.wages} * ${moneyGain.multiplier.toFixed(2)} = -${moneyGain.totalWages}`,
        desc: 'Money paid to humans each turn',
      },
    },
  }

  // Check if a statistic is in a danger zone
  const getDangerStyle = (key: string, value: any) => {
    // Only apply danger highlighting to specific stats
    const dangerStats = ['money', 'trust', 'influence', 'outcome']

    if (!dangerStats.includes(key)) return {}

    let numericValue: number

    // Extract numeric values from strings like "10 * 1.2 = 12"
    if (typeof value === 'string' && value.includes('=')) {
      const parts = value.split('=')
      numericValue = parseFloat(parts[parts.length - 1].trim())
    } else {
      numericValue = typeof value === 'number' ? value : 0
    }

    if (numericValue < 10) {
      return { backgroundColor: 'rgba(220, 38, 38, 0.5)' } // Red
    } else if (numericValue < 25) {
      return { backgroundColor: 'rgba(255, 179, 8, 0.3)' } // Yellow
    }

    return {}
  }

  return (
    <div className="game-state-section">
      <div className="stat-categories">
        {Object.entries(compactCategories).map(([category, stats], index) => (
          <div className="stat-category" key={`category-${category}`}>
            <h3 className="category-title" style={{ display: index === 0 ? 'inline-block' : 'block' }}>
              {category}
            </h3>
            {index === 0 && (
              <InfoTooltip>
                <>
                  <p>Stat colors indicate danger levels:</p>
                  <p>
                    <span style={{ color: 'rgba(234, 179, 8, 1)' }}>Yellow</span>: Below 25 (Warning)
                  </p>
                  <p>
                    <span style={{ color: 'rgba(220, 38, 38, 1)' }}>Red</span>: Below 10 (Critical)
                  </p>
                  <hr style={{ border: '0.5px solid rgba(80, 80, 120, 0.3)', margin: '0.5rem 0' }} />
                  <p style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>Stat Descriptions:</p>
                  {Object.entries(compactCategories).map(([cat, items]) => (
                    <div key={`tooltip-${cat}`} style={{ marginBottom: '0.5rem' }}>
                      <p style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>{cat}</p>
                      {Object.entries(items).map(([key, item]) => (
                        <p key={`tooltip-${cat}-${key}`} style={{ margin: '0.1rem 0', fontSize: '0.65rem' }}>
                          <span style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{key}</span>: {item.desc}
                        </p>
                      ))}
                    </div>
                  ))}
                </>
              </InfoTooltip>
            )}
            <div className="game-state-grid">
              {Object.entries(stats).map(([key, item]) => (
                <div className="stat-card" key={`stat-${category}-${key}`} style={getDangerStyle(key, item.value)} title={item.desc}>
                  <div className="stat-name">{key}</div>
                  <div className="stat-value">{formatValue(item.value)}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
