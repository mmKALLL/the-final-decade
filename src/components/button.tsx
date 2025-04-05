import { generateActionDescription } from '../data/data-generators'
import { canApplyAction, useGameState } from '../gamestate-hooks'
import { Action } from '../types'

export function Button({ action }: { action: Action }) {
  const { gs, dispatch } = useGameState()
  const description = action.description?.[gs.language] || generateActionDescription(action, gs.language)
  const disabled = !canApplyAction(gs, action)

  return (
    <button
      disabled={disabled}
      className={`button ${disabled ? 'faded' : ''}`}
      onClick={() => dispatch(action)}
      title={description || undefined}
    >
      <div className="action-content">
        <div className="action-name">{action.name[gs.language]}</div>
        {description && <div className="action-description">{description}</div>}
      </div>
    </button>
  )
}
