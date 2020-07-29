import { BingoAction } from "@actions/bingoAction"
import { Action } from "@actions/action"
import { Goal } from "@services/bingo/goal"

export function addGoals(goals: Goal[]): Action {
  return {
    type: BingoAction.ADD_ENTRIES,
    payload: {
      goals
    }
  } as const
}

export function addGoal(goal: Goal): Action {
  return {
    type: BingoAction.ADD_ENTRY,
    payload: {
      goal
    }
  } as const
}

export function removeGoal(goal: Goal): Action {
  return {
    type: BingoAction.REMOVE_ENTRY,
    payload: {
      goal
    }
  } as const
}

export function updateGoal(goal: Goal): Action {
  return {
    type: BingoAction.UPDATE_ENTRY,
    payload: {
      goal
    }
  } as const
}
