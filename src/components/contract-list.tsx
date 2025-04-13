import { useGameState } from '../gamestate-hooks'
import { InfoTooltip } from './info-tooltip'
import { ContractItem } from './contract-item'

export const ContractList = ({ editable }: { editable: boolean }) => {
  const { gs } = useGameState()
  const { contracts, language } = gs

  return (
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
              <span style={{ color: 'rgba(60, 40, 60, 1)' }}>■</span> <span style={{ fontWeight: 'bold' }}>Product:</span> Uses some 💬, has
              broad effects
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
  )
}
