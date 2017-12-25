import React, { Component } from "react";
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
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { voteComment, deleteComment } from "../actions";
import CommentForm from "./CommentForm";
import PropTypes from "prop-types";

const styles = {
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

  menuList: {
    position: "absolute",
    top: 0,
    right: 0
  },
  voting: {
    padding: "10px",
    width: "50px",
    alignItems: "center"
  }
};
const options = ["Edit Comment", "Delete Comment"];
const ITEM_HEIGHT = 48;

class Comment extends Component {
  state = {
    anchorEl: null,
    dialogOpened: false
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleMenuClick = event => {
    const { comment, _deleteComment } = this.props;
    if (event.currentTarget.innerText === "Edit Comment") {
      this.setState({ dialogOpened: true });
    } else {
      _deleteComment(comment.id);
    }
    this.setState({ anchorEl: null });
  };
  handleRequestClose = () => {
    this.setState({ anchorEl: null });
  };
  handleCategoryClick = (event, category) => {
    this.props.history.push(`/${category}`);
  };
  handleVoteClick = (event, id, option) => {
    this.props._voteComment(id, option);
  };
  handleDialogRequestClose = () => {
    this.setState({ dialogOpened: false });
  };
  render() {
    const open = Boolean(this.state.anchorEl);
    const { classes, comment } = this.props;
    const commentDate = new Date(comment.timestamp).toISOString();
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography type="headline" component="h2">
              {comment.body}
            </Typography>
            <IconButton
              aria-label="More"
              aria-owns={open ? "long-menu" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              className={classes.menuList}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={this.state.anchorEl}
              open={open}
              onRequestClose={this.handleRequestClose}
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
                  onClick={option => this.handleMenuClick(option)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>

            <Typography type="body1" className={classes.date}>
              commented on &nbsp;{Moment(commentDate).format("MMM D, YYYY")}
            </Typography>
            <Typography type="body1" className={classes.author}>
              &nbsp;By {comment.author}
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
                    this.handleVoteClick(event, comment.id, "upVote")
                  }
                >
                  <ExpandLessIcon />
                </IconButton>
              </Grid>
              <Grid item className={classes.gridItem}>
                <IconButton
                  aria-label="ExpandMore"
                  onClick={event =>
                    this.handleVoteClick(event, comment.id, "downVote")
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
                <Typography component="p">{comment.voteScore}</Typography>
              </Grid>
              <Grid item className={classes.gridItem}>
                <Typography component="p">votes</Typography>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
        <CommentForm
          open={this.state.dialogOpened}
          handleRequestClose={this.handleDialogRequestClose}
          action="Edit"
          comment={comment}
          postId={this.props.match.params.post}
        />
      </div>
    );
  }
}
Comment.propTypes = {
  classes: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    _deleteComment: id => dispatch(deleteComment(id)),
    _voteComment: (id, option) => dispatch(voteComment(id, option))
  };
}

export default withRouter(
  connect(null, mapDispatchToProps)(withStyles(styles)(Comment))
);
