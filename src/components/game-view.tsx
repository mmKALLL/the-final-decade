import { useGameState } from '../gamestate-hooks'
import { labels } from '../labels'
import { assertNever } from '../util'
import { MainScreen } from './main-screen'
import { SelectionScreen } from './selection-screen/selection-screen'

export function GameView() {
  const { gs } = useGameState()

  return (
    <div>
      <h1>{labels[gs.language].gameTitle}</h1>
      <h2>Available actions:</h2>

      {gs.currentScreen === 'main' ? (
        <MainScreen />
      ) : gs.currentScreen === 'selection' ? (
        <SelectionScreen />
      ) : (
        assertNever(gs.currentScreen)
      )}
    </div>
  )
}
