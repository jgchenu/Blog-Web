import React from "react";
import { Layout } from "antd";
import NavLeft from "./components/navLeft/index";
import MyHeader from "./components/header/index";
import "./styles/App.less";
const { Content,Sider } = Layout;

class App extends React.Component {
  state = {};

  render() {
    return (
      <Layout className="container">
        <Sider className="left">
          <NavLeft />
        </Sider>
        <Layout className="right">
          <MyHeader />
          <Content className="content">{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}
export default App;
