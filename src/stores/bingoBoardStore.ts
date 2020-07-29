import { rootReducer } from "@reducers/rootReducer"
import { BingoBoardState } from "@services/bingo/bingoBoardState"
import { createStore, Store } from "redux"

export function configureStore(): Store<BingoBoardState> {
  return createStore(
    rootReducer,
    undefined
  )
}
