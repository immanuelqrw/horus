import React from "react"

import "@assets/css/hexbingo.css"

import BingoTypeSelector from "@components/BingoTypeSelector"
import BingoGameSelector from "@components/BingoGameSelector"
import SeedInput from "@components/SeedInput"
import CreateBoardButton from "@components/CreateBoardButton"
import ViewRulesButton from "@components/ViewRulesButton"
import ViewTipsButton from "@components/ViewTipsButton"

class BingoHeader extends React.Component {
  render() {
    return (
      <div
        style={{
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "2%",
          paddingRight: "8%",
          paddingBottom: "10px",
          minWidth: "500px",
        }}
      >
        <span
          style={{
            padding: "5px",
            fontSize: "1.5em"
          }}
        >
          <span className="TextR">H</span>
          <span className="TextO">e</span>
          <span className="TextY">x</span>
          <span className="TextG">B</span>
          <span className="TextB">i</span>
          <span className="TextP">n</span>
          <span className="TextR">g</span>
          <span className="TextO">o</span>
        </span>
        &nbsp;
        <BingoTypeSelector/>
        &nbsp;
        <BingoGameSelector/>
        &nbsp;
        <SeedInput/>
        &nbsp;
        <CreateBoardButton/>
        &nbsp;
        {/*<ViewRulesButton/>*/}
        &nbsp;
        {/*<ViewTipsButton/>*/}
      </div>
    )
  }
}

export default BingoHeader
