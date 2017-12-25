import React, { Component } from "react";
import Post from "../components/Post";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { getComments } from "../actions";
import CommentsList from "../components/CommentsList";
import PropTypes from "prop-types";

class PostDetails extends Component {
  componentWillMount() {
    this.props._getComments(this.props.match.params.post);
  }
  render() {
    const { post, comments } = this.props;
    return (
      <div>
        {post && <Post post={post} detailsPage={true} />}
        {post && comments && <CommentsList />}
        {!post && <div>No Post Details</div>}
      </div>
    );
  }
}

PostDetails.propTypes = {
  post: PropTypes.object,
  comments: PropTypes.array
};
function mapStateToProps({ posts, comments }, { match }) {
  return {
    post: posts.filter(post => post.id === match.params.post)[0],
    comments: comments[match.params.post]
  };
}
function mapDispatchToProps(dispatch) {
  return {
    _getComments: data => dispatch(getComments(data))
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostDetails)
);
