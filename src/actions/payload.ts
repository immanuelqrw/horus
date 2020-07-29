import { Goal } from "@services/bingo/goal"

export interface Payload {
  goal?: Goal
  goals?: Goal[]
}
