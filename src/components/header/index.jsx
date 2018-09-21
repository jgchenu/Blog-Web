import React from "react";
import "./index.less";
import { Layout } from "antd";
import history from "../../router/history";
import routes from "../../router/routes";

const { Header } = Layout;
class MyHeader extends React.Component {
  constructor(props) {
    super(props);
    console.log(history);
  }
  state = {};
  render() {
    return (
      <Header className="myHeader">
        {
          routes.find(item => {
            return item.path === history.location.pathname;
          }).title
        }
      </Header>
    );
  }
}
export default MyHeader;
