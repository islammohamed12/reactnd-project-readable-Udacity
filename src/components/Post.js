import React, { Component } from "react";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import IconButton from "material-ui/IconButton";
import ExpandLessIcon from "material-ui-icons/ExpandLess";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Grid from "material-ui/Grid";
import Menu, { MenuItem } from "material-ui/Menu";
import MoreVertIcon from "material-ui-icons/MoreVert";
import Moment from "moment";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { votePost, deletePost } from "../actions";
import PropTypes from "prop-types";

const styles = theme => ({
  button: {
    margin: 0,
    position: "fixed",
    bottom: "10px",
    right: "10px"
  },
  card: {
    minWidth: 275,
    margin: "5%",
    position: "relative"
  },
  cardAction: {
    height: "100%"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  author: {
    marginBottom: 12,
    display: "inline-block"
  },
  date: {
    marginBottom: 12,
    display: "inline-block"
  },
  gridItem: {
    height: "30px",
    display: "flex",
    alignItems: "center"
  },
  gridColumn: {
    padding: "10px",
    width: "auto",
    alignItems: "center"
  },
  postBody: {
    paddingLeft: "15px"
  },
  menuList: {
    position: "absolute",
    top: 0,
    right: 0
  },
  voting: {
    padding: "10px",
    width: "50px",
    alignItems: "center"
  },
  categoryGridItem: {
    marginRight: "15px"
  }
});
const options = ["Edit Post", "Delete Post"];
const ITEM_HEIGHT = 48;

class Post extends Component {
  state = {
    anchorEl: null
  };
  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleMenuItemClick = event => {
    const { post, _deletePost } = this.props;
    if (event.currentTarget.innerText === "Edit Post")
      this.props.history.push(`/${post.category}/${post.id}/edit`);
    else {
      _deletePost(post.id);
      this.props.history.push(`/`);
    }
    this.handleRequestCloseMenu();
  };
  handleRequestCloseMenu = () => {
    this.setState({ anchorEl: null });
  };
  handleCategoryClick = (event, category) => {
    this.props.history.push(`/${category}`);
  };
  handleVoteClick = (event, id, option) => {
    this.props._votePost(id, option);
  };
  render() {
    const open = Boolean(this.state.anchorEl);
    const { classes, post } = this.props;
    const postDate = new Date(post.timestamp).toISOString();
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2">
            {post.title}
          </Typography>
          <IconButton
            aria-label="More"
            aria-owns={open ? "long-menu" : null}
            aria-haspopup="true"
            onClick={this.handleMenuClick}
            className={classes.menuList}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={this.state.anchorEl}
            open={open}
            onRequestClose={this.handleRequestCloseMenu}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: 200
              }
            }}
          >
            {options.map(option => (
              <MenuItem
                key={option}
                option={option}
                onClick={option => this.handleMenuItemClick(option)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          <Button
            color="primary"
            className={classes.author}
            onClick={event => this.handleCategoryClick(event, post.category)}
          >
            {post.category}
          </Button>

          <Typography type="body1" className={classes.date}>
            {Moment(postDate).format("MMM D, YYYY")}
          </Typography>
          <Typography type="body1" className={classes.author}>
            &nbsp; , {post.author}
          </Typography>

          <Typography component="p" className={classes.postBody}>
            {post.body}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardAction} justify="flex-start">
          <Grid
            container
            direction="column"
            justify="center"
            className={classes.voting}
          >
            <Grid item className={classes.gridItem}>
              <IconButton
                aria-label="ExpandLess"
                onClick={event =>
                  this.handleVoteClick(event, post.id, "upVote")
                }
              >
                <ExpandLessIcon />
              </IconButton>
            </Grid>
            <Grid item className={classes.gridItem}>
              <IconButton
                aria-label="ExpandMore"
                onClick={event =>
                  this.handleVoteClick(event, post.id, "downVote")
                }
              >
                <ExpandMoreIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justify="center"
            className={classes.gridColumn}
          >
            <Grid item className={classes.gridItem}>
              <Typography component="p">{post.voteScore}</Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography component="p">votes</Typography>
            </Grid>
          </Grid>

          <Grid
            container
            direction="column"
            justify="center"
            className={classes.gridColumn}
          >
            <Grid item className={classes.gridItem}>
              <Typography component="p">{post.commentCount}</Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography component="p">comments</Typography>
            </Grid>
          </Grid>

          {!this.props.detailsPage && (
            <Grid container direction="row" justify="flex-end">
              <Grid item className={classes.categoryGridItem}>
                <Link
                  to={`/${post.category}/${post.id}`}
                  key={post.id}
                  style={{ textDecoration: "none" }}
                >
                  <Button raised color="primary">
                    View
                  </Button>
                </Link>
              </Grid>
            </Grid>
          )}
        </CardActions>
      </Card>
    );
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};
function mapDispatchToProps(dispatch) {
  return {
    _votePost: (id, option) => dispatch(votePost(id, option)),
    _deletePost: id => dispatch(deletePost(id))
  };
}

export default withRouter(
  connect(null, mapDispatchToProps)(withStyles(styles)(Post))
);
