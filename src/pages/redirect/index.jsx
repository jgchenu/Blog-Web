import React from "react";
import  history  from "@/router/history";
class MyRedirect extends React.Component {
  state = {};
  redirect = () => {
    history.push("/article");
  };
  render() {
    this.redirect();
    return null;
  }
}

export default MyRedirect;
