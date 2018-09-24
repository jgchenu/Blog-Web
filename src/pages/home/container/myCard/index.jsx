import React from "react";
import { Card } from "antd";
import "./index.less";
import history from './../../../../router/history'
import MyTag from './../../../../components/myTag/index'
export default class MyCard extends React.Component {

  goDetail(id){
    history.push(`/detail/${id}`)
  }
  render() {
    let list = this.props.list;
    return (
      <div className='myCard' onClick={this.goDetail.bind(this,list.id)}>
        <Card title={list.title} style={{ width: "100%" }} >
          <div className="content">{list.title}</div>
          <footer className="cardFooter">
            <div className="tags">
            <MyTag tags={list.tags}></MyTag>
            </div>
          </footer>
        </Card>
      </div>
    );
  }
}
