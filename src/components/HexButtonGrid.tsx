import React from "react"

import "@assets/css/hexbingo.css"

import {setHexHover} from "@services/hexbingo"
import HexButton from "@components/HexButton"

class HexButtonGrid extends React.Component {
  render() {
    return (
      <ul id="hexGrid">
        <li className="hex">
          <HexButton
            id="hex1"
            className="hexIn EndR"
            onMouseOver={() => setHexHover(1)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex2"
            className="hexIn EndR"
            onMouseOver={() => setHexHover(2)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex3"
            className="hexIn EndO"
            onMouseOver={() => setHexHover(3)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex4"
            className="hexIn EndP"
            onMouseOver={() => setHexHover(4)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex5"
            className="hexIn MidPR"
            onMouseOver={() => setHexHover(5)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex6"
            className="hexIn MidRO"
            onMouseOver={() => setHexHover(6)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex7"
            className="hexIn EndO"
            onMouseOver={() => setHexHover(7)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex8"
            className="hexIn EndP"
            onMouseOver={() => setHexHover(8)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex9"
            className="hexIn MidBP"
            onMouseOver={() => setHexHover(9)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex10"
            className="hexIn CenterW"
            onMouseOver={() => setHexHover(10)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex11"
            className="hexIn MidOY"
            onMouseOver={() => setHexHover(11)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex12"
            className="hexIn EndY"
            onMouseOver={() => setHexHover(12)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex13"
            className="hexIn EndB"
            onMouseOver={() => setHexHover(13)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex14"
            className="hexIn MidGB"
            onMouseOver={() => setHexHover(14)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex15"
            className="hexIn MidYG"
            onMouseOver={() => setHexHover(15)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex16"
            className="hexIn EndY"
            onMouseOver={() => setHexHover(16)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex17"
            className="hexIn EndB"
            onMouseOver={() => setHexHover(17)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex18"
            className="hexIn EndG"
            onMouseOver={() => setHexHover(18)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex19"
            className="hexIn EndG"
            onMouseOver={() => setHexHover(19)}
          />
        </li>
      </ul>
    )
  }
}

export default HexButtonGrid
