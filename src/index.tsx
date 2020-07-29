import { BingoPage } from "@layouts/BingoPage"
import { configureStore } from "@stores/bingoBoardStore"
import { createBrowserHistory } from "history"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Route, Router, Switch } from "react-router-dom"

const rootElement = document.getElementById("root")
const hist = createBrowserHistory()
const bingoBoardStore = configureStore()

ReactDOM.render(
  <Provider store={bingoBoardStore}>
    <Router history={hist}>
      <Switch>
        <Route path="/" component={BingoPage} />
      </Switch>
    </Router>
  </Provider>,
  rootElement
)
