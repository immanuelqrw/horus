import React from "react";

class Rules extends React.Component {
  render() {
    return (
      <div
        id="rules"
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
        <b>Rules</b>
        <span />
      </div>
    );
  }
}

export default Rules;
