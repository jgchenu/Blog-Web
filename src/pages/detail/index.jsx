import React from "react";
import MyTag from "./../../components/myTag";
import api from "./../../mockApi/homeList";
class Detail extends React.Component {
  state = {
    indexList: api
  };
  render() {
    const id = this.props.match.params.id;

    return (
      <div>
        <h2>{this.indexList[id].title}</h2>
        <div className="content" />
        <div className="tags">
          <MyTag tags={this.indexList[id].tags}/>
        </div>
        <div className="footer" />
      </div>
    );
  }
}

export default Detail;
