import React from "react"

import "@assets/css/hexbingo.css"

import MissionObjectives from "@components/MissionObjectives"

class MissionBoard extends React.Component {
  render() {
    return (
      <div
        id="rowContainer"
        hidden={true}
        style={{
          position: "absolute",
          overflow: "hidden",
          width: "100%",
          color: "white"
        }}
      >
        <MissionObjectives/>
      </div>
    )
  }
}

export default MissionBoard
