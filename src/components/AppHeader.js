import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

const styles = theme => ({
  root: {
    marginTop: 0,
    width: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0
  },
  title: {
    color: "#fff"
  },
  appBar: {
    background: "#2196f3"
  }
});

function AppHeader(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography type="title" className={classes.title}>
            Readable
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppHeader);
