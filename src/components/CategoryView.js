import React, { Component } from "react";
import RootBar from "../components/RootBar";
import PostsList from "./PostsList";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { filterPosts } from "../actions";

class CategoryView extends Component {
  componentDidUpdate() {
    const { _filterPosts, filter, currentCategory } = this.props;
    if (filter !== currentCategory) {
      if (currentCategory) {
        _filterPosts(currentCategory);
      }
    }
  }
  componentWillMount() {
    const { _filterPosts, filter, currentCategory } = this.props;
    if (filter !== currentCategory) {
      if (currentCategory) {
        _filterPosts(currentCategory);
      }
    }
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

function mapStateToProps({ filter }, { match }) {
  return {
    filter,
    currentCategory: match.params.category
  };
}

function mapDispatchToProps(dispatch) {
  return {
    _filterPosts: data => dispatch(filterPosts(data))
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryView)
);
