import { useState } from 'preact/hooks'
import { clearSave } from '../saving-util'
import { LanguageToggle } from './language-toggle'

export const Footer = () => {
  const [deleteClickCount, setDeleteClickCount] = useState(0)

  const handleSaveDelete = () => {
    setDeleteClickCount((prev) => prev + 1)
    if (deleteClickCount >= 1) {
      clearSave()
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
