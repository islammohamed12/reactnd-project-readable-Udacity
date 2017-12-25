import React, { Component } from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog";
import { v1 } from "uuid";
import { connect } from "react-redux";
import { addComment, updateComment } from "../actions";

class CommentForm extends Component {
  state = {
    author: this.props.comment ? this.props.comment.author : "",
    comment: this.props.comment ? this.props.comment.body : ""
  };
  addNewComment() {
    const { _addComment, postId } = this.props;
    const newComment = {
      id: v1(),
      parentId: postId,
      timestamp: Date.now(),
      author: this.state.author,
      body: this.state.comment
    };
    _addComment(newComment);
    this.resetForm();
  }
  EditComment() {
    const { _updateComment, postId, comment } = this.props;
    const newComment = {
      id: comment.id,
      parentId: postId,
      timestamp: Date.now(),
      author: this.state.author,
      body: this.state.comment
    };
    _updateComment(newComment);
  }
  handleActionButton(author, comment) {
    const { handleRequestClose, action } = this.props;
    console.log(this.props);
    console.log(action, author, comment);
    if (action === "Add") {
      this.addNewComment();
    } else {
      this.EditComment();
    }
    handleRequestClose();
  }
  resetForm() {
    this.setState({
      author: "",
      comment: ""
    });
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onRequestClose={this.props.handleRequestClose}
        >
          <DialogTitle> {this.props.action} Comment</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Author"
              type="text"
              fullWidth
              onChange={this.handleChange("author")}
              value={this.state.author}
            />
            <TextField
              margin="dense"
              id="name"
              label="Comment"
              type="text"
              fullWidth
              multiline
              rows="4"
              onChange={this.handleChange("comment")}
              value={this.state.comment}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={event =>
                this.handleActionButton(this.state.author, this.state.comment)
              }
              color="primary"
            >
              {this.props.action}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _addComment: data => dispatch(addComment(data)),
    _updateComment: data => dispatch(updateComment(data))
  };
}
export default connect(null, mapDispatchToProps)(CommentForm);
