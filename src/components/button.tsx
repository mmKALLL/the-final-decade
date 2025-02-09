import { generateActionDescription } from '../data/data-generators'
import { useGameState } from '../gamestate-hooks'
import { Action } from '../types'

export function Button({ action }: { action: Action }) {
  const { gs, dispatch } = useGameState()
  const description = action.description?.[gs.language] || generateActionDescription(action)

  return (
    <div>
      <button onClick={() => dispatch(action)}>
        {action.name[gs.language]} {description ? `(${description})` : ''}
      </button>
    </div>
  )
}
