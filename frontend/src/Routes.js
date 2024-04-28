import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import StockPage from './StockPage';

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/stockpage" component={StockPage} />
          {/* <Route exact path="/analytics" component={Viz} />
          <Route exact path="/categorization" component={Categorization} /> */}
          <Route path="/" exact component={App} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
