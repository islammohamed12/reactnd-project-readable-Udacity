import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Button from "material-ui/Button";
import PropTypes from "prop-types";

class CommentsList extends Component {
  state = {
    openCommentDialog: false
  };
  handleAddCommentClick() {
    this.setState({ openCommentDialog: true });
  }
  handleRequestClose = () => {
    this.setState({ openCommentDialog: false });
  };
  render() {
    const { comments } = this.props;
    return (
      <div style={{ padding: "20px" }}>
        Comments: {comments.length}
        {comments &&
          comments.map(comment => (
            <Comment comment={comment} key={comment.id} />
          ))}
        {comments.length === 0 && <div>No Comments</div>}
        <Button
          color="primary"
          style={{
            right: "20px",
            position: "absolute"
          }}
          onClick={event => this.handleAddCommentClick(event)}
        >
          Add Comment
        </Button>
        <CommentForm
          open={this.state.openCommentDialog}
          handleRequestClose={this.handleRequestClose}
          action="Add"
          postId={this.props.match.params.post}
        />
      </div>
    );
  }
}
CommentsList.propTypes = {
  comments: PropTypes.array.isRequired
};
function mapStateToProps({ comments }, { match }) {
  return {
    comments: comments[match.params.post]
  };
}

export default withRouter(connect(mapStateToProps, {})(CommentsList));
