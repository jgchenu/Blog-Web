import React from 'react'
import './index.less'
import MyCard from '@/pages/home/container/myCard'
import api from '@/lib/api'
import getParam from '@/lib/getParam'
import { Pagination } from 'antd'
import history from '@/router/history'
class Article extends React.Component {
  state = {
    indexList: [],
    allCount: 0,
    name: this.props.match.params.name,
    page: 1,
    pageSize: 10
  }
  componentWillMount() {
    this.setState(
      {
        page: getParam('page')
      },
      () => {
        this.loadData()
      }
    )
  }
  loadData = () => {
    this.getTagArticle()
  }
  getTagArticle = async () => {
    const params = { page: this.state.page, pageSize: this.state.pageSize }
    const res = await api.getArticlesByTagName(this.state.name, params)
    if (res.data.code === 0) {
      this.setState({
        indexList: res.data.data,
        allCount: res.data.count
      })
    }
  }

  onChange = page => {
    document.scrollingElement.scrollTop = 0
    history.push(`/tagArticle/${this.state.name}?page=${page}`)
    this.setState(
      {
        page: getParam('page')
      },
      () => {
        this.loadData()
      }
    )
  }
  render() {
    return (
      <div className="home">
        <div className="lists">
          {this.state.indexList.map((item, index) => (
            <MyCard list={item} key={index} />
          ))}
        </div>
        <div className="footer">
          <Pagination
            defaultCurrent={parseInt(this.state.page, 10)}
            total={this.state.allCount}
            onChange={this.onChange}
          />
        </div>
      </div>
    )
  }
}

export default Article
