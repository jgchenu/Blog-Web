import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import App from "@/App.jsx";
import Article from "@/pages/article/index";
import Archive from "@/pages/archive/index";
import Tags from "@/pages/tags/index";
import AboutMe from "@/pages/aboutMe/index";
import MessageBoard from "@/pages/messageBoard/index";
import Detail from "@/pages/detail/index";
import NotFound from "@/pages/notFound/index";
import history from "./history";
import TagArticle from "@/pages/tagArticle/index";
import AuthRoute from "@/pages/auth/index";
import MyRedirect from "@/pages/redirect/index";
import FriendBoard from "@/pages/friendBoard/index"
export default class MyRouter extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            render={() => (
              <App>
                <AuthRoute />
                <Switch>
                  <Route path="/article" component={Article} />
                  <Route path="/tagArticle/:name" component={TagArticle} />
                  <Route path="/archive" component={Archive} />
                  <Route path="/tags" component={Tags} />
                  <Route path="/aboutMe" component={AboutMe} />
                  <Route path="/messageBoard" component={MessageBoard} />
                  <Route path="/detail/:id" component={Detail} />
                  <Route path="/friendBoard" component={FriendBoard} />
                  <Route component={MyRedirect} />
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
