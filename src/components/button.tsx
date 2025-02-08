import { useGameState } from '../gamestate-hooks'
import { Action } from '../types'

export function Button({ text, action }: { text: string; action: Action }) {
  const { dispatch } = useGameState()

  return (
    <div>
      <button onClick={() => dispatch(action)}>{text}</button>
    </div>
  )
}
