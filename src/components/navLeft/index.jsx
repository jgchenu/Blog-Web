import React from "react";
import {
  Menu,
  Icon,
  Button,
  Form,
  Input,
  Modal,
  message,
  Popover,
  Upload
} from "antd";
import "./index.less";
import api from "@/lib/api.js";
import { connect } from "react-redux";
import { login, getInfo, logout, updateAvatar } from "@/redux/user.redux";
import { getAdminInfo } from "@/redux/admin.redux";
import history from "../../router/history";
import routes from "../../router/routes";

const { user } = api;
const FormItem = Form.Item;

@connect(
  state => state,
  { login, getInfo, logout, updateAvatar, getAdminInfo }
)
class NavLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      introduction: "",
      visible: false,
      status: "",
      loading: false
    };
  }
  componentWillMount() {
    this.loadAdminData();
    this.initUser();
  }
  initUser = () => {
    if (localStorage.token) {
      this.props.getInfo();
    }
  };
  loadAdminData = () => {
    this.props.getAdminInfo();
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
        if (this.state.status === "login") {
          this.props.login(res.data);
        } else {
          message.success(res.data.message, 1);
        }
        this.handleCancel();
      } else {
        message.error(res.data.message);
      }
    });
  };
  handleLogout = () => {
    this.props.logout();
  };
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
  beforeUpload = file => {
    const isJPG = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJPG) {
      message.error("你只能选择图片");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片大小不能超过2M");
    }
    return isJPG && isLt2M;
  };

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      this.setState({
        loading: false
      });
      if (info.file.response.code === 200) {
        this.props.updateAvatar(info.file.response);
      }
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    let item = routes.slice(0, 5).find(item => {
      return history.location.pathname.indexOf(item.path) !== -1;
    });
    return (
      <div className="navLeft">
        <div className="avatarCard">
          <img src={this.props.admin.avatar} alt="" className="avatarImg" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[(item && item.path) || ""]}
          onClick={this.handleClickMenu}
        >
          {this.returnItems()}
        </Menu>
        {this.props.user.avatar ? (
          <Popover
            content={
              <div>
                <div onClick={() => this.showModal("editAvatar")}>
                  <a>更换头像</a>
                </div>
                <div onClick={this.handleLogout}>
                  <a>注销</a>
                </div>
              </div>
            }
            title={<div>{this.props.user.userName}</div>}
            trigger="hover"
            placement="right"
          >
            <div className="loginMessage">
              <img src={this.props.user.avatar} alt="" width={50} />
            </div>
          </Popover>
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
          title={
            this.state.status === "login"
              ? "登录"
              : this.state.status === "register"
                ? "注册"
                : "更换头像"
          }
          footer={null}
          className="loginModel"
        >
          {/(login|register)/.test(this.state.status) ? (
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
          ) : (
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/user/editAvatar"
              headers={{
                Authorization: "Bearer " + localStorage.getItem("token")
              }}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {this.props.user.avatar ? (
                <img
                  src={this.props.user.avatar}
                  alt="avatar"
                  className="ant-upload"
                />
              ) : (
                uploadButton
              )}
            </Upload>
          )}
        </Modal>
      </div>
    );
  }
}
const WrappedNavLeft = Form.create()(NavLeft);
export default WrappedNavLeft;
