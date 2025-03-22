import { Breakthrough } from '../../../types'
import { rarityColors } from '../../../util'

export const BreakthroughItem = ({ breakthrough, onSelect }: { breakthrough: Breakthrough; onSelect: () => void }) => {
  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
      <span>
        {breakthrough.name['en-US']} (Lv. {breakthrough.level}/{breakthrough.maxLevel})
      </span>
      <span>
        {breakthrough.effect.map((e) => (
          <>
            | ⚡ {e.amount} {e.paramEffected}
          </>
        ))}
      </span>
    </button>
  )
}
