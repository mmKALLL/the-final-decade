import { useGameState } from '../gamestate-hooks'
import { labels } from '../labels'
import { GameState } from '../types'
import { Button } from './button'

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
    bossContracts: undefined,
  }
  return (
    <div>
      <h1>{labels[gs.language].gameTitle}</h1>
      {gs.availableActions.map((action) => (
        <Button text={action.name[gs.language]} action={action} />
      ))}

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
    </div>
  )
}
