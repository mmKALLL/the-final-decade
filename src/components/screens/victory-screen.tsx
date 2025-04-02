import { useGameState } from '../../gamestate-hooks'
import { GameEndStats } from './game-end-stats'

// Victory Screen Component
export const VictoryScreen = () => {
  const { gs } = useGameState()

  return (
    <div className="victory-screen">
      <h1>{gs.language === 'en-US' ? 'Victory!' : '勝利！'}</h1>
      <p>
        {gs.language === 'en-US'
          ? `Your company has successfully navigated the AI race and deployed an aligned ASI at the start of 2030.`
          : 'あなたの会社はAIレースを上手く乗り切り、2030年に整列されたASIを展開しました。'}
      </p>
      <p>
        {gs.language === 'en-US'
          ? `The future of humanity looks bright under the guidance of your systems.`
          : 'あなたの整列されたAIシステムの指導の下、人類の未来は明るく見えます。'}
      </p>

      <GameEndStats />
      <button className="restart-button" onClick={() => window.location.reload()}>
        {gs.language === 'en-US' ? 'Play Again' : 'もう一度プレイする'}
      </button>
    </div>
  )
}
