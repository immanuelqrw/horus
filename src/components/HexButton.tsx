import React from "react"

import "@assets/css/hexbingo.css"
import {clearHover, handleHexLeftClick, handleHexRightClick} from "@services/hexbingo"

interface Props {
  id: string
  className: string
  onMouseOver: () => void
}

interface State {
  innerReference: React.RefObject<HTMLAnchorElement>
}

class HexButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      innerReference: React.createRef()
    }
  }

  render() {
    return (
      <a
        id={this.props.id}
        className={this.props.className}
        ref={this.state.innerReference}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={() => clearHover()}
        onClick={() => handleHexLeftClick(this.state.innerReference.current)}
        onContextMenu={(e) => {e.preventDefault(); handleHexRightClick(this.state.innerReference.current); return false}}
      >
        <h1 />
        <span className="hexspan" />
      </a>
    )
  }
}

export default HexButton
