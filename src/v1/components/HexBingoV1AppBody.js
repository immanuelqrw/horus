import React from "react";

import {fitToParent} from "../hexbingo";

import "../hexbingo.css";

import Rules from "./Rules";
import Tips from "./Tips";
import BingoHeader from "./BingoHeader";
import MissionBoard from "./MissionBoard";
import HexBoard from "./HexBoard";
import Footer from "./Footer";

class HexBingoV1AppBody extends React.Component {
  render() {
    return (
      <div
        bgcolor="black"
        onresize={() => {fitToParent(".hexspan"); fitToParent(".rowspan")}} >
        {/*<Rules/>*/}
        {/*<Tips/>*/}
        <BingoHeader/>
        <MissionBoard/>
        <HexBoard/>
        <Footer/>
      </div>
    );
  }
}

export default HexBingoV1AppBody;
