import { Breakthrough } from '../../../types'
import { rarityColors } from '../../../util'
import { useGameState } from '../../../gamestate-hooks'

export const BreakthroughItem = ({ breakthrough, onSelect }: { breakthrough: Breakthrough; onSelect: () => void }) => {
  const { gs } = useGameState()
  const language = gs.language

  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '99%',
        maxWidth: '491px',
        backgroundColor: '#222',
        border: `1px solid ${rarityColors[breakthrough.rarity]}`,
        borderRadius: '6px',
        padding: '6px',
        color: breakthrough.rarity === 'common' ? rarityColors.common : '#fff',
        cursor: 'pointer',
        fontSize: '0.85em',
      }}
    >
      <span style={{ textAlign: 'left', lineHeight: '1.5' }}>
        {breakthrough.name[language]} ({language === 'jp-FI' ? 'レベル' : 'Level'} {breakthrough.level}/{breakthrough.maxLevel})
        <br />
        {breakthrough.description[language](breakthrough.level + 1)}
      </span>
    </button>
  )
}
