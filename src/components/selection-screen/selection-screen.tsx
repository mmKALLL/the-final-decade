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

  // Format value display to be more readable
  const formatValue = (value: any) => {
    if (typeof value === 'number') {
      return value
    }
    if (Array.isArray(value)) {
      return value.length // Just show the count for arrays
    }
    return JSON.stringify(value)
  }

  // More compact category names for mobile
  const compactCategories = {
    Resources: {
      money: gs.money,
      'passive income': gs.passiveMoneyGain,
    },
    Organization: {
      trust: gs.trust,
      influence: gs.influence,
    },
    ASI: {
      outcome: gs.asiOutcome,
      'public unity': gs.publicUnity,
    },
    Team: {
      humans: gs.humans.length,
      upgrades: gs.upgrades.length,
    },
  }

  return (
    <div className="selection-screen">
      <div className="selection-content">
        {/* Human Selection (only first group) */}
        {gs.humanSelections.length > 0 && (
          <div className="selection-section">
            <h3 className="selection-title">Human Selection</h3>
            <div className="selection-grid">
              {gs.humanSelections[0].map((human) => (
                <HumanItem key={human.name['en-US']} human={human} onSelect={() => handleHumanSelect(human)} />
              ))}
            </div>
          </div>
        )}

        {/* Upgrade Selection (only first group) */}
        {gs.upgradeSelections.length > 0 && (
          <div className="selection-section">
            <h3 className="selection-title">Upgrade Selection</h3>
            <div className="selection-grid">
              {gs.upgradeSelections[0].map((upgrade) => (
                <UpgradeItem key={upgrade.name['en-US']} upgrade={upgrade} onSelect={() => handleUpgradeSelect(upgrade)} />
              ))}
            </div>
          </div>
        )}

        {/* Contract Selection (only first group) */}
        {gs.contractSelections.length > 0 && (
          <div className="selection-section">
            <h3 className="selection-title">Contract Selection</h3>
            <div className="selection-grid">
              {gs.contractSelections[0].map((contract) => (
                <ContractItem key={contract.name['en-US']} contract={contract} onSelect={() => handleContractSelect(contract)} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Game state display below selection */}
      <div className="game-state-section">
        <h2>Game state:</h2>
        <div className="stat-categories">
          {Object.entries(compactCategories).map(([category, stats]) => (
            <div className="stat-category" key={`category-${category}`}>
              <h3 className="category-title">{category}</h3>
              <div className="game-state-grid">
                {Object.entries(stats).map(([key, value]) => (
                  <div className="stat-card" key={`stat-${category}-${key}`}>
                    <div className="stat-name">{key}</div>
                    <div className="stat-value">{formatValue(value)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
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
