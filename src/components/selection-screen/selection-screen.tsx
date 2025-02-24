import { useEffect } from 'preact/hooks'
import { useGameState } from '../../gamestate-hooks'
import { HumanItem } from './human-item'
import { UpgradeItem } from './upgrade-item'
import { Contract, Human, Upgrade } from '../../types'
import { ContractItem } from './contract-item'

export const SelectionScreen = () => {
  const { gs, dispatch } = useGameState()

  useEffect(() => {
    if (gs.humanSelections.length === 0 && gs.upgradeSelections.length === 0 && gs.contractSelections.length === 0) {
      dispatch({
        name: { 'en-US': 'End selection screen', 'jp-FI': '選択画面終了' },
        turnCost: 0,
        turnsInvested: 0,
        effect: [],
        functionEffect: (gs) => {
          return {
            ...gs,
            currentScreen: 'main',
          }
        },
      })
    }
  }, [gs.humanSelections, gs.upgradeSelections, gs.contractSelections])

  return (
    <div style={{ padding: '10px', maxWidth: '600px', margin: 'auto' }}>
      {/* <h2 style={{ textAlign: 'center', color: '#fff' }}>Selection Screen</h2> */}

      {/* Human Selection (only first group) */}
      {gs.humanSelections.length > 0 && (
        <div>
          <h3 style={{ color: '#FFD700' }}>Human Selection</h3>
          {gs.humanSelections[0].map((human) => (
            <HumanItem key={human.name['en-US']} human={human} onSelect={() => handleHumanSelect(human)} />
          ))}
        </div>
      )}

      {/* Upgrade Selection (only first group) */}
      {gs.upgradeSelections.length > 0 && (
        <div>
          <h3 style={{ color: '#00BFFF' }}>Upgrade Selection</h3>
          {gs.upgradeSelections[0].map((upgrade) => (
            <UpgradeItem key={upgrade.name['en-US']} upgrade={upgrade} onSelect={() => handleUpgradeSelect(upgrade)} />
          ))}
        </div>
      )}

      {/* Contract Selection (only first group) */}
      {gs.contractSelections.length > 0 && (
        <div>
          <h3 style={{ color: '#9C27B0' }}>Contract Selection</h3>
          {gs.contractSelections[0].map((contract) => (
            <ContractItem key={contract.name['en-US']} contract={contract} onSelect={() => handleContractSelect(contract)} />
          ))}
        </div>
      )}
    </div>
  )

  // Handle selecting a human
  function handleHumanSelect(human: Human) {
    dispatch({
      name: { 'en-US': `Selected ${human.name['en-US']}`, 'jp-FI': `選択: ${human.name['jp-FI']}` },
      turnCost: 0,
      turnsInvested: 0,
      effect: [],
      functionEffect: (gs) => {
        return {
          ...gs,
          humans: [...gs.humans, human],
          humanSelections: gs.humanSelections.slice(1), // Remove the first group after selection
        }
      },
    })
  }

  // Handle selecting an upgrade
  function handleUpgradeSelect(upgrade: Upgrade) {
    dispatch({
      name: { 'en-US': `Acquired ${upgrade.name['en-US']}`, 'jp-FI': `取得: ${upgrade.name['jp-FI']}` },
      turnCost: 0,
      turnsInvested: 0,
      effect: [],
      functionEffect: (gs) => {
        return {
          ...gs,
          upgradeSelections: gs.upgradeSelections.slice(1), // Remove first upgrade group after selection
        }
      },
    })
  }

  // Handle selecting a contract
  function handleContractSelect(contract: Contract) {
    dispatch({
      name: { 'en-US': `Accepted ${contract.name['en-US']}`, 'jp-FI': `契約: ${contract.name['jp-FI']}` },
      turnCost: 0,
      turnsInvested: 0,
      effect: [],
      functionEffect: (gs) => {
        return {
          ...gs,
          contractSelections: gs.contractSelections.slice(1), // Remove first contract group after selection
        }
      },
    })
  }
}
