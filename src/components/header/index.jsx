import React from "react";
import "./index.less";
import { Layout } from "antd";
const { Header } = Layout;
class MyHeader extends React.Component {
  render() {
    return <Header className="myHeader">{this.props.headerText}</Header>;
  }
}
export default MyHeader;
