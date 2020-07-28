import React from "react"

import "@assets/css/hexbingo.css"

import {handleRowClick, highlightRowHover} from "@services/hexbingo"

class HexHeaderGrid extends React.Component {
  render() {
    return (
      <ul id="hexheaderGrid">
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderBP"
            onClick={() => handleRowClick('BP')}
            onMouseOver={() => highlightRowHover('BP')}
          >
            <span className="headerspan">
              <span className="TextP">P-</span>
              <span className="TextB">-B</span>
            </span>
          </a>
        </li>
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderGP"
            onClick={() => handleRowClick('GP')}
            onMouseOver={() => highlightRowHover('GP')}
          >
            <span className="headerspan">
              <span className="TextP">P-</span>
              <span className="TextG">-G</span>
            </span>
          </a>
        </li>
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderRG"
            onClick={() => handleRowClick('RG')}
            onMouseOver={() => highlightRowHover('RG')}
          >
            <span className="headerspan">
              <span className="TextR">R-</span>
              <span className="TextG">-G</span>
            </span>
          </a>
        </li>
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderRY"
            onClick={() => handleRowClick('RY')}
            onMouseOver={() => highlightRowHover('RY')}
          >
            <span className="headerspan">
              <span className="TextR">R-</span>
              <span className="TextY">-Y</span>
            </span>
          </a>
        </li>
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderOY"
            onClick={() => handleRowClick('OY')}
            onMouseOver={() => highlightRowHover('OY')}
          >
            <span className="headerspan">
              <span className="TextO">O-</span>
              <span className="TextY">-Y</span>
            </span>
          </a>
        </li>
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderRO"
            onClick={() => handleRowClick('RO')}
            onMouseOver={() => highlightRowHover('RO')}
          >
            <span className="headerspan">
              <span className="TextO">O-</span>
              <span className="TextR">-R</span>
            </span>
          </a>
        </li>
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderOP"
            onClick={() => handleRowClick('OP')}
            onMouseOver={() => highlightRowHover('OP')}
          >
            <span className="headerspan">
              <span className="TextO">O-</span>
              <span className="TextP">-P</span>
            </span>
          </a>
        </li>
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderYP"
            onClick={() => handleRowClick('YP')}
            onMouseOver={() => highlightRowHover('YP')}
          >
            <span className="headerspan">
              <span className="TextY">Y-</span>
              <span className="TextP">-P</span>
            </span>
          </a>
        </li>
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderYB"
            onClick={() => handleRowClick('YB')}
            onMouseOver={() => highlightRowHover('YB')}
          >
            <span className="headerspan">
              <span className="TextY">Y-</span>
              <span className="TextB">-B</span>
            </span>
          </a>
        </li>
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderGB"
            onClick={() => handleRowClick('GB')}
            onMouseOver={() => highlightRowHover('GB')}
          >
            <span className="headerspan">
              <span className="TextG">G-</span>
              <span className="TextB">-B</span>
            </span>
          </a>
        </li>
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderRP"
            onClick={() => handleRowClick('RP')}
            onMouseOver={() => highlightRowHover('RP')}
          >
            <span className="headerspan">
              <span className="TextP">P-</span>
              <span className="TextR">-R</span>
            </span>
          </a>
        </li>
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderRB"
            onClick={() => handleRowClick('RB')}
            onMouseOver={() => highlightRowHover('RB')}
          >
            <span className="headerspan">
              <span className="TextB">B-</span>
              <span className="TextR">-R</span>
            </span>
          </a>
        </li>
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderOB"
            onClick={() => handleRowClick('OB')}
            onMouseOver={() => highlightRowHover('OB')}
          >
            <span className="headerspan">
              <span className="TextB">B-</span>
              <span className="TextO">-O</span>
            </span>
          </a>
        </li>
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderOG"
            onClick={() => handleRowClick('OG')}
            onMouseOver={() => highlightRowHover('OG')}
          >
            <span className="headerspan">
              <span className="TextG">G-</span>
              <span className="TextO">-O</span>
            </span>
          </a>
        </li>
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderYG"
            onClick={() => handleRowClick('YG')}
            onMouseOver={() => highlightRowHover('YG')}
          >
            <span className="headerspan">
              <span className="TextG">G-</span>
              <span className="TextY">-Y</span>
            </span>
          </a>
        </li>
      </ul>
    )
  }
}

export default HexHeaderGrid
