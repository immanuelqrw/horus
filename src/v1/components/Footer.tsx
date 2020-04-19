import React from "react";

import "../hexbingo.css";

class Footer extends React.Component {
  render() {
    return (
      <div
        style={{
          overflow: "hidden",
          position: "fixed",
          bottom: 0,
          height: "20px",
          backgroundColor: "black",
          width: "100%"
        }}
      >
        <table
          style={{
            padding: 0,
            margin: -5,
            minWidth: "500px",
            width: "100%",
            height: "20px"
          }}
        >
          <tbody>
            <tr style={{width: "100%"}}>
              <td
                style={{
                  color: "grey",
                  paddingLeft: "10px"
                }}
              >
                Version 0.0.2-Alpha Developed by Reizu 2019
              </td>
              <td
                style={{
                  textAlign: "center",
                  color: "lightgrey",
                  width: "10em"
                }}
              >
                Seed:{" "}
                <b
                  id="seeddisplay"
                  style={{
                    color: "orange"
                  }}
                >
                  1234567890
                </b>
              </td>
              <td
                style={{
                  width: "7em"
                }}
              >
                <button
                  style={{
                    float: "right",
                    margin: "2px",
                    marginRight: "20px",
                    padding: "0px"
                  }}
                  onClick={() => alert('Click a hex to mark completed.\nRight-click a hex to mark undesired.\nYou can also use the scroll wheel to set individual goal progress\n\nAny row is valid, but shorter rows will have harder goals.')}
                >
                  HexBingo Info
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Footer;
