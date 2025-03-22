import { useEffect } from 'preact/hooks'
import { useGameState } from '../../gamestate-hooks'
import { HumanItem } from './human-item'
import { BreakthroughItem } from './breakthrough-item'
import { Contract, Human, Breakthrough } from '../../types'
import { ContractItem } from './contract-item'
import { ContractList } from '../contract-list'

export const SelectionScreen = () => {
  const { gs, dispatch } = useGameState()

  useEffect(() => {
    if (gs.humanSelections.length === 0 && gs.breakthroughSelections.length === 0 && gs.contractSelections.length === 0) {
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
  }, [gs.humanSelections, gs.breakthroughSelections, gs.contractSelections])

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
      'passive income': gs.passiveIncome,
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
      breakthroughs: gs.breakthroughs.length,
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

        {/* Breakthrough Selection (only first group) */}
        {gs.breakthroughSelections.length > 0 && (
          <div className="selection-section">
            <h3 className="selection-title">Breakthrough Selection</h3>
            <div className="selection-grid">
              {gs.breakthroughSelections[0].map((breakthrough) => (
                <BreakthroughItem
                  key={breakthrough.name['en-US']}
                  breakthrough={breakthrough}
                  onSelect={() => handleBreakthroughSelect(breakthrough)}
                />
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

      {/* Game state display in compact row format */}
      <div className="game-state-section">
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
      <ContractList editable={false} />
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

  // Handle selecting a breakthrough
  function handleBreakthroughSelect(breakthrough: Breakthrough) {
    dispatch({
      name: { 'en-US': `Acquired ${breakthrough.name['en-US']}`, 'jp-FI': `取得: ${breakthrough.name['jp-FI']}` },
      turnCost: 0,
      turnsInvested: 0,
      effect: [],
      functionEffect: (gs) => {
        return {
          ...gs,
          breakthroughSelections: gs.breakthroughSelections.slice(1), // Remove first breakthrough group after selection
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
