import { Breakthrough } from '../../../types'
import { rarityColors } from '../../../util'

export const BreakthroughItem = ({ breakthrough, onSelect }: { breakthrough: Breakthrough; onSelect: () => void }) => {
  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '96vw',
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
        {breakthrough.name['en-US']} (Level {breakthrough.level}/{breakthrough.maxLevel})
        <br />
        {breakthrough.description['en-US'](breakthrough.level + 1)}
      </span>
    </button>
  )
}
