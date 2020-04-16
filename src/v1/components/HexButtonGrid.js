import React from "react";

import "../hexbingo.css";

import {SetHover} from "../hexbingo";
import HexButton from "./HexButton";

class HexButtonGrid extends React.Component {
  render() {
    return (
      <ul id="hexGrid">
        <li className="hex">
          <HexButton
            id="hex1"
            className="hexIn EndR"
            onMouseOver={() => SetHover(1)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex2"
            className="hexIn EndR"
            onMouseOver={() => SetHover(2)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex3"
            className="hexIn EndO"
            onMouseOver={() => SetHover(3)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex4"
            className="hexIn EndP"
            onMouseOver={() => SetHover(4)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex5"
            className="hexIn MidPR"
            onMouseOver={() => SetHover(5)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex6"
            className="hexIn MidRO"
            onMouseOver={() => SetHover(6)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex7"
            className="hexIn EndO"
            onMouseOver={() => SetHover(7)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex8"
            className="hexIn EndP"
            onMouseOver={() => SetHover(8)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex9"
            className="hexIn MidBP"
            onMouseOver={() => SetHover(9)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex10"
            className="hexIn CenterW"
            onMouseOver={() => SetHover(10)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex11"
            className="hexIn MidOY"
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex12"
            className="hexIn EndY"
            onMouseOver={() => SetHover(12)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex13"
            className="hexIn EndB"
            onMouseOver={() => SetHover(13)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex14"
            className="hexIn MidGB"
            onMouseOver={() => SetHover(14)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex15"
            className="hexIn MidYG"
            onMouseOver={() => SetHover(15)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex16"
            className="hexIn EndY"
            onMouseOver={() => SetHover(16)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex17"
            className="hexIn EndB"
            onMouseOver={() => SetHover(17)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex18"
            className="hexIn EndG"
            onMouseOver={() => SetHover(18)}
          />
        </li>
        <li className="hex">
          <HexButton
            id="hex19"
            className="hexIn EndG"
            onMouseOver={() => SetHover(19)}
          />
        </li>
      </ul>
    );
  }
}

export default HexButtonGrid;
