import { useGameState } from '../gamestate-hooks'
import { Contract } from '../types'

export const ContractList = () => {
  const { gs } = useGameState()
  const { contracts, yearlyContracts, language } = gs

  return (
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <h2>Current contracts:</h2>
      {[...contracts, ...yearlyContracts].map((contract) => (
        <ContractItem contract={contract} language={language} />
      ))}
    </div>
  )
}

interface ContractItemProps {
  contract: Contract
  language: 'en-US' | 'jp-FI'
}

// Define rarity colors using inline styles
const rarityColors: Record<Contract['rarity'], string> = {
  common: '#7E7E7E', // Gray
  uncommon: '#2166D3', // Blue
  rare: '#CFA700', // Gold
  epic: '#9C27B0', // Purple
}

export const ContractItem = ({ contract, language }: ContractItemProps) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '12px',
        padding: '10px',
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: '350px',
        maxHeight: '200px',
        overflow: 'hidden',
        margin: '8px 0',
        boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2
          style={{
            color: rarityColors[contract.rarity],
            fontSize: '1.1em',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '80%',
          }}
        >
          {contract.name[language] || contract.name['en-US']}
        </h2>
        <span style={{ fontSize: '0.8em', color: rarityColors[contract.rarity], fontWeight: 'bold' }}>{contract.rarity.toUpperCase()}</span>
      </div>

      {/* Compact Effect Details */}
      <div style={{ fontSize: '0.85em', flex: '1', overflow: 'hidden' }}>
        <p style={{ color: '#333', margin: '4px 0' }}>✅ {contract.successDescription[language]}</p>
        <p style={{ color: '#1565C0', margin: '4px 0' }}>🔷 {contract.requirementDescription[language]}</p>
        <p style={{ color: '#D32F2F', margin: '4px 0' }}>⚠️ {contract.costDescription[language]}</p>
      </div>
    </div>
  )
}
