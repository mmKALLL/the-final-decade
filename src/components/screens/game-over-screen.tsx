import { GameState } from '../../types'
import { getDateFromTurn } from '../../util'

// Game Over Screen Component
export const GameOverScreen = ({ gs, turn }: { gs: GameState; turn: number }) => (
  <div className="game-over-screen">
    <h1>{gs.language === 'en-US' ? 'Game Over' : 'ゲームオーバー'}</h1>
    <p>
      {gs.language === 'en-US'
        ? `Your company failed to meet the annual breakthrough goals by ${getDateFromTurn(gs.turn)}.`
        : `${getDateFromTurn(gs.turn)}までに年間突破目標を達成できませんでした。`}
    </p>
    <p>
      {gs.language === 'en-US'
        ? 'The ASI race continues without you, and the future remains uncertain.'
        : 'ASIの競争はあなた抜きで続き、未来は不確実なままです。'}
    </p>
    <div className="game-over-stats">
      <h2>{gs.language === 'en-US' ? 'Final Stats' : '最終統計'}</h2>
      <p>
        {gs.language === 'en-US' ? 'ASI Outcome' : 'ASIの結果'}: {gs.asiOutcome}
      </p>
      <p>
        {gs.language === 'en-US' ? 'Public Unity' : '公共団結'}: {gs.publicUnity}
      </p>
      <p>
        {gs.language === 'en-US' ? 'Breakthroughs' : '突破'}: {gs.breakthroughs.length}
      </p>
      <p>
        {gs.language === 'en-US' ? 'Total Money Earned' : '稼いだ合計金額'}: {gs.money}
      </p>
    </div>
    <button className="restart-button" onClick={() => window.location.reload()}>
      {gs.language === 'en-US' ? 'Try Again' : 'もう一度'}
    </button>
  </div>
)
