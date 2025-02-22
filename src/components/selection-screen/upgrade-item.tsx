import { Upgrade } from '../../types'

export const UpgradeItem = ({ upgrade, onSelect }: { upgrade: Upgrade; onSelect: () => void }) => {
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
        {upgrade.name['en-US']} (Lv. {upgrade.level}/{upgrade.maxLevel})
      </span>
      <span>
        {upgrade.effect.map((e) => (
          <>
            | ⚡ {e.amount} {e.paramEffected}
          </>
        ))}
      </span>
    </button>
  )
}
