import { useEffect } from 'preact/hooks'
import { useGameState } from '../../gamestate-hooks'
import { GameEndStats } from './game-end-stats'
import { VictoryScreen } from './victory-screen'
import { GameOverScreen } from './game-over-screen'

export const GameEndScreen = () => {
  const { gs } = useGameState()

  useEffect(() => {
    console.log('Analyzing score... Done!')
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'post_score',
      gameStateJson: gs,
      turn: gs.turn,
    })
  }, [])

  return gs.currentScreen === 'game-over' ? (
    <GameOverScreen />
  ) : gs.currentScreen === 'victory' ? (
    <VictoryScreen />
  ) : (
    <div className="game-over-screen">
      <p>
        An error occurred. Our apologies for the trouble, inconvenience, sudden end, sense of loss, and unexplainable bugs.
        <br /> <br />
        Please send the following to the developers at studioesagames@gmail.com or https://discord.gg/3VGQytvBDX
        <br /> <br />
        <pre>[END-001-GS]: {JSON.stringify(gs, null, 2)}</pre>
      </p>

      <GameEndStats />
      <button className="restart-button" onClick={() => window.location.reload()}>
        {gs.language === 'en-US' ? 'Play Again' : 'もう一回プレイする'}
      </button>
    </div>
  )
}
