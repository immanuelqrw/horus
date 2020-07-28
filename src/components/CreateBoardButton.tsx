import React from "react"

import {GenerateBoard} from "@services/hexbingo"

function handleBoardGeneration(): GenerateBoard {
  return GenerateBoard()
}

class CreateBoardButton extends React.Component {
  render() {
    return (
      <button type="submit" onClick={handleBoardGeneration}>
        Generate Board
      </button>
    )
  }
}

export default CreateBoardButton
