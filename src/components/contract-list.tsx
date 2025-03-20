import { useGameState } from '../gamestate-hooks'
import { Contract } from '../types'

export const ContractList = () => {
  const { gs } = useGameState()
  const { contracts, yearlyContracts, language } = gs

  return (
    <div className="contract-section">
      <h2>Contracts:</h2>
      <div className="contracts-grid">
        {[...contracts, ...yearlyContracts].map((contract, index) => (
          <ContractItem key={`contract-${index}`} contract={contract} language={language} />
        ))}
      </div>
    </div>
  )
}

interface ContractItemProps {
  contract: Contract
  language: 'en-US' | 'jp-FI'
}

// Define rarity colors
const rarityColors: Record<Contract['rarity'], string> = {
  common: '#AEAEAE', // Gray
  uncommon: '#2166D3', // Blue
  rare: '#CFA700', // Gold
  epic: '#BC47E0', // Purple
}

export const ContractItem = ({ contract, language }: ContractItemProps) => {
  return (
    <div className="contract-card" style={{ borderColor: rarityColors[contract.rarity] }}>
      {/* Header */}
      <div className="contract-header">
        <h3 className="contract-title" style={{ color: rarityColors[contract.rarity] }}>
          {contract.name[language] || contract.name['en-US']}
        </h3>
        <span className="contract-rarity" style={{ color: rarityColors[contract.rarity] }}>
          {contract.rarity}
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
