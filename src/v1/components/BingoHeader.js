import React from "react";

import "../hexbingo.css";

import BingoTypeSelector from "./BingoTypeSelector";
import BingoGameSelector from "./BingoGameSelector";
import SeedInput from "./SeedInput";
import CreateBoardButton from "./CreateBoardButton";
import ViewRulesButton from "./ViewRulesButton";
import ViewTipsButton from "./ViewTipsButton";

class BingoHeader extends React.Component {
  render() {
    return (
      <div
        height="30px"
        align="center"
        style={{
          paddingRight: "8%",
          paddingLeft: "2%",
          paddingBottom: "10px",
          minWidth: "500px",
          height: "20px"
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
          <BingoTypeSelector/>
          <BingoGameSelector/>
          <SeedInput/>
          <CreateBoardButton/>
          {/*<ViewRulesButton/>*/}
          {/*<ViewTipsButton/>*/}
      </div>
    );
  }
}

export default BingoHeader;
