import { useGameState } from '../gamestate-hooks'
import { Contract, YearlyContract } from '../types'
import { capitalize, convertContractToAction } from '../util'

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
        <h2>Contracts - {editable ? 'tap to complete' : 'view only'}</h2>
        {contracts.length === 0 && (
          <p className="contract-empty">
            {gs.language === 'en-US'
              ? 'No contracts left. Wait until end of year or use the refresh action.'
              : '契約がなくなりました。年末まで待つか、リフレッシュアクションを使用してください。'}
          </p>
        )}
        <div className="contracts-grid">
          {contracts.map((contract, index) => (
            <ContractItem key={`contract-${index}`} contract={contract} language={language} editable={editable} />
          ))}
        </div>
      </div>
      <div className="contract-section">
        <h2>Yearly Goals</h2>
        <div className="contracts-grid">
          {yearlyContracts.map((contract, index) => (
            <ContractItem key={`contract-${index}`} contract={contract} language={language} editable={false} />
          ))}
        </div>
      </div>
    </>
  )
}

interface ContractItemProps {
  contract: Contract | YearlyContract
  language: 'en-US' | 'jp-FI'
  editable: boolean
}

// Define rarity colors
const rarityColors: Record<Contract['rarity'], string> = {
  common: '#AEAEAE', // Gray
  uncommon: '#2166D3', // Blue
  rare: '#CFA700', // Gold
  epic: '#BC47E0', // Purple
}

export const ContractItem = ({ contract, language, editable }: ContractItemProps) => {
  const { dispatch } = useGameState()

  const completeContract = (contract: Contract | YearlyContract) => {
    dispatch({
      ...convertContractToAction(contract),
      // Remove the contract from the GS, filter based on name since there's no id
      functionEffect: (gs) => {
        return {
          ...gs,
          contracts: gs.contracts.filter((c) => c.name['en-US'] !== contract.name['en-US']),
        }
      },
    })
  }

  return (
    <div
      className={
        'contract-card' +
        (editable ? ' editable' : '') +
        (contract.type === 'alignment'
          ? ' alignment'
          : contract.type === 'capabilities'
          ? ' capabilities'
          : contract.type === 'product'
          ? ' product'
          : '')
      }
      style={{
        borderColor: rarityColors[contract.rarity],
      }}
      onClick={() => editable && completeContract(contract)}
    >
      {/* Header */}
      <div className="contract-header">
        <h3 className="contract-title" style={{ color: rarityColors[contract.rarity] }}>
          {contract.name[language] || contract.name['en-US']}
        </h3>
        <span className="contract-rarity" style={{ color: rarityColors[contract.rarity] }}>
          {isYearlyContract(contract) && `${contract.year} - `}
          {contract.type && `${contract.type === 'alignment' ? 'Safety' : contract.type === 'capabilities' ? 'Capability' : 'Product'} - `}
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
