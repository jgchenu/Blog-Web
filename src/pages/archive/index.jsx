import React from 'react'
import { Timeline, Icon, Pagination } from 'antd'
import './index.less'
import history from '@/router/history'
import api from '@/lib/api'
import getParam from '@/lib/getParam'
class Archive extends React.Component {
  state = { indexList: [], allCount: 0 }
  componentDidMount() {
    this.loadData()
  }
  loadData = async () => {
    const params = { page: getParam('page') }
    const res = await api.getArchives(params)
    if (res.data.code === 0) {
      this.setState({
        indexList: res.data.data,
        allCount: res.data.count
      })
    }
  }
  onChange = page => {
    document.scrollingElement.scrollTop = 0
    history.push(`/archive/?page=${page}`)
    this.loadData()
  }
  renderTimeItem = () => {
    return this.state.indexList.map((item, index) => (
      <Timeline.Item
        key={index}
        onClick={()=>this.goDetail(item.id)}
        dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}
        color="blue"
      >
        <div style={{ cursor: 'pointer' }}>
          {item.title}
          <br />
          {item.createdAt}{' '}
        </div>
      </Timeline.Item>
    ))
  }
  goDetail(id) {
    history.push(`/detail/${id}`)
  }
  render() {
    return (
      <div className="page-archive">
        <Timeline mode="alternate">{this.renderTimeItem()}</Timeline>
        <div className="page-archive-footer">
          <Pagination
            defaultCurrent={parseInt(getParam('page'), 10)}
            total={this.state.allCount}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}

export default Archive
