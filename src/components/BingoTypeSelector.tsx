import React from "react"

class BingoTypeSelector extends React.Component {
  render() {
    return (
      <select id="bingotype">
        <option value="hex">HexBingo</option>
        <option value="mission">Mission Bingo</option>
      </select>
    )
  }
}

export default BingoTypeSelector
