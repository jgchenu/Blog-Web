import React from "react";
import { Layout, Menu, Icon } from "antd";
import "./index.less";

const { Sider } = Layout;
class NavLeft extends React.Component {
  state = {
    menu: ["首页", "归档", "标签", "关于我", "留言板"]
  };
  handleClickMenu = ({ key }) => {
    const { onClickMenu } = this.props;
    onClickMenu(key);
  };

  render() {
    return (
      <Sider trigger={null} collapsible collapsed={false} className="navLeft">
        <div className="avatarCard">
          <img src="http://test.jgchen.xin/static/images/1.jpg" alt="" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[this.props.activeKey]}
          onClick={this.handleClickMenu}
        >
          <Menu.Item key="0">
            <Icon type="home" />
            <span>首页</span>
          </Menu.Item>
          <Menu.Item key="1">
            <Icon type="hourglass" />
            <span>归档</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="tags" />
            <span>标签</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="user" />
            <span>关于我</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="edit" />
            <span>留言板</span>
          </Menu.Item>
          <Menu.Item />
        </Menu>
      </Sider>
    );
  }
}
export default NavLeft;
