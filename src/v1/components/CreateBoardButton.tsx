import React from "react";

import {GenerateBoard} from "../hexbingo";

class CreateBoardButton extends React.Component {
  render() {
    return (
      <button type="submit" onClick={() => GenerateBoard()}>
        Generate Board
      </button>
    );
  }
}

export default CreateBoardButton;
