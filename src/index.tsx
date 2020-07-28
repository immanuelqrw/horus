import React from "react"
import ReactDOM from "react-dom"
import { createBrowserHistory } from "history"
import { Router, Route, Switch } from "react-router-dom"

import "@assets/css/material-dashboard-react.css?v=1.8.0"

import HexBingoV1AppBody from "@components/HexBingoV1AppBody"

const hist = createBrowserHistory()

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/" component={HexBingoV1AppBody} />
    </Switch>
  </Router>,
  document.getElementById("root")
)
