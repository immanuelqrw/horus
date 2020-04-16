import React from "react";

import "../hexbingo.css";

import {hexLClick, hexRClick, SetRowHover, ClearRowHover} from "../hexbingo";

class MissionObjective extends React.Component {
  constructor(props) {
    super(props);
    this.innerReference = React.createRef();
  }
  
  render() {
    return (
      <td
        id={`row${this.props.rowId}`}
        className="rowcell"
        ref={this.innerReference}
        onMouseOver={() => SetRowHover(this.props.rowId)}
        onMouseOut={() => ClearRowHover()}
        onClick={() => hexLClick(this.innerReference.current, this.props.rowId + 1)}
        onContextMenu={(e) => {e.preventDefault(); hexRClick(this.innerReference.current); return false}}
      >
        <span className="rowspan">Cell {this.props.rowId}</span>
      </td>
    );
  }
}

export default MissionObjective;
