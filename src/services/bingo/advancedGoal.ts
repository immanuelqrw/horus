import { Goal } from "@services/bingo/goal"

export interface AdvancedGoal extends Goal {
  id?: string
  name: string
  types: string[]
  difficulty?: number
  subTypes?: number[]
  rowTypes?: number[]
  time?: number
  desiredTime?: number
  synergy?: number
  languageName?: Map<string, string>
}
