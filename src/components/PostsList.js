import React, { Component } from "react";
import Button from "material-ui/Button";
import AddIcon from "material-ui-icons/Add";
import { withStyles } from "material-ui/styles";
import Post from "../components/Post";
import { getPosts } from "../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const styles = theme => ({
  button: {
    margin: 0,
    position: "fixed",
    bottom: "10px",
    right: "10px"
  },
  noPosts: {
    margin: "5%"
  }
});

class PostsList extends Component {
  render() {
    const { classes, posts, sortBy, filter } = this.props;
    let orderedPosts = [];
    if (filter === "All") {
      orderedPosts = posts;
    } else {
      orderedPosts = posts.filter(post => post.category === filter);
    }

    if (sortBy === "Votes") {
      orderedPosts = orderedPosts.sort(
        (a, b) => b["voteScore"] - a["voteScore"]
      );
    } else {
      orderedPosts = orderedPosts.sort(function(a, b) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
    }

    return (
      <div>
        {orderedPosts &&
          orderedPosts.map(post => <Post post={post} key={post.id} />)}
        {orderedPosts.length === 0 && (
          <div className={classes.noPosts}>No Posts</div>
        )}
        <Link to={`/post/add`} style={{ textDecoration: "none" }}>
          <Button
            fab
            color="primary"
            aria-label="add"
            className={classes.button}
          >
            <AddIcon />
          </Button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps({ posts, sortBy, filter }) {
  return { posts, sortBy, filter };
}

function mapDispatchToProps(dispatch) {
  return {
    _getPosts: data => dispatch(getPosts(data))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(PostsList)
);
