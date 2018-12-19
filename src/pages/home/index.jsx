import React from 'react'
import './index.less'
import MyCard from './container/myCard'
import api from '@/lib/api'
import getParam from '@/lib/getParam'
import history from '@/router/history'
import { Pagination, Input } from 'antd'
const Search = Input.Search
class Article extends React.Component {
  state = {
    indexList: [],
    allCount: 0
  }
  componentWillMount() {
    this.loadData()
  }
  loadData = async () => {
    let params = { page: getParam('page'), keyword: getParam('keyword') }
    const res = await api.getArticles(params)
    if (res.data.code === 0) {
      this.setState({
        indexList: res.data.data,
        allCount: res.data.count
      })
    }
  }
  onChange = page => {
    document.scrollingElement.scrollTop = 0
    history.push(`/home/?page=${page}&keyword=${getParam('keyword')}`)
    this.loadData()
  }
  handleSearch = keyword => {
    document.scrollingElement.scrollTop = 0
    history.push(`/home/?page=1&keyword=${keyword}`)
    this.loadData()
  }
  render() {
    return (
      <div className="home">
        <div className="homeSearch">
          <Search
            placeholder="搜索文章"
            size="large"
            onSearch={this.handleSearch}
            enterButton
          />
        </div>
        <div className="lists">
          {this.state.indexList.map((item, index) => (
            <MyCard list={item} key={index} />
          ))}
        </div>
        <div className="footer">
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

export default Article
