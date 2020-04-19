import React from "react";

import "../hexbingo.css";
import HexHeaderGrid from "./HexHeaderGrid";
import HexButtonGrid from "./HexButtonGrid";

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
    );
  }
}

export default HexBoard;
