import React from 'react'

import { Steps, Icon } from 'antd'
import history from '@/router/history'
import './index.less'
const Step = Steps.Step
class NoMatch extends React.Component {
  goHome = () => {
      history.push('/article')
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
        <p className="page-not-found-title">你找到了一处还未开发的新大陆，先去别处逛逛吧^_^</p>
        <div className="page-not-found-content">
          <Steps direction="vertical">
            <Step
              status="finish"
              title="前往首页"
              icon={<Icon type="home" />}
              onClick={this.goHome}
            />
            <Step
              status="finish"
              title="关于我"
              icon={<Icon type="user" />}
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
