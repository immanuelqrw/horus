import React from "react"

import "@assets/css/hexbingo.css"

import MissionObjective from "@components/MissionObjective"

class MissionObjectives extends React.Component {
  render() {
    return (
      <table
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
            <MissionObjective rowId={1}/>
          </tr>
          <tr>
            <MissionObjective rowId={2}/>
          </tr>
          <tr>
            <MissionObjective rowId={3}/>
          </tr>
          <tr>
            <MissionObjective rowId={4}/>
          </tr>
          <tr>
            <MissionObjective rowId={5}/>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default MissionObjectives
