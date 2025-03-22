import { GameState } from '../../types'

// Victory Screen Component
export const VictoryScreen = ({ gs }: { gs: GameState }) => (
  <div className="victory-screen">
    <h1>{gs.language === 'en-US' ? 'Victory!' : '勝利！'}</h1>
    <p>
      {gs.language === 'en-US'
        ? `Your company has successfully navigated the AI race and deployed an aligned ASI at the start of 2030.`
        : 'あなたの会社はAIレースを上手く乗り切り、2030年に整列されたASIを展開しました。'}
    </p>
    <p>
      {gs.language === 'en-US'
        ? `The future of humanity looks bright under the guidance of your aligned AI systems.`
        : 'あなたの整列されたAIシステムの指導の下、人類の未来は明るく見えます。'}
    </p>
    <div className="victory-stats">
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
        {gs.language === 'en-US' ? 'Money Left' : '金額'}: {gs.money}
      </p>
    </div>
    <button className="restart-button" onClick={() => window.location.reload()}>
      {gs.language === 'en-US' ? 'Play Again' : 'もう一度プレイする'}
    </button>
  </div>
)
