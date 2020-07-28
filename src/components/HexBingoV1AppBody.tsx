import React from "react"
import "@assets/css/hexbingo.css"

import Rules from "@components/Rules"
import Tips from "@components/Tips"
import BingoHeader from "@components/BingoHeader"
import MissionBoard from "@components/MissionBoard"
import HexBoard from "@components/HexBoard"
import Footer from "@components/Footer"

class HexBingoV1AppBody extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "black",
        }}>
        {/*<Rules/>*/}
        {/*<Tips/>*/}
        <BingoHeader/>
        <MissionBoard/>
        <HexBoard/>
        <Footer/>
      </div>
    )
  }
}

export default HexBingoV1AppBody
