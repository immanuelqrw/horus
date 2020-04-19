import React from "react";

import "../hexbingo.css";

import {hexLClick, hexRClick, SetRowHover, ClearRowHover} from "../hexbingo";

interface Props {
  rowId: number;
}

interface State {
  innerReference: React.RefObject<HTMLTableDataCellElement>;
}

class MissionObjective extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      innerReference: React.createRef()
    };
  }
  
  render() {
    return (
      <td
        id={`row${this.props.rowId}`}
        className="rowcell"
        ref={this.state.innerReference}
        onMouseOver={() => SetRowHover(this.props.rowId)}
        onMouseOut={() => ClearRowHover()}
        onClick={() => hexLClick(this.state.innerReference.current, this.props.rowId + 1)}
        onContextMenu={(e) => {e.preventDefault(); hexRClick(this.state.innerReference.current); return false}}
      >
        <span className="rowspan">Cell {this.props.rowId}</span>
      </td>
    );
  }
}

export default MissionObjective;
