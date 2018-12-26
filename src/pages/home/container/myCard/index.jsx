import React from "react";
import { Card } from "antd";
import "./index.less";
import history from "@/router/history";
import MyTag from "@/components/myTag/index";
export default class MyCard extends React.Component {
  constructor() {
    super();
    this.goDetail = this.goDetail.bind(this);
  }
  static defaultProps = {
    list: { content: { value: "" } }
  };
  goDetail = (event, id) => {
    if (event.target.className.indexOf("ant-tag") !== -1) {
      const name = event.target.innerText;
      sessionStorage.setItem("page", 1);
      history.push(`/tagArticle/${name}`);
      return;
    }
    history.push(`/detail/${id}`);
  };

  render() {
    let list = this.props.list;
    let content = list.content ? list.content.value : "";
    content = content.length > 30 ? content.substring(0, 100) : content;
    return (
      <div className="page-article-card" onClick={e => this.goDetail(e, list.id)}>
        <Card title={list.title} style={{ width: "100%" }}>
          <div
            className="page-article-card-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <footer className="page-article-card-footer">
            <div className="page-article-card-footer-tags">
              <MyTag tags={list.tags} />
            </div>
          </footer>
        </Card>
      </div>
    );
  }
}
