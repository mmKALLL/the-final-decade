import { Human } from '../../../types'
import { effectToString } from '../../../util'

export const HumanItem = ({ human, onSelect }: { human: Human; onSelect: () => void }) => {
  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#333',
        border: '1px solid #FFD700',
        borderRadius: '6px',
        padding: '6px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '0.85em',
      }}
    >
      <span>
        {human.name['en-US']} ({human.rank})
      </span>
      <span>
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
