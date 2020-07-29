import { Goal } from "@services/bingo/goal"

export interface Synergy {
  typeSynergies: Map<string, number[]>
  subTypeSynergies: Map<string, number[]>
  rowTypeSynergies: Map<string, number[]>
  goals: Goal[]
  timeDifferences: number[]
}
