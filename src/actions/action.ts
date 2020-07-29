import { BingoAction } from "@actions/bingoAction"
import { Payload } from "@actions/payload"

export interface Action {
  type: BingoAction
  payload: Payload
}
