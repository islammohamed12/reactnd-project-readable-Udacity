import React, { Component } from "react";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import { getCategories, addPost, updatePost } from "../actions";
import { connect } from "react-redux";
import MenuItem from "material-ui/Menu/MenuItem";
import { withRouter } from "react-router";
import { v1 } from "uuid";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    margin: "5%",
    width: "90%"
  },
  textField: {
    marginLeft: 0,
    marginRight: 0,
    width: "90%"
  },
  input: {
    width: "100%"
  },
  menu: {
    width: 200
  },
  buttonContainer: {
    width: "90%",
    marginTop: "10px",
    position: "relative"
  },
  postButton: {
    position: "absolute",
    right: "0"
  }
});

class PostForm extends Component {
  state = {
    author: this.props.post ? this.props.post.author : "",
    title: this.props.post ? this.props.post.title : "",
    body: this.props.post ? this.props.post.body : "",
    category: this.props.post ? this.props.post.category : "",
    finish: false
  };

  handleCategoriesChange = () => event => {
    this.setState({
      category: event.target.value
    });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  componentDidMount() {
    const { categoriesLoaded, _getCategories } = this.props;
    if (!categoriesLoaded) _getCategories();
  }
  componentWillReceiveProps() {
    const { post } = this.props;
    if (post) {
      this.setState({
        author: post.author,
        title: post.title,
        body: post.body,
        category: post.category
      });
    }
  }
  onFormSubmited() {
    this.setState({ finish: true });
  }
  onUpdatePost() {
    const { _updatePost, post } = this.props;
    const newPost = {
      ...post,
      timestamp: Date.now(),
      author: this.state.author,
      body: this.state.body,
      title: this.state.title,
      category: this.state.category
    };
    _updatePost(newPost);
  }
  onAddPost() {
    const { _addPost } = this.props;
    const newPost = {
      id: v1(),
      title: this.state.title,
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author,
      category: this.state.category
    };
    _addPost(newPost);
  }
  onFormSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    if (action === "edit") {
      this.onUpdatePost();
    } else {
      this.onAddPost();
    }
    this.onFormSubmited();
  }

  render() {
    const { classes, categories, history } = this.props;
    const { finish } = this.state;
    if (finish) {
      history.goBack();
    }
    return (
      <form
        onSubmit={event => this.onFormSubmit(event)}
        className={classes.container}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="title"
          label="Title"
          className={classes.textField}
          value={this.state.title}
          onChange={this.handleChange("title")}
          margin="normal"
        />
        <TextField
          required
          id="multiline-flexible"
          label="Post Body"
          multiline
          rows="4"
          value={this.state.body}
          onChange={this.handleChange("body")}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          required
          id="author"
          label="Author"
          className={classes.textField}
          value={this.state.author}
          onChange={this.handleChange("author")}
          margin="normal"
        />
        <TextField
          required
          id="select-form-category"
          select
          label="Categories"
          className={classes.textField}
          value={this.state.category}
          onChange={this.handleCategoriesChange()}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          disabled={!this.props.categoriesLoaded}
          margin="normal"
        >
          categories.length > 0 &&
          {categories.map(option => (
            <MenuItem key={option.name} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <div className={classes.buttonContainer}>
          <Button
            disabled={
              !(
                this.state.title !== "" &&
                this.state.body !== "" &&
                this.state.author !== "" &&
                this.state.category !== ""
              )
            }
            type="submit"
            raised
            color="primary"
            className={classes.postButton}
          >
            {this.props.action}
          </Button>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ categoriesLoaded, categories, posts }, { match }) {
  return {
    categoriesLoaded: categoriesLoaded,
    categories: categories,
    post: posts.filter(post => post.id === match.params.post)[0]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    _getCategories: () => dispatch(getCategories()),
    _addPost: post => dispatch(addPost(post)),
    _updatePost: post => dispatch(updatePost(post))
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostForm))
);
