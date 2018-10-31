import React from "react";
import { message } from "antd";
class AuthRoute extends React.Component {
  componentWillMount() {
    if (!localStorage.token || localStorage.token_exp < +Date.now()) {
      localStorage.clear();
      message.error("登录信息过期，请重新登录", 1);
    }
  }
  render() {
    return null;
  }
}
export default AuthRoute;
