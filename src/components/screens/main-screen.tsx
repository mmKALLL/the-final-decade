import { BreakthroughList } from '../breakthrough-list'
import { ContractList } from '../contract-list'
import { GameStateDisplay } from '../game-state-display'
import { LanguageToggle } from '../language-toggle'
import { ActionButtons } from '../action-buttons'
import { YearlyGoalList } from '../yearly-goal-list'

export const MainScreen = () => {
  return (
    <div className="main-screen">
      <ActionButtons />
      <GameStateDisplay />
      <ContractList editable={true} />
      <BreakthroughList editable={true} />
      <YearlyGoalList />
      <LanguageToggle />
    </div>
  )
}
