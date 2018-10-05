import React from "react";
import { Timeline, Icon } from "antd";
import "./index.less";
import history from "@/router/history";
import api from "@/lib/api";
const { archive } = api;
class Archive extends React.Component {
  state = { indexList: [] };
  componentWillMount() {
    this.loadData();
  }
  loadData = () => {
    this.$axios({
      url: archive,
      method: "get"
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({
          indexList: res.data.data
        });
      }
    });
  };
  renderTimeItem = () => {
    return this.state.indexList.map((item, index) => (
      <Timeline.Item
        key={index}
        onClick={this.goDetail.bind(this, item.id)}
        dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
        color="blue"
       
      >
        <div  style={{cursor:'pointer'}}>{item.title}<br/>{item.createdAt} </div>
      </Timeline.Item>
    ));
  };
  goDetail(id) {
    history.push(`/detail/${id}`);
  }
  render() {
    return (
      <div className="archive">
        <Timeline mode="alternate">{this.renderTimeItem()}</Timeline>
      </div>
    );
  }
}

export default Archive;
