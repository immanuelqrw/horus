import React from "react";

import "../hexbingo.css";

import {RowClick, RowHover} from "../hexbingo";

class HexHeaderGrid extends React.Component {
  render() {
    return (
      <ul id="hexheaderGrid">
        <li className="hexheader">
          <a
            className="hexheaderIn"
            id="hexheaderBP"
            onClick={() => RowClick('BP')}
            onMouseOver={() => RowHover('BP')}
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
            onClick={() => RowClick('GP')}
            onMouseOver={() => RowHover('GP')}
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
            onClick={() => RowClick('RG')}
            onMouseOver={() => RowHover('RG')}
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
            onClick={() => RowClick('RY')}
            onMouseOver={() => RowHover('RY')}
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
            onClick={() => RowClick('OY')}
            onMouseOver={() => RowHover('OY')}
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
            onClick={() => RowClick('RO')}
            onMouseOver={() => RowHover('RO')}
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
            onClick={() => RowClick('OP')}
            onMouseOver={() => RowHover('OP')}
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
            onClick={() => RowClick('YP')}
            onMouseOver={() => RowHover('YP')}
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
            onClick={() => RowClick('YB')}
            onMouseOver={() => RowHover('YB')}
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
            onClick={() => RowClick('GB')}
            onMouseOver={() => RowHover('GB')}
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
            onClick={() => RowClick('RP')}
            onMouseOver={() => RowHover('RP')}
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
            onClick={() => RowClick('RB')}
            onMouseOver={() => RowHover('RB')}
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
            onClick={() => RowClick('OB')}
            onMouseOver={() => RowHover('OB')}
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
            onClick={() => RowClick('OG')}
            onMouseOver={() => RowHover('OG')}
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
            onClick={() => RowClick('YG')}
            onMouseOver={() => RowHover('YG')}
          >
            <span className="headerspan">
              <span className="TextG">G-</span>
              <span className="TextY">-Y</span>
            </span>
          </a>
        </li>
      </ul>
    );
  }
}

export default HexHeaderGrid;
