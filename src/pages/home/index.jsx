import React from "react";
import "./index.less";
import MyCard from "./container/myCard";
class Home extends React.Component {
  state = {};
  render() {
    return (
      <div className="home">
        <MyCard />
      </div>
    );
  }
}

export default Home;
