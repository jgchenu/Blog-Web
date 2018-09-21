import React from "react";
import { Menu, Icon } from "antd";
import "./index.less";
import history from "../../router/history";
import routes from "../../router/routes";
class NavLeft extends React.Component {
  handleClickMenu = ({ key }) => {
    console.log(key);
    history.push(key);
  };
  returnItems = () => {
    return routes.map(item => (
      <Menu.Item key={item.path}>
        <Icon type={item.iconType} />
        <span>{item.title}</span>
      </Menu.Item>
    ));
  };
  render() {
    return (
      <div>
        <div className="avatarCard">
          <img src="http://test.jgchen.xin/static/images/1.jpg" alt="" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[history.location.pathname]}
          onClick={this.handleClickMenu}
        >
          {this.returnItems()}
        </Menu>
      </div>
    );
  }
}
export default NavLeft;
