import React from "react";
import api from "@/lib/api";
const { person } = api;
class User extends React.Component {
  state = { content: "" };
  componentWillMount() {
    this.loadData();
  }
  loadData = () => {
    this.$axios({
      url: `${person}`,
      method: "get"
    }).then(res => {
      if (res.data.code === 200) {
        this.setState({
          content: res.data.data.introduction
        });
      }
    });
  };
  render() {
    return (
      <div>
        <div
          className="personMessage"
          dangerouslySetInnerHTML={{ __html: this.state.content }}
        />
      </div>
    );
  }
}

export default User;
