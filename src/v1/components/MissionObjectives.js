import React from "react";

import "../hexbingo.css";

import {hexLClick, hexRClick, SetRowHover, ClearRowHover} from "../hexbingo";

class MissionObjectives extends React.Component {
  render() {
    return (
      <table
        border={1}
        style={{
          color: "white",
          textAlign: "center",
          top: 0,
          bottom: 0,
          padding: 0,
          paddingTop: 0
        }}
      >
        <tbody>
          <tr>
            <td
              id="row1"
              className="rowcell"
              onMouseOver={() => SetRowHover(1)}
              onMouseOut={() => ClearRowHover()}
              onClick={() => hexLClick(this, 2)}
              onContextMenu={() => {hexRClick(this); return false}}
            >
              <span className="rowspan">Cell 1</span>
            </td>
          </tr>
          <tr>
            <td
              id="row2"
              className="rowcell"
              onMouseOver={() => SetRowHover(2)}
              onMouseOut={() => ClearRowHover()}
              onClick={() => hexLClick(this, 3)}
              onContextMenu={() => {hexRClick(this); return false}}
            >
              <span className="rowspan">Cell 2</span>
            </td>
          </tr>
          <tr>
            <td
              id="row3"
              className="rowcell"
              onMouseOver={() => SetRowHover(3)}
              onMouseOut={() => ClearRowHover()}
              onClick={() => hexLClick(this, 4)}
              onContextMenu={() => {hexRClick(this); return false}}
            >
              <span className="rowspan">Cell 3</span>
            </td>
          </tr>
          <tr>
            <td
              id="row4"
              className="rowcell"
              onMouseOver={() => SetRowHover(4)}
              onMouseOut={() => ClearRowHover()}
              onClick={() => hexLClick(this, 5)}
              onContextMenu={() => {hexRClick(this); return false}}
            >
              <span className="rowspan">Cell 4</span>
            </td>
          </tr>
          <tr>
            <td
              id="row5"
              className="rowcell"
              onMouseOver={() => SetRowHover(5)}
              onMouseOut={() => ClearRowHover()}
              onClick={() => hexLClick(this)}
              onContextMenu={() => {hexRClick(this); return false}}
            >
              <span className="rowspan">Cell 5</span>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default MissionObjectives;
