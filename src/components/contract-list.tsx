import { useGameState } from '../gamestate-hooks'
import { Contract, YearlyContract } from '../types'
import { capitalize } from '../util'
import { convertContractToAction } from '../data/data-actions'
import { InfoTooltip } from './info-tooltip'

// Type guard to check if a contract is a YearlyContract
function isYearlyContract(contract: Contract | YearlyContract): contract is YearlyContract {
  return 'year' in contract
}

export const ContractList = ({ editable }: { editable: boolean }) => {
  const { gs } = useGameState()
  const { contracts, yearlyContracts, language } = gs

  return (
    <>
      <div className="contract-section">
        <div className="section-header">
          <h2>Contracts - {editable ? 'tap to complete' : 'view only'}</h2>
          <InfoTooltip>
            <>
              <p style={{ fontWeight: 'bold' }}>Contracts</p>
              <p>Contracts are tasks you can complete to earn resources and advantages.</p>
              <p>
                <span style={{ fontWeight: 'bold' }}>Success:</span> What you gain when completing the contract
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>Costs:</span> Resources required to complete the contract
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>Requirements:</span> Conditions that must be met
              </p>
              <hr style={{ border: '0.5px solid rgba(80, 80, 120, 0.3)', margin: '0.5rem 0' }} />
              <p>Contract types:</p>
              <p>
                <span style={{ color: 'rgba(40, 60, 60, 1)' }}>■</span> <span style={{ fontWeight: 'bold' }}>Safety:</span> Uses some 🧪,
                improves trust
              </p>
              <p>
                <span style={{ color: 'rgba(40, 40, 80, 1)' }}>■</span> <span style={{ fontWeight: 'bold' }}>Capability:</span> Very
                lucrative, but reduces trust
              </p>
              <p>
                <span style={{ color: 'rgba(60, 40, 60, 1)' }}>■</span> <span style={{ fontWeight: 'bold' }}>Product:</span> Uses some 💬,
                has broad effects
              </p>
            </>
          </InfoTooltip>
        </div>
        {contracts.length === 0 && (
          <p className="contract-empty">
            {gs.language === 'en-US'
              ? 'No contracts left. Wait until end of year or use the refresh action.'
              : '契約がなくなりました。年末まで待つか、リフレッシュアクションを使用してください。'}
          </p>
        )}
        <div className="contracts-grid">
          {contracts.map((contract, index) => (
            <ContractItem key={`contract-${index}`} contract={contract} language={language} editable={editable} index={index} />
          ))}
        </div>
      </div>
      <div className="contract-section">
        <div className="section-header">
          <h2>Yearly Goals</h2>
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
        </div>
        <div className="contracts-grid">
          {yearlyContracts.map((contract, index) => (
            <ContractItem key={`yearly-contract-${index}`} contract={contract} language={language} editable={false} index={index} />
          ))}
        </div>
      </div>
    </>
  )
}

// Define contract rarity colors; they are less saturated since they affect the readability more
const rarityColors: Record<Contract['rarity'], string> = {
  common: '#AEAEAE', // Gray
  uncommon: '#2166D3', // Blue
  rare: '#CFA700', // Gold
  epic: '#BC47E0', // Purple
}

interface ContractItemProps {
  contract: Contract | YearlyContract
  language: 'en-US' | 'jp-FI'
  editable: boolean
  index: number
}

export const ContractItem = ({ contract, language, editable, index }: ContractItemProps) => {
  const { dispatch } = useGameState()

  const completeContract = (contract: Contract | YearlyContract, index: number) => {
    dispatch(convertContractToAction(contract, index))
  }

  return (
    <div
      className={
        'contract-card' +
        (editable ? ' editable' : '') +
        (contract.type === 'safety'
          ? ' safety'
          : contract.type === 'capabilities'
          ? ' capabilities'
          : contract.type === 'product'
          ? ' product'
          : '')
      }
      style={{
        borderColor: rarityColors[contract.rarity],
      }}
      onClick={() => editable && completeContract(contract, index)}
    >
      {/* Header */}
      <div className="contract-header">
        <h3 className="contract-title" style={{ color: rarityColors[contract.rarity] }}>
          {contract.name[language] || contract.name['en-US']}
        </h3>
        <span className="contract-rarity" style={{ color: rarityColors[contract.rarity] }}>
          {isYearlyContract(contract) && `${contract.year} - `}
          {contract.type && `${contract.type === 'safety' ? 'Safety' : contract.type === 'capabilities' ? 'Capability' : 'Product'} - `}
          {capitalize(contract.rarity)}
        </span>
      </div>

      {/* Effect Details - More compact display */}
      <div className="contract-details">
        <p className="contract-success">
          <span className="contract-icon">✓</span>
          <span>{contract.successDescription[language] || '(none)'}</span>
        </p>
        <p className="contract-cost">
          <span className="contract-icon">!</span>
          <span>{contract.costDescription[language] || '(none)'}</span>
        </p>
        <p className="contract-requirement">
          <span className="contract-icon">•</span>
          <span>{contract.requirementDescription[language] || '(none)'}</span>
        </p>
      </div>
    </div>
  )
}
