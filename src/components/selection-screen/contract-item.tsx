import { Contract } from '../../types'

export const ContractItem = ({ contract, onSelect }: { contract: Contract; onSelect: () => void }) => {
  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#222',
        border: '1px solid #9C27B0',
        borderRadius: '6px',
        padding: '6px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '0.85em',
      }}
    >
      <span>{contract.name['en-US']}</span>
      <span>✅ {contract.onSuccess.map((e) => `${e.paramEffected}: +${e.amount}`).join(', ')}</span>
    </button>
  )
}
