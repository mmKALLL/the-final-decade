import { useGameState } from '../gamestate-hooks'
import { labels } from '../labels'
import { GameState } from '../types'
import { Button } from './button'
import { ContractList } from './contract-list'

export function GameView() {
  const { gs } = useGameState()
  const printableGs: Partial<GameState> = {
    ...gs,
    currentScreen: undefined,
    language: undefined,
    availableActions: undefined,
    humanSelections: undefined,
    upgradeSelections: undefined,
    contractSelections: undefined,
    yearlyContracts: undefined,
    contracts: undefined,
  }
  return (
    <div>
      <h1>{labels[gs.language].gameTitle}</h1>
      <h2>Available actions:</h2>
      {gs.availableActions.map((action) => (
        <Button action={action} />
      ))}

      <h2>Current game state:</h2>

      <p>
        {JSON.stringify(printableGs)
          .slice(1, -1)
          .split(',')
          .map((s) => (
            <>
              {s} <br />
            </>
          ))}
      </p>

      <h2>Current contracts:</h2>
      <ContractList />
    </div>
  )
}
