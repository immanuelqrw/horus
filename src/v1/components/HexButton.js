import React from "react";

import "../hexbingo.css";
import {ClearHover, hexLClick, hexRClick, SetHover} from "../hexbingo";

class HexButton extends React.Component {
  constructor(props) {
    super(props);
    this.innerReference = React.createRef();
  }

  render() {
    return (
          <a
            id={this.props.id}
            className={this.props.className}
            onMouseOver={this.props.onMouseOver}
            onMouseOut={() => ClearHover()}
            ref={this.innerReference}
            onClick={() => hexLClick(this.innerReference.current)}
            onContextMenu={(e) => {e.preventDefault(); hexRClick(this.innerReference.current); return false}}
          >
            <h1 />
            <span className="hexspan" />
          </a>
    );
  }
}

export default HexButton;
