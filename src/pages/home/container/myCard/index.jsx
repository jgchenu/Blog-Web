import React from "react";
import { Card, Tag } from "antd";
import "./index.less";
export default class MyCard extends React.Component {
  tagColors = [
    "magenta",
    "red",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
    "purple"
  ];

  state = {
    
  };
  render() {
    return (
      <div>
        <Card
          title="我是一个大傻逼"
          style={{ width: "100%" }}
          className="myCard"
        >
          <div className="content">我是一个大傻逼，大傻逼，大傻逼</div>
          <footer className="cardFooter">
            <div className="tags">
              <Tag color="magenta">magenta</Tag>
              <Tag color="red">red</Tag>
              <Tag color="volcano">volcano</Tag>
              <Tag color="orange">orange</Tag>
              <Tag color="gold">gold</Tag>
              <Tag color="lime">lime</Tag>
              <Tag color="green">green</Tag>
              <Tag color="cyan">cyan</Tag>
              <Tag color="blue">blue</Tag>
              <Tag color="geekblue">geekblue</Tag>
              <Tag color="purple">purple</Tag>
            </div>
          </footer>
        </Card>
      </div>
    );
  }
}
