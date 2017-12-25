import React, { Component } from "react";
import RootBar from "../components/RootBar";
import PostsList from "./PostsList";
import { filterPosts } from "../actions";
import { connect } from "react-redux";

class Root extends Component {
  componentWillMount() {
    const { _filterPosts } = this.props;
    _filterPosts("All");
  }
  render() {
    return (
      <div>
        <RootBar />
        <PostsList />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _filterPosts: data => dispatch(filterPosts(data))
  };
}
export default connect(null, mapDispatchToProps)(Root);
