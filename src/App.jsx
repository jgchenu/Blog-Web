import React from "react";
import { Layout } from "antd";
import NavLeft from "./components/navLeft/index";
import MyHeader from "./components/header/index";
import './styles/App.less'
const { Content } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
    menu: ["首页", "归档", "标签", "关于我", "留言板"],
    activeKey: "1"
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  handleClickMenu = key => {
    this.setState({
      activeKey: key
    });
  };
  render() {
    return (
      <Layout className='container'>
        <NavLeft
          activeKey={this.state.activeKey}
          onClickMenu={this.handleClickMenu}
        />
        <Layout className='right'>
          <MyHeader headerText={this.state.menu[this.state.activeKey]} />
          <Content
            style={{
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default App;
