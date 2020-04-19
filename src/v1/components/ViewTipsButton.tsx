import React from "react";
import $ from "jquery";

class ViewTipsButton extends React.Component {
  render() {
    return (
      <button
        id="tipsbutton"
        hidden={true}
        onMouseEnter={() => $('#tips').show()}
        onMouseLeave={() => $('#tips').hide()}
      >
        Tips
      </button>
    );
  }
}

export default ViewTipsButton;
