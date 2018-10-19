import React from "react";
import { connect } from "react-redux";
@connect(state => state.admin)
class User extends React.Component {
  render() {
    return (
      <div>
        <div
          className="personMessage"
          dangerouslySetInnerHTML={{ __html: this.props.introduction }}
        />
      </div>
    );
  }
}

export default User;
