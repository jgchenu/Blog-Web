import React from "react";
import "./index.less";
import MyCard from "./container/myCard";
import api from "../../mockApi/homeList";
class Home extends React.Component {
  state = {
    indexList: api
  };
  render() {
    return (
      <div className="home">
        {this.state.indexList.map((item, index) => (
          <MyCard list={item} key={index} />
        ))}
      </div>
    );
  }
}

export default Home;
