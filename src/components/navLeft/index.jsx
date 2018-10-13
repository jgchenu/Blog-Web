import React from "react";
import { Menu, Icon } from "antd";
import "./index.less";
import api from "@/lib/api.js";
import history from "../../router/history";
import routes from "../../router/routes";
const { person } = api;
class NavLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      introduction: ""
    };
  }
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
  loadData = () => {
    this.$axios({
      url: person,
      method: "get"
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({
          introduction: res.data.data.introduction,
          avatar: res.data.data.avatar
        });
      }
    });
  };
  componentWillMount() {
    this.loadData();
  }
  render() {
    let item = routes.slice(0, 5).find(item => {
      return history.location.pathname.indexOf(item.path) !== -1;
    });
    return (
      <div>
        <div className="avatarCard">
          <img src={this.state.avatar} alt="" className='avatarImg'/>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[(item && item.path) || ""]}
          onClick={this.handleClickMenu}
        >
          {this.returnItems()}
        </Menu>
      </div>
    );
  }
}
export default NavLeft;
