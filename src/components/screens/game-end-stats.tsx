import { useGameState } from '../../gamestate-hooks'

export function GameEndStats() {
  const { gs } = useGameState()

  return (
    <div className="game-over-stats">
      <h2>{gs.language === 'en-US' ? 'Final Stats' : '最終統計'}</h2>
      <ul style={{ textAlign: 'left' }}>
        <li>
          💰 {gs.money} ー 💬 {gs.sp} ー 🔧 {gs.ep} ー 🧪 {gs.rp} ー ⚙️ {gs.up}
        </li>
        <li>
          {gs.language === 'en-US' ? 'Influence' : '影響力'}: {gs.influence}
        </li>
        <li>
          {gs.language === 'en-US' ? 'Trust' : '信頼'}: {gs.trust}
        </li>
        <li>
          {gs.language === 'en-US' ? 'ASI Outcome' : 'ASIの結果'}: {gs.asiOutcome}
        </li>
        <li>
          {gs.language === 'en-US' ? 'Public Unity' : '公共団結'}: {gs.publicUnity}
        </li>
        <li>
          {gs.language === 'en-US' ? 'Breakthroughs' : '突破'}: {gs.breakthroughs.length}
        </li>
      </ul>
    </div>
  )
}
