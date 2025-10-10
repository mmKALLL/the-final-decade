import { BreakthroughList } from '../breakthrough-list'
import { ContractList } from '../contract-list'
import { ResourceDisplay } from '../resource-display'
import { ActionButtons } from '../action-buttons'
import { YearlyGoalList } from '../yearly-goal-list'
import { Footer } from '../footer'

export const MainScreen = () => {
  return (
    <div className="main-screen">
      <ActionButtons />
      <ResourceDisplay />
      <ContractList editable={true} />
      <BreakthroughList editable={true} />
      <YearlyGoalList />
      <Footer />
    </div>
  )
}
