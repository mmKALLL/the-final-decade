import { useGameState } from '../gamestate-hooks'
import { InfoTooltip } from './info-tooltip'
import { ContractItem } from './contract-item'

export const YearlyGoalList = () => {
  const { gs } = useGameState()
  const { yearlyContracts, language } = gs

  return (
    <div className="contract-section section">
      <InfoTooltip>
        <>
          <p style={{ fontWeight: 'bold' }}>Yearly Goals</p>
          <p>These are special contracts that appear at the start of each game.</p>
          <p>
            Yearly goals cannot be selected directly - they are completed automatically at the end of each year. Failing to meet their
            requirements will result in a game over.
          </p>
          <p>Yearly goals provide significant challenges and bonuses that shape your long-term strategy.</p>
        </>
      </InfoTooltip>
      <div className="section-header">
        <h2>Yearly Goals</h2>
      </div>
      <div className="contracts-grid">
        {yearlyContracts.map((contract, index) => (
          <ContractItem key={`yearly-contract-${index}`} contract={contract} language={language} editable={false} index={index} />
        ))}
      </div>
    </div>
  )
}
