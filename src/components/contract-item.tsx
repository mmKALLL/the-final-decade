import { useGameState } from '../gamestate-hooks'
import { Contract, YearlyContract } from '../types'
import { capitalize } from '../util'
import { convertContractToAction } from '../data/data-actions'

// Type guard to check if a contract is a YearlyContract
export function isYearlyContract(contract: Contract | YearlyContract): contract is YearlyContract {
  return 'year' in contract
}

// Define contract rarity colors; they are less saturated since they affect the readability more
const rarityColors: Record<Contract['rarity'], string> = {
  common: '#AEAEAE', // Gray
  uncommon: '#4196E3', // Blue
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
        <h3 className="contract-title">{contract.name[language] || contract.name['en-US']}</h3>
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
