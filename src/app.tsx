import './app.css'
import { GameStateProvider } from './gamestate-hooks'
import { GameView } from './components/game-view'

export function App() {
  return (
    <GameStateProvider>
      <GameView />
    </GameStateProvider>
  )
}
