import { useEffect } from 'preact/hooks'
import { reduceAction, useGameState } from '../../../gamestate-hooks'
import { HumanItem } from './human-item'
import { BreakthroughItem } from './breakthrough-item'
import { Human, Breakthrough } from '../../../types'
import { ContractList } from '../../contract-list'
import { ResourceDisplay } from '../../resource-display'
import { LanguageToggle } from '../../language-toggle'
import { BreakthroughList } from '../../breakthrough-list'
import { YearlyGoalList } from '../../yearly-goal-list'

export const SelectionScreen = () => {
  const { gs, dispatch } = useGameState()

  useEffect(() => {
    if (gs.humanSelections.length === 0 && gs.breakthroughSelections.length === 0) {
      dispatch({
        eventId: 'internalStateChange',
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
  }, [gs.humanSelections, gs.breakthroughSelections])

  return (
    <>
      <div className="selection-screen">
        <div className="selection-content">
          {gs.humanSelections.length > 0 && (
            <div className="selection-section">
              <h3 className="selection-title">{gs.language === 'jp-FI' ? '人材選択' : 'Human Selection'}</h3>
              <div className="selection-grid">
                {gs.humanSelections[0].map((human) => (
                  <HumanItem key={human.name['en-US']} human={human} onSelect={() => handleHumanSelect(human)} />
                ))}
              </div>
            </div>
          )}

          {gs.breakthroughSelections.length > 0 && (
            <div className="selection-section">
              <h3 className="selection-title">{gs.language === 'jp-FI' ? 'ブレークスルー選択' : 'Breakthrough Selection'}</h3>
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
        </div>
      </div>

      <ResourceDisplay />
      <ContractList editable={false} />
      <BreakthroughList editable={false} />
      <YearlyGoalList />
      <LanguageToggle />
    </>
  )

  // Handle selecting a human
  function handleHumanSelect(human: Human) {
    dispatch({
      eventId: 'internalStateChange',
      name: { 'en-US': `Selected ${human.name['en-US']}`, 'jp-FI': `選択: ${human.name['jp-FI']}` },
      turnCost: 0,
      turnsInvested: 0,
      effect: [],
      functionEffect: (gs) => {
        const gsWithHuman = {
          ...gs,
          humans: [...gs.humans, human],
          humanSelections: gs.humanSelections.slice(1), // Remove the first group after selection
        }
        return reduceAction(gsWithHuman, {
          ...human,
          eventId: 'internalStateChange',
          description: { 'en-US': '', 'jp-FI': '' },
          turnCost: 0,
          turnsInvested: 0,
          effect: human.specialEffect ?? [],
        })
      },
    })
  }

  // Handle selecting a breakthrough
  function handleBreakthroughSelect(breakthrough: Breakthrough) {
    const existingBreakthrough = gs.breakthroughs.find((b) => b.id === breakthrough.id)
    const isMaxLevel = existingBreakthrough && existingBreakthrough.level >= existingBreakthrough.maxLevel

    if (isMaxLevel) {
      return // Exit early. TODO: Don't have the breakthrough selectable in the first place
    }

    dispatch({
      eventId: 'internalStateChange',
      name: { 'en-US': `Acquired ${breakthrough.name['en-US']}, applying all effects`, 'jp-FI': `取得: ${breakthrough.name['jp-FI']}` },
      turnCost: 0,
      turnsInvested: 0,
      effect: [],
      functionEffect: (gs) => {
        const gsWithBreakthrough = {
          ...gs,
          breakthroughSelections: gs.breakthroughSelections.slice(1), // Remove first breakthrough group after selection
          breakthroughs: existingBreakthrough
            ? gs.breakthroughs.map((b) => (b.id === breakthrough.id ? { ...b, level: b.level + 1 } : b))
            : [...gs.breakthroughs, { ...breakthrough, level: 1 }],
        }
        return reduceAction(gsWithBreakthrough, {
          ...breakthrough,
          eventId: 'internalStateChange',
          description: { 'en-US': '', 'jp-FI': '' },
          turnCost: 0,
          turnsInvested: 0,
          effect: breakthrough.effect ?? [],
        })
      },
    })
  }
}
