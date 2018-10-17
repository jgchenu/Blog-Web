import React from "react";
import { Menu, Icon, Button, Form, Input, Modal, message } from "antd";
import "./index.less";
import api from "@/lib/api.js";
import history from "../../router/history";
import routes from "../../router/routes";
const { person, user } = api;
const FormItem = Form.Item;

class NavLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      introduction: "",
      visible: false,
      status: "",
      user: {}
    };
  }
  componentWillMount() {
    this.loadData();
    this.initUser();
  }
  initUser = () => {
    if (localStorage.token) {
      this.$axios({
        url: `${user}/info`
      }).then(res => {
        if (res.data.code === 200) {
          let data = res.data.data;
          this.setState({
            user: {
              avatar: data.avatar,
              userName: data.userName
            }
          });
        }
      });
    }
  };
  showModal = status => {
    this.setState({
      visible: true,
      status
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.handleLogReg(values);
      }
    });
  };
  handleLogReg = values => {
    this.$axios({
      url: `${user}/${this.state.status}`,
      method: "post",
      data: values
    }).then(res => {
      if (res.data.code === 200) {
        message.success(res.data.message, 1);
        if (this.state.status === "login") {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("token_exp", new Date().getTime());
          this.setState({
            user: {
              avatar: res.data.avatar,
              userName: res.data.userName
            }
          });
          this.handleCancel();
        }
      } else {
        message.error(res.data.message);
      }
    });
  };

  delToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    this.setState({
      user: {}
    });
  }

  handleClickMenu = ({ key }) => {
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
      url: `${person}`,
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

  render() {
    const { getFieldDecorator } = this.props.form;

    let item = routes.slice(0, 5).find(item => {
      return history.location.pathname.indexOf(item.path) !== -1;
    });
    return (
      <div className="navLeft">
        <div className="avatarCard">
          <img src={this.state.avatar} alt="" className="avatarImg" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[(item && item.path) || ""]}
          onClick={this.handleClickMenu}
        >
          {this.returnItems()}
        </Menu>
        {this.state.user.avatar ? (
          <div className="loginMessage">
            <img src={this.state.user.avatar} alt="" width={50} />
            <div>{this.state.user.userName}</div>
          </div>
        ) : (
          <div className="regLogButton">
            <Button
              type="primary"
              ghost
              className="login"
              onClick={() => this.showModal("login")}
            >
              登录
            </Button>
            <Button
              type="danger"
              ghost
              className="register"
              onClick={() => this.showModal("register")}
            >
              注册
            </Button>
          </div>
        )}

        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          title={this.state.status === "login" ? "登录" : "注册"}
          footer={null}
          className="loginModel"
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator("userName", {
                rules: [{ required: true, message: "请输入你的用户名" }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "请输入密码" }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {this.state.status === "login" ? "登录" : "注册"}
              </Button>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
const WrappedNavLeft = Form.create()(NavLeft);
export default WrappedNavLeft;
