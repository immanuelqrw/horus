import React from "react";

class Tips extends React.Component {
  render() {
    return (
      <div
        id="tips"
        style={{
          display: "none",
          position: "fixed",
          height: "70%",
          zIndex: 2,
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          border: "1px solid grey",
          borderRadius: "5px",
          margin: "50px",
          padding: "20px"
        }}
      >
        <b>Tips</b>
        <span />
      </div>
    );
  }
}

export default Tips;
