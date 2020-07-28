import React from "react"
import $ from "jquery"

class ViewRulesButton extends React.Component {
  render() {
    return (
      <button
        id="rulesbutton"
        hidden={true}
        onMouseEnter={() => $('#rules').show()}
        onMouseLeave={() => $('#rules').hide()}
      >
        Rules
      </button>
    )
  }
}

export default ViewRulesButton
