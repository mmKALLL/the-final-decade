import { useState } from 'preact/hooks'
import { clearSaveAndReset } from '../savegame-util'
import { LanguageToggle } from './language-toggle'
import { useGameState } from '../gamestate-hooks'

export const Footer = () => {
  const { gs } = useGameState()
  const [deleteClickCount, setDeleteClickCount] = useState(0)

  const handleSaveDelete = () => {
    setDeleteClickCount((prev) => prev + 1)
    if (deleteClickCount >= 1) {
      clearSaveAndReset(gs)
      setDeleteClickCount(0)
    }
  }

  const deleteButtonText = () => {
    switch (deleteClickCount) {
      case 0:
        return 'Delete save'
      case 1:
        return 'Are you sure?'
      default:
        return '???'
    }
  }

  return (
    <div className="game-footer">
      <LanguageToggle />
      <button onClick={handleSaveDelete}>{deleteButtonText()}</button>
    </div>
  )
}
