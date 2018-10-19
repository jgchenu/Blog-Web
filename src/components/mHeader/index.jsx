import React from "react";
import { Menu, Icon } from "antd";
import "./index.less";
import history from "../../router/history";
import routes from "../../router/routes";
import { connect } from "react-redux";

@connect(state => state)
class NavLeft extends React.Component {
  state = {
    show: true
  };
  handleClickMenu = ({ key }) => {
    if (key === "/home") {
      sessionStorage.setItem("page", 1);
    }
    history.push(key);
  };
  returnItems = () => {
    let routeMenus = routes.slice(0, 5);
    return routeMenus.map(item => (
      <Menu.Item key={item.path}>
        <Icon type={item.iconType} />
        <span>{item.title}</span>
      </Menu.Item>
    ));
  };
  handleClickShow() {
    this.setState({
      show: !this.state.show
    });
  }
  render() {
    return (
      <div className="mobileHeader">
        <Icon
          type={this.state.show ? "up-circle" : "down-circle"}
          theme="twoTone"
          twoToneColor="#4fc3f7"
          // className="showIcon"
          style={{
            fontSize: 30,
            marginRight: 20,
            position: "absolute",
            right: ".6rem",
            top: "1.5rem"
          }}
          onClick={this.handleClickShow.bind(this)}
        />

        <div style={{ display: this.state.show ? "block" : "none" }}>
          <div className="avatarCard">
            <img src={this.props.admin.avatar} alt="" />
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
      </div>
    );
  }
}
export default NavLeft;
