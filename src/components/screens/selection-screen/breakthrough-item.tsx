import { Breakthrough } from '../../../types'

export const BreakthroughItem = ({ breakthrough, onSelect }: { breakthrough: Breakthrough; onSelect: () => void }) => {
  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#222',
        border: '1px solid #00BFFF',
        borderRadius: '6px',
        padding: '6px',
        color: '#fff',
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
