import { Action } from "@actions/action"
import { BingoAction } from "@actions/bingoAction"
import { Goal } from "@services/bingo/goal"

export function bingoViewerReducer(state : Goal[] = [], action: Action) {
  switch (action.type) {
    case BingoAction.ADD_ENTRIES:
      return action.payload.goals
    case BingoAction.ADD_ENTRY:
      return [
        ...state,
        {
          goal: action.payload.goal
        }
      ]
    case BingoAction.REMOVE_ENTRY:
      return state.filter((goal) =>
        goal !== action.payload.goal
      )
    case BingoAction.UPDATE_ENTRY:
      return [
        ...state,
        {
          goal: action.payload.goal
        }
      ]
    default:
      return state
  }
}
