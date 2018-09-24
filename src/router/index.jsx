import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/index";
import Archive from "../pages/archive/index";
import Tags from "../pages/tags/index";
import AboutMe from "../pages/aboutMe/index";
import MessageBoard from "../pages/messageBoard/index";
import Detail from '../pages/detail/index'
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
                  <Route path="/archive" component={Archive} />
                  <Route path="/tags" component={Tags} />
                  <Route path="/aboutMe" component={AboutMe} />
                  <Route path="/messageBoard" component={MessageBoard} />
                  <Route path='/detail/:id' component={Detail}/>
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
