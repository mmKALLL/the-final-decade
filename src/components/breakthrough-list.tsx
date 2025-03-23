import { useState } from 'preact/hooks'
import { Breakthrough } from '../types'
import { levelUpCost, rarityColors } from '../util'
import { useGameState } from '../gamestate-hooks'
import { levelUpBreakthroughAction } from '../data/data-actions'

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
      <h2>Breakthroughs</h2>

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
                    {`Click to level up (costs ${levelUpCost(breakthrough)} UP).` +
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
