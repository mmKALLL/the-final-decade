import { useGameState } from '../gamestate-hooks'
import { labels } from '../labels'
import { Button } from './button'

export function GameView() {
  const { gs } = useGameState()
  return (
    <div>
      <h1>{labels[gs.language].gameTitle}</h1>
      {gs.availableActions.map((action) => (
        <Button text={action.name[gs.language]} action={action} />
      ))}

      <p>
        {JSON.stringify({ ...gs, availableActions: [] })
          .slice(1, -1)
          .split(',')
          .map((s) => (
            <>
              {s} <br /> <br />
            </>
          ))}
      </p>
    </div>
  )
}
