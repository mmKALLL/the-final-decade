import { getMoneyGain, useGameState } from '../gamestate-hooks'
import { calculateResourceProduction, paramToLabel, withPlusSign } from '../util'
import { formatValue } from '../util'
import { InfoTooltip } from './info-tooltip'

export function ResourceDisplay() {
  const { gs } = useGameState()
  const language = gs.language

  // Get resource production details
  const resourceProduction = calculateResourceProduction(gs)
  const moneyGain = getMoneyGain(gs)

  // Create more compact category names for mobile with descriptions
  const compactCategories = {
    [language === 'jp-FI' ? 'フィナンシャル' : 'Finance']: {
      [language === 'jp-FI' ? '収入' : 'Income']: {
        value: withPlusSign(moneyGain.income),
        desc: language === 'jp-FI' ? '毎ターンのお金の変化' : 'Passive change to money each turn',
      },
      [language === 'jp-FI' ? '給料' : 'Wages']: {
        value: `-${moneyGain.wages} * ${moneyGain.wageMultiplier.toFixed(2)} = -${moneyGain.totalWages}`,
        desc: language === 'jp-FI' ? '毎ターン人間に支払われるお金' : 'Money paid to humans each turn',
      },
    },
    [language === 'jp-FI' ? 'スーパーインテリジェンス' : 'Superintelligence']: {
      [paramToLabel('asiOutcome', language)]: {
        value: gs.asiOutcome,
        desc: language === 'jp-FI' ? 'AI整合性の進捗 (0-100)' : 'Progress toward aligned AI (0-100)',
      },
      [paramToLabel('publicUnity', language)]: {
        value: gs.publicUnity,
        desc: language === 'jp-FI' ? '毎ターンのASI結果への変化' : 'Change to ASI outcome each turn',
      },
    },
    [language === 'jp-FI' ? 'チーム' : 'Team']: {
      '💬 / turn': {
        value: `${resourceProduction.sp.base} * ${resourceProduction.sp.multiplier} = ${resourceProduction.sp.total}`,
        desc: language === 'jp-FI' ? '採用のためのソーシャルポイント' : 'Social Points for recruiting',
      },
      '🔧 / turn': {
        value: `${resourceProduction.ep.base} * ${resourceProduction.ep.multiplier} = ${resourceProduction.ep.total}`,
        desc: language === 'jp-FI' ? '契約のためのエンジニアリングポイント' : 'Engineering Points for contracts',
      },
      '🧪 / turn': {
        value: `${resourceProduction.rp.base} * ${resourceProduction.rp.multiplier} = ${resourceProduction.rp.total}`,
        desc: language === 'jp-FI' ? 'ブレークスルーのためのリサーチポイント' : 'Research Points for breakthroughs',
      },
    },
  }

  // Check if a statistic is in a danger zone
  const getDangerStyle = (key: string, value: any) => {
    // Only apply danger highlighting to specific stats
    const dangerStats = ['money', 'お金', 'trust', '信頼', 'influence', '影響力', 'outcome', 'ASI結果']

    if (!dangerStats.includes(key)) return {}

    let numericValue: number

    // Extract numeric values from strings like "10 * 1.2 = 12"
    if (typeof value === 'string' && value.includes('=')) {
      const parts = value.split('=')
      numericValue = parseFloat(parts[parts.length - 1].trim())
    } else {
      numericValue = typeof value === 'number' ? value : 0
    }

    if (numericValue < (key === 'money' || key === 'お金' ? 20 : 10)) {
      return { backgroundColor: 'rgba(220, 38, 38, 0.5)' } // Red
    } else if (numericValue < (key === 'money' || key === 'お金' ? 50 : 25)) {
      return { backgroundColor: 'rgba(255, 179, 8, 0.3)' } // Yellow
    }

    return {}
  }

  return (
    <div className="game-state-section section">
      <InfoTooltip>
        <>
          <p>{language === 'jp-FI' ? '統計の色は危険レベルを示します：' : 'Stat colors indicate danger levels:'}</p>
          <p>
            <span style={{ color: 'rgba(234, 179, 8, 1)' }}>{language === 'jp-FI' ? '黄色' : 'Yellow'}</span>:
            <span>{language === 'jp-FI' ? ' 統計で25未満（警告）' : ' Below 25 (50 for money)'}</span>
          </p>
          <p>
            <span style={{ color: 'rgba(220, 38, 38, 1)' }}>{language === 'jp-FI' ? '赤' : 'Red'}</span>:
            <span>{language === 'jp-FI' ? ' 統計で10未満（危機的）' : ' Below 10 (20 for money)'}</span>
          </p>
          <hr style={{ border: '0.5px solid rgba(80, 80, 120, 0.3)', margin: '0.5rem 0' }} />
          <p style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>{language === 'jp-FI' ? '統計の説明：' : 'Stat Descriptions:'}</p>
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
      <div className="stat-categories">
        {Object.entries(compactCategories).map(([category, stats], index) => (
          <div className="stat-category" key={`category-${category}`}>
            <h3 className="category-title" style={{ display: index === 0 ? 'inline-block' : 'block' }}>
              {category}
            </h3>
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
