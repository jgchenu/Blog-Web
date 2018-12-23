import React from 'react'

import { Steps, Icon } from 'antd'
import history from '@/router/history'
import './index.less'
const Step = Steps.Step
class NoMatch extends React.Component {
  goHome = () => {
      history.push('/home')
  }
  goAboutMe=()=>{
    history.push('/aboutMe')
  }
  goBack=()=>{
    history.goBack();
  }
  render() {
    return (
      <div className="page-not-found">
        <p className="page-not-found-title">你找到了一个新大陆还未开发</p>
        <div className="page-not-found-content">
          <Steps direction="vertical">
            <Step
              status="finish"
              title="前往首页"
              icon={<Icon type="user" />}
              onClick={this.goHome}
            />
            <Step
              status="finish"
              title="关于我"
              icon={<Icon type="solution" />}
              onClick={this.goAboutMe}

            />
            <Step
              status="finish"
              title="返回上一层"
              icon={<Icon type="left-circle" />}
              onClick={this.goBack}
              
            />
          </Steps>
        </div>
      </div>
    )
  }
}

export default NoMatch
