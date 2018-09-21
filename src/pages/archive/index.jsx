import React from "react";
import { Timeline } from "antd";
import './index.less'
class Archive extends React.Component {
  state = {};
  render() {
    return (
      <div className='archive'>
        <Timeline>
          <Timeline.Item>你是傻子吗</Timeline.Item>
          <Timeline.Item>
            你应该不是傻子吧
          </Timeline.Item>
          <Timeline.Item>我是傻子吧</Timeline.Item>
          <Timeline.Item>
           我肯定不是傻子
          </Timeline.Item>
        </Timeline>
      </div>
    );
  }
}

export default Archive;
