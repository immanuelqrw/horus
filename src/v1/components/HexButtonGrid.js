import React from "react";

import "../hexbingo.css";

import {hexLClick, hexRClick, SetHover, ClearHover} from "../hexbingo";

class HexButtonGrid extends React.Component {
  render() {
    return (
      <ul id="hexGrid">
        <li className="hex">
          <a
            id="hex1"
            className="hexIn EndR"
            onMouseOver={() => SetHover(1)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex2"
            className="hexIn EndR"
            onMouseOver={() => SetHover(2)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex3"
            className="hexIn EndO"
            onMouseOver={() => SetHover(3)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex4"
            className="hexIn EndP"
            onMouseOver={() => SetHover(4)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex5"
            className="hexIn MidPR"
            onMouseOver={() => SetHover(5)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex6"
            className="hexIn MidRO"
            onMouseOver={() => SetHover(6)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex7"
            className="hexIn EndO"
            onMouseOver={() => SetHover(7)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex8"
            className="hexIn EndP"
            onMouseOver={() => SetHover(8)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex9"
            className="hexIn MidBP"
            onMouseOver={() => SetHover(9)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex10"
            className="hexIn CenterW"
            onMouseOver={() => SetHover(10)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex11"
            className="hexIn MidOY"
            onMouseOver={() => SetHover(11)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex12"
            className="hexIn EndY"
            onMouseOver={() => SetHover(12)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex13"
            className="hexIn EndB"
            onMouseOver={() => SetHover(13)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex14"
            className="hexIn MidGB"
            onMouseOver={() => SetHover(14)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex15"
            className="hexIn MidYG"
            onMouseOver={() => SetHover(15)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex16"
            className="hexIn EndY"
            onMouseOver={() => SetHover(16)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex17"
            className="hexIn EndB"
            onMouseOver={() => SetHover(17)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex18"
            className="hexIn EndG"
            onMouseOver={() => SetHover(18)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
        <li className="hex">
          <a
            id="hex19"
            className="hexIn EndG"
            onMouseOver={() => SetHover(19)}
            onMouseOut={() => ClearHover()}
            onClick={() => hexLClick(this)}
            onContextMenu={() => {hexRClick(this); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
        </li>
      </ul>
    );
  }
}

export default HexButtonGrid;
