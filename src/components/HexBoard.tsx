import React from "react"

import "@assets/css/hexbingo.css"
import HexHeaderGrid from "@components/HexHeaderGrid"
import HexButtonGrid from "@components/HexButtonGrid"

class HexBoard extends React.Component {
  render() {
    return (
      <div id="hexContainer" hidden={true}>
        <div
          style={{
            position: "absolute",
            width: "100%"
          }}
        >
          <HexHeaderGrid/>
        </div>
        <div
          style={{
            position: "absolute",
            width: "100%"
          }}
        >
          <HexButtonGrid/>
        </div>
      </div>
    )
  }
}

export default HexBoard
