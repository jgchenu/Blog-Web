import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/index";
import NotFound from "../pages/notFound/index";
import history from "./history";
export default class MyRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            render={() => (
              <App>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Redirect to="/home" />
                  <Route component={NotFound} />
                </Switch>
              </App>
            )}
          />
        </Switch>
      </Router>
    );
  }
}
