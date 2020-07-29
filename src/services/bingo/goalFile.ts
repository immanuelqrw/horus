import { Goal } from "@services/bingo/goal"

export interface GoalFile {
  gameName: string
  goals: Goal[]
}
