import { Human } from '../../../types'
import { effectToString, rarityColors, seniorityMultipliers } from '../../../util'

export const HumanItem = ({ human, onSelect }: { human: Human; onSelect: () => void }) => {
  const getTeamBonus = (human: Human): string | null => {
    const bonus = seniorityMultipliers[human.rank]
    const resource = human.type

    return bonus > 1 ? `Increases ${resource} gain by ${Math.round((bonus - 1) * 100)}%` : null
  }

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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.3em' }}>
        <span>
          {human.name['en-US']} ({human.rank})
        </span>
        {getTeamBonus(human) && (
          <span
            style={{
              fontStyle: 'italic',
              fontSize: '0.9em',
              color: '#a0aec0',
              textAlign: 'left',
            }}
          >
            {getTeamBonus(human)}
          </span>
        )}
      </div>
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
