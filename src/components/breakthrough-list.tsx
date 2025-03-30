import { useState } from 'preact/hooks'
import { Breakthrough } from '../types'
import { levelUpCost, rarityColors } from '../util'
import { useGameState } from '../gamestate-hooks'
import { levelUpBreakthroughAction } from '../data/data-actions'
import { InfoTooltip } from './info-tooltip'

interface BreakthroughListProps {
  editable: boolean
}

export const BreakthroughList = ({ editable }: BreakthroughListProps) => {
  const { gs, dispatch } = useGameState()
  const [showNextLevel, setShowNextLevel] = useState(false)

  // Only show if there are breakthroughs to display
  if (gs.breakthroughs.length === 0) return null

  const handleLevelUp = (breakthrough: Breakthrough) => {
    if (!editable) return
    if (breakthrough.level >= breakthrough.maxLevel) return

    dispatch(levelUpBreakthroughAction(breakthrough))
  }

  return (
    <div className="breakthrough-section">
      <div className="section-header">
        <h2>Breakthroughs</h2>
        <InfoTooltip>
          <>
            <p style={{ fontWeight: 'bold' }}>Breakthroughs</p>
            <p>Breakthroughs are advanced technologies that provide ongoing bonuses to your organization.</p>
            <p>Each breakthrough can be leveled up to increase its effectiveness.</p>
            <hr style={{ border: '0.5px solid rgba(80, 80, 120, 0.3)', margin: '0.5rem 0' }} />
            <p>Rarity levels:</p>
            <p>
              <span style={{ color: rarityColors.common }}>■</span> <span style={{ fontWeight: 'bold' }}>Common:</span> Basic improvements
            </p>
            <p>
              <span style={{ color: rarityColors.uncommon }}>■</span> <span style={{ fontWeight: 'bold' }}>Uncommon:</span> Specialized
              enhancements
            </p>
            <p>
              <span style={{ color: rarityColors.rare }}>■</span> <span style={{ fontWeight: 'bold' }}>Rare:</span> Powerful technologies
            </p>
            <p>
              <span style={{ color: rarityColors.epic }}>■</span> <span style={{ fontWeight: 'bold' }}>Epic:</span> Game-changing
              innovations
            </p>
            <hr style={{ border: '0.5px solid rgba(80, 80, 120, 0.3)', margin: '0.5rem 0' }} />
            <p>
              <span style={{ background: 'rgba(90, 50, 70, 0.7)', padding: '0 0.3rem' }}>Purple background</span> indicates max-level
              breakthroughs
            </p>
            {editable && <p>Click any non-max breakthrough to level it up.</p>}
          </>
        </InfoTooltip>
      </div>

      {editable && (
        <div className="toggle-container">
          <button className="toggle-button" onClick={() => setShowNextLevel(!showNextLevel)}>
            {showNextLevel ? 'Show Current Level' : 'Preview Next Level'}
          </button>
        </div>
      )}

      <div className="breakthroughs-grid">
        {gs.breakthroughs.map((breakthrough) => {
          const isMaxLevel = breakthrough.level >= breakthrough.maxLevel
          const displayLevel = showNextLevel && !isMaxLevel ? breakthrough.level + 1 : breakthrough.level

          return (
            <div
              key={breakthrough.id}
              className={`breakthrough-card ${isMaxLevel ? 'max-level' : ''} ${editable ? 'editable' : ''}`}
              style={{ borderColor: rarityColors[breakthrough.rarity] }}
              onClick={() => handleLevelUp(breakthrough)}
            >
              <div className="breakthrough-header">
                <div className="breakthrough-title">{breakthrough.name[gs.language]}</div>
                <div className="breakthrough-level">
                  Level
                  {breakthrough.level < breakthrough.maxLevel ? ` ${breakthrough.level}/${breakthrough.maxLevel}` : ' MAX'}
                </div>
              </div>
              <div className="breakthrough-description">
                {breakthrough.description[gs.language](displayLevel)}

                {editable && !isMaxLevel && (
                  <div className="level-up-info">
                    {`Tap to level up (costs ${levelUpCost(breakthrough)} UP).` +
                      (showNextLevel ? ` Showing level ${displayLevel} effect.` : '')}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
