import React from "react";
import "./index.less";
import MyCard from "@/pages/home/container/myCard";
import api from "@/lib/api";
import { Pagination } from "antd";
const {  tag } = api;
class Article extends React.Component {
  state = {
    indexList: [],
    allCount: 0,
    name: this.props.match.params.name
  };
  componentWillMount() {
    this.page = sessionStorage.getItem("page") || 1;
    sessionStorage.setItem("page", this.page);
    this.loadData(this.page, 10, this.state.name);
  }
  loadData = (page = 1, pageSize = 10, name = "测试") => {
    this.getTagArticle(page, pageSize, name);
  };
  getTagArticle = (page, pageSize = 10, name) => {
    this.$axios({
      url: `${tag}/${name}`,
      method: "get",
      params: {
        page,
        pageSize
      }
    }).then(res => {
      this.setState({
        indexList: res.data.data,
        allCount: res.data.count
      });
    });
  };
  onChange = (page, pageSize) => {
    this.page = page;
    sessionStorage.setItem("page", this.page);
    this.loadData(page, pageSize, this.state.name);
  };
  render() {
    return (
      <div className="home">
        <div className="lists">
          {this.state.indexList.map((item, index) => (
            <MyCard list={item} key={index} />
          ))}
        </div>
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

export default Article;
