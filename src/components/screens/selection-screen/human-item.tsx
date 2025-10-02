import { Human } from '../../../types'
import { effectToString, paramToLabel, rarityColors, seniorityMultipliers } from '../../../util'
import { useGameState } from '../../../gamestate-hooks'

export const HumanItem = ({ human, onSelect }: { human: Human; onSelect: () => void }) => {
  const { gs } = useGameState()
  const language = gs.language

  const getTeamBonus = (human: Human): string | null => {
    const bonus = seniorityMultipliers[human.rank]
    const resource = paramToLabel(human.type, language)

    if (bonus <= 1) return null

    return language === 'jp-FI'
      ? `${resource}の獲得量が${Math.round((bonus - 1) * 100)}%増加`
      : `Increases ${resource} gain by ${Math.round((bonus - 1) * 100)}%`
  }

  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '99%',
        maxWidth: '491px',
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
          {human.name[language]} (
          {language === 'jp-FI'
            ? {
                volunteer: 'ボランティア',
                junior: 'ジュニア',
                medior: 'ミディア',
                senior: 'シニア',
                coach: 'コーチ',
                lead: 'リード',
              }[human.rank]
            : human.rank}
          )
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
        💰 -{human.wage} / {language === 'jp-FI' ? '月' : 'month'} <br />
        💬 {human.spGeneration} / 🔧 {human.epGeneration} / 🧪 {human.rpGeneration}
        {human.specialEffect && (
          <>
            <br />
            {effectToString(human.specialEffect, language)}
          </>
        )}
      </span>
    </button>
  )
}
