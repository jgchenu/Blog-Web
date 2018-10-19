import React from "react";
import E from "wangeditor";
import { Button, List, Avatar, Pagination, Card, message } from "antd";
import api from "@/lib/api";
import getPage from "@/lib/getPage";
import "./index.less";
import { Object } from "core-js";
import history from "@/router/history";

const { comment } = api;

class MessageBoard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editorContent: "",
      allCount: 10,
      indexList: [],
      applyPerson: {},
      commentId: ""
    };
  }
  componentWillMount() {
    this.page = getPage();
    this.loadData(this.page, 10);
  }
  componentDidMount() {
    this.initEdit();
  }

  loadData = (page = 1, pageSize = 10) => {
    this.$axios({
      url: `${comment}/board`,
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
  initEdit = () => {
    const elem = this.refs.editorElem;
    this.editor = new E(elem);
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    this.editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      });
    };
    this.editor.create();
  };
  onChange = (page, pageSize) => {
    document.scrollingElement.scrollTop = 0;
    history.push(`/messageBoard/?page=${page}`);
    this.page = getPage();
    this.loadData(page, pageSize);
  };
  handleRenderItem = item => {
    return (
      <div>
        <List.Item className="comment">
          <List.Item.Meta
            avatar={<Avatar src={item.sayUser.avatar} />}
            title={<a>{item.sayUser.userName}</a>}
            description={
              <div>
                <div dangerouslySetInnerHTML={{ __html: item.content }} />
                <div
                  className="applyButton"
                  onClick={() => this.handleApply(item.sayUser, item.id)}
                >
                  回复
                </div>
              </div>
            }
          />
        </List.Item>
        {item.apply.map((subItem, index) => (
          <List.Item className="apply" key={index}>
            <List.Item.Meta
              avatar={<Avatar src={subItem.applySayUser.avatar} />}
              title={<a>{subItem.applySayUser.userName}</a>}
              description={
                <div>
                  <strong>
                    @ <Avatar src={subItem.applyToUser.avatar} />
                    &nbsp;
                    {subItem.applyToUser.userName}
                    &nbsp;&nbsp;&nbsp;
                  </strong>
                  <div dangerouslySetInnerHTML={{ __html: subItem.content }} />
                  <div
                    className="applyButton"
                    onClick={() =>
                      this.handleApply(subItem.applySayUser, item.id)
                    }
                  >
                    回复
                  </div>
                </div>
              }
            />
          </List.Item>
        ))}
      </div>
    );
  };
  handleApply = (applyPerson, commentId) => {
    document.scrollingElement.scrollTop =
      document.scrollingElement.scrollHeight;
    this.editor.txt.html(this.state.editorContent);
    this.setState({
      applyPerson,
      commentId
    });
  };
  handleCancelApply = () => {
    this.setState({
      applyPerson: {},
      commentId: ""
    });
  };
  handleSubmit = () => {
    let requestData = {
      commentType: 2,
      content: this.state.editorContent
    };
    if (this.state.commentId) {
      Object.assign(requestData, {
        toId: this.state.applyPerson.id,
        commentId: this.state.commentId
      });
    }
    this.$axios({
      url: comment,
      method: "post",
      data: requestData
    }).then(res => {
      if (res.data.code === 200) {
        this.handleCancelApply();
        this.loadData();
        this.editor.txt.clear();
        this.setState(
          {
            editorContent: ""
          },
          () => {
            message.success("发布成功", 1);
          }
        );
      }
    });
  };

  render() {
    return (
      <div className="messageBoard">
        <h2>我想是时候开个留言板让大家吐槽了:)</h2>
        <div className="boardContent">
          <List
            header={<div>评论</div>}
            itemLayout="horizontal"
            dataSource={this.state.indexList}
            renderItem={this.handleRenderItem}
          />
        </div>
        <div className="editor">
          <Card
            title={
              this.state.applyPerson.userName ? (
                <div>
                  回复 <Avatar src={this.state.applyPerson.avatar} />
                  &nbsp;
                  {this.state.applyPerson.userName}:
                  <a onClick={this.handleCancelApply}>&nbsp;&nbsp;取消</a>
                </div>
              ) : (
                "评论"
              )
            }
            bordered={false}
            style={{ width: "100%" }}
          >
            <div ref="editorElem" style={{ textAlign: "left" }} />
            <div className="button">
              <Button type="primary" onClick={this.handleSubmit}>
                发布
              </Button>
            </div>
          </Card>
        </div>

        <div className="footer">
          <Pagination
            defaultCurrent={parseInt(1, 10)}
            total={this.state.allCount}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default MessageBoard;
