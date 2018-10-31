import React from "react";
import { message } from "antd";
import { connect } from "react-redux";
import { logout } from "@/redux/user.redux";
@connect(
  state => state,
  { logout }
)
class AuthRoute extends React.Component {
  componentWillMount() {
    if (!localStorage.token || localStorage.token_exp < +Date.now()) {
      localStorage.clear();
      this.props.logout();
      message.error("登录信息过期，请重新登录", 1);
    }
  }
  render() {
    return null;
  }
}
export default AuthRoute;
