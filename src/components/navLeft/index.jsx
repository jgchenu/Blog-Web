import React from 'react'
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
} from 'antd'
import './index.less'
import api from '@/lib/api.js'
import { connect } from 'react-redux'
import { login, getInfo, logout, updateAvatar } from '@/redux/user.redux'
import { getAdminInfo } from '@/redux/admin.redux'
import history from '../../router/history'
import routes from '../../router/routes'
const FormItem = Form.Item

@connect(
  state => state,
  { login, getInfo, logout, updateAvatar, getAdminInfo }
)
class NavLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      introduction: '',
      visible: false,
      status: '',
      loading: false,
      musicShow: false
    }
  }
  componentDidMount() {
    this.loadAdminData()
    this.initUser()
  }
  initUser = () => {
    if (localStorage.token) {
      this.props.getInfo()
    }
  }
  loadAdminData = () => {
    this.props.getAdminInfo()
  }
  showModal = status => {
    this.setState({
      visible: true,
      status
    })
  }
  handleCancel = () => {
    this.setState({ visible: false })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.handleLogReg(values)
      }
    })
  }
  handleLogReg = async values => {
    let res = {}
    //根据状态判断请求还是注册
    if (this.state.status === 'login') {
      res = await api.loginUser(values)
    } else if (this.state.status === 'register') {
      res = await api.registerUser(values)
    }
    if (res.data.code === 0) {
      if (this.state.status === 'login') {
        this.props.login(res.data)
      } else {
        message.success(res.data.message, 1)
      }
      this.handleCancel()
    } else {
      message.error(res.data.message)
    }
  }
  handleLogout = () => {
    this.props.logout()
  }
  handleClickMenu = ({ key }) => {
    this.props.onHideNavLeft()
    history.push(key)
  }
  returnItems = () => {
    let sliceLength = routes.length - 2
    let routeMenus = routes.slice(0, sliceLength)
    return routeMenus.map(item => (
      <Menu.Item key={item.path}>
        <Icon type={item.iconType} />
        <span>{item.title}</span>
      </Menu.Item>
    ))
  }
  beforeUpload = file => {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJPG) {
      message.error('你只能选择图片')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过2M')
    }
    return isJPG && isLt2M
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({
        loading: false
      })
      if (info.file.response.code === 200) {
        this.props.updateAvatar(info.file.response)
      }
    }
  }
  handleShowMusic = () => {
    this.setState({
      musicShow: true
    })
  }
  handleHideMusic = () => {
    this.setState({
      musicShow: false
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    let item = routes.slice(0, 5).find(item => {
      return history.location.pathname.indexOf(item.path) !== -1
    })
    return (
      <div className="components-nav-left">
        <div className="components-nav-left-content">
          <div className="components-nav-avatar">
            <img
              src={this.props.admin.avatar}
              alt="头像"
              className="components-nav-avatar-img"
            />
            <Icon
              onClick={this.handleShowMusic}
              type="customer-service"
              className="app-container-left-show-music-button"
              style={{
                fontSize: 20,
                position: 'absolute',
                left: '20px',
                top: '20px'
              }}
            />
            <Icon
              onClick={this.props.onHideNavLeft}
              type="close-circle"
              className="app-container-left-show-button"
              style={{
                fontSize: 30,
                position: 'absolute',
                right: '18px',
                top: '18px'
              }}
            />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[(item && item.path) || '']}
            onClick={this.handleClickMenu}
          >
            {this.returnItems()}
          </Menu>
          {this.props.user.avatar ? (
            <Popover
              content={
                <div>
                  <div onClick={() => this.showModal('editAvatar')}>
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
              <div className="components-nav-logined-avatar">
                <span>用户：</span>
                <img src={this.props.user.avatar} alt="" width={50} />
              </div>
            </Popover>
          ) : (
            <div className="components-nav-left-footer">
              <Button
                type="primary"
                ghost
                className="components-nav-left-footer-login"
                onClick={() => this.showModal('login')}
              >
                登录
              </Button>
              <Button
                type="danger"
                ghost
                className="components-nav-left-footer-register"
                onClick={() => this.showModal('register')}
              >
                注册
              </Button>
            </div>
          )}
        </div>
        <div
          className={`components-nav-left-music ${
            this.state.musicShow
              ? 'components-nav-left-music-show'
              : 'components-nav-left-music-hide'
          }`}
        >
          <Icon
            onClick={this.handleHideMusic}
            type="close-circle"
            className="app-container-left-show-music-button"
            style={{
              fontSize: 20,
              position: 'absolute',
              left: '18px',
              top: '18px'
            }}
          />
          <iframe
            frameBorder="no"
            border="0"
            marginWidth="0"
            marginHeight="0"
            title="陈建光的火影歌单"
            width={260}
            height={500}
            src="//music.163.com/outchain/player?type=0&id=409631476&auto=1&height=500"
          />
        </div>
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          title={
            this.state.status === 'login'
              ? '登录'
              : this.state.status === 'register'
              ? '注册'
              : '更换头像'
          }
          footer={null}
          className="components-nav-left-modal-login"
        >
          {/(login|register)/.test(this.state.status) ? (
            <Form
              onSubmit={this.handleSubmit}
              className="components-nav-left-modal-login-form"
            >
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '请输入你的用户名' }]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                    }
                    placeholder="Username"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
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
                  className="components-nav-left-modal-login-form-button"
                >
                  {this.state.status === 'login' ? '登录' : '注册'}
                </Button>
              </FormItem>
            </Form>
          ) : (
            <Upload
              name="avatar"
              listType="picture-card"
              className="components-nav-left-modal-login-uploader"
              showUploadList={false}
              action="/api/user/editAvatar"
              headers={{
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }}
              beforeUpload={this.beforeUpload}
              onChange={this.handleChange}
            >
              {this.props.user.avatar ? (
                <img
                  src={this.props.user.avatar}
                  alt="avatar"
                  className="components-nav-left-modal-login-uploader-img"
                />
              ) : (
                uploadButton
              )}
            </Upload>
          )}
        </Modal>
      </div>
    )
  }
}
const WrappedNavLeft = Form.create()(NavLeft)
export default WrappedNavLeft
