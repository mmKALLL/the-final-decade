import { Human } from '../../../types'
import { effectToString, rarityColors } from '../../../util'

export const HumanItem = ({ human, onSelect }: { human: Human; onSelect: () => void }) => {
  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '96vw',
        backgroundColor: '#333',
        border: `1px solid ${rarityColors[human.rarity]}`,
        borderRadius: '6px',
        padding: '6px',
        color: human.rarity === 'common' ? rarityColors.common : '#fff',
        cursor: 'pointer',
        fontSize: '0.85em',
      }}
    >
      <span>
        {human.name['en-US']} ({human.rank})
      </span>
      <span className="human-item-stats" style={{ lineHeight: 1.5 }}>
        💰 -{human.wage} / month <br /> 💬 {human.spGeneration} / 🔧 {human.epGeneration} / 🧪 {human.rpGeneration}
        {human.specialEffect && (
          <>
            <br />
            {effectToString(human.specialEffect)}
          </>
        )}
        {/** gear: ⚙️ */}
      </span>
    </button>
  )
}
