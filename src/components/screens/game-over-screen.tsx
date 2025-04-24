import { useGameState } from '../../gamestate-hooks'
import { getDateFromTurn } from '../../util'
import { GameEndStats } from './game-end-stats'

// Game Over Screen Component
export const GameOverScreen = () => {
  const { gs } = useGameState()

  return (
    <div className="game-over-screen">
      <h1>{gs.language === 'en-US' ? 'Game Over' : 'ゲームオーバー'}</h1>
      <p>
        {gs.money <= 0
          ? gs.language === 'en-US'
            ? `Your company failed to remain profitable and went bankrupt on ${getDateFromTurn(gs.turn)}.`
            : `${getDateFromTurn(gs.turn)}までに利益を維持できず、倒産しました。`
          : gs.asiOutcome <= 0
          ? gs.language === 'en-US'
            ? `Your company was shut down on ${getDateFromTurn(gs.turn)}, as the public has taken a careless attitude towards AI alignment.`
            : `あなたの会社は${getDateFromTurn(gs.turn)}に、公衆がAIの整合性に対する無頓着な態度の結果として閉鎖されました。`
          : gs.trust <= 0
          ? gs.language === 'en-US'
            ? `Your company failed to maintain trust with your stakeholders on ${getDateFromTurn(gs.turn)}.`
            : `${getDateFromTurn(gs.turn)}までに従業員との信頼関係を維持できませんでした。`
          : gs.influence <= 0
          ? gs.language === 'en-US'
            ? `Your company was discredited by the public on ${getDateFromTurn(gs.turn)}.`
            : `${getDateFromTurn(gs.turn)}までに公衆の支持を失いました。`
          : gs.language === 'en-US'
          ? `Your company failed to meet the annual breakthrough goals by ${getDateFromTurn(gs.turn)}.`
          : `${getDateFromTurn(gs.turn)}までに年間突破目標を達成できませんでした。`}
      </p>
      <p>
        {gs.language === 'en-US'
          ? 'Companies continue to race towards ASI without any guarantees of safety. The future remains uncertain.'
          : 'ASIの競争はあなた抜きで続き、未来は不確実なままです。'}
      </p>
      <GameEndStats />
      <button className="restart-button" onClick={() => window.location.reload()}>
        {gs.language === 'en-US' ? 'Try Again' : 'もう一回'}
      </button>
    </div>
  )
}
