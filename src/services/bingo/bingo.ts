import { Goal } from "@services/bingo/goal"
import { Nullable } from "@utils/utility"

export interface Bingo {
  goals: Nullable<Goal>[]
  rules: string
  tips: string
}
