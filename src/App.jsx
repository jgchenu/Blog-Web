import React from "react";
import { Layout, BackTop, Icon } from "antd";
import NavLeft from "./components/navLeft/index";
import MyHeader from "./components/header/index";
import "./styles/App.less";
import MHeader from "@/components/mHeader";
import CanvasNest from "canvas-nest.js";
const { Content, Sider } = Layout;
const config = {
  color: "0,0,0",
  count: 88,
  opacity:.8
};

class App extends React.Component {
  state = {};
  componentDidMount() {
    var element = document.getElementById("root");
    this.cn = new CanvasNest(element, config);
  }
  componentWillUnmount() {
    this.cn.destroy();
  }
  render() {
    return (
      <Layout className="container">
        <Sider className="left">
          <NavLeft />
        </Sider>
        <Layout className="right">
          <div className="mHeader">
            <MHeader />
          </div>
          <MyHeader />
          <Content className="content">
            {this.props.children}
            <BackTop>
              <div className="ant-back-top-inner">
                <Icon type="caret-up" theme="outlined" />
              </div>
            </BackTop>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default App;
