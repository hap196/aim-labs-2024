import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import StockPage from "./StockPage";
import NavBar from "./NavBar";
import PredictionPage from "./PredictionPage";
import About from "./About";
import "./App.css";

class Routes extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/stockpage" component={StockPage} />
          <Route exact path="/" component={PredictionPage} />
          <Route exact path="/about" component={About} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
