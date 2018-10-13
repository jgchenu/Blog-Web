import React from "react";
import { Timeline, Icon, Pagination } from "antd";
import "./index.less";
import history from "@/router/history";
import api from "@/lib/api";
import getPage from "@/lib/getPage";
const { archive } = api;
class Archive extends React.Component {
  state = { indexList: [], allCount: 0 };
  componentWillMount() {
    this.page = getPage();
    this.loadData();
  }
  loadData = (page = 1, pageSize = 10) => {
    this.$axios({
      url: archive,
      method: "get",
      params: {
        page,
        pageSize
      }
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({
          indexList: res.data.data,
          allCount: res.data.count
        });
      }
    });
  };
  onChange = (page, pageSize) => {
    document.scrollingElement.scrollTop = 0;
    history.push(`/archive/?page=${page}`);
    this.page = getPage();
    this.loadData(page, pageSize);
  };
  renderTimeItem = () => {
    return this.state.indexList.map((item, index) => (
      <Timeline.Item
        key={index}
        onClick={this.goDetail.bind(this, item.id)}
        dot={<Icon type="clock-circle-o" style={{ fontSize: "16px" }} />}
        color="blue"
      >
        <div style={{ cursor: "pointer" }}>
          {item.title}
          <br />
          {item.createdAt}{" "}
        </div>
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
        <div className="footer">
          <Pagination
            defaultCurrent={parseInt(this.page, 10)}
            total={this.state.allCount}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default Archive;
