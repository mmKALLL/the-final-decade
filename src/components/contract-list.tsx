import { useGameState } from '../gamestate-hooks'
import { InfoTooltip } from './info-tooltip'
import { ContractItem } from './contract-item'
import { Button } from './button'
import { refreshContractsAction } from '../data/data-actions'
import { rarityColors } from '../util'

export const ContractList = ({ editable }: { editable: boolean }) => {
  const { gs } = useGameState()
  const { contracts, language } = gs

  return (
    <div className="contract-section">
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
            <span style={{ color: 'rgba(100, 60, 80, 1)' }}>■</span> <span style={{ fontWeight: 'bold' }}>Product:</span> Uses some 💬, has
            broad effects
          </p>
          <p>
            <span style={{ color: 'rgba(60, 60, 100, 1)' }}>■</span> <span style={{ fontWeight: 'bold' }}>Capability:</span> Very lucrative,
            but reduces trust
          </p>
          <p>
            <span style={{ color: 'rgba(60, 100, 80, 1)' }}>■</span> <span style={{ fontWeight: 'bold' }}>Safety:</span> Uses some 🧪,
            improves trust
          </p>
        </>
      </InfoTooltip>
      <div className="section-header">
        <h2>Contracts - {editable ? 'tap to complete' : 'view only'}</h2>
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
      {editable && (
        <Button
          action={refreshContractsAction}
          style={{ marginTop: '0.5rem', maxWidth: '100px', border: `1px solid ${rarityColors.common}` }}
        />
      )}
    </div>
  )
}
