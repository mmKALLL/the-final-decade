import { Human } from '../../types'

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
        💰 {human.wage} | ⚙️ {human.spGeneration} / 🔧 {human.epGeneration} / 📜 {human.rpGeneration}
      </span>
    </button>
  )
}
