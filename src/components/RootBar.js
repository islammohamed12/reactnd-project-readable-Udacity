import React, { Component } from "react";
import PropTypes from "prop-types";
import { getCategories, sortPosts, filterPosts } from "../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/Menu/MenuItem";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: 200
  },
  menu: {
    width: 200
  },
  toolbar: {
    background: "#eeeeee",
    width: "100%",
    margin: 0
  }
});

const orderByTypes = [
  {
    value: "Votes",
    label: "Highest Votes"
  },
  {
    value: "Date",
    label: "Latest Date"
  }
];
const defaultCategory = {
  name: "All",
  path: ""
};
class RootBar extends Component {
  componentDidMount() {
    const { categoriesLoaded, _getCategories } = this.props;
    if (categoriesLoaded === false) _getCategories();
  }
  handleCategoriesChange = () => event => {
    // const { _filterPosts, filter } = this.props;
    // if (filter !== event.target.value) _filterPosts(event.target.value);
    let nextLocation = event.target.value;
    if (nextLocation === defaultCategory.name)
      nextLocation = defaultCategory.path;
    this.props.history.push(`/${nextLocation}`);
  };
  handleOrderChange = () => event => {
    const { _sortPosts } = this.props;
    _sortPosts(event.target.value);
  };
  render() {
    const { classes, categories, sortBy, filter } = this.props;
    const categoriesList = [defaultCategory, ...categories];
    return (
      <Grid container className={classes.toolbar}>
        <Grid item xs>
          <TextField
            id="select-category"
            select
            label="Categories : "
            className={classes.textField}
            value={filter}
            onChange={this.handleCategoriesChange()}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            disabled={!this.props.categoriesLoaded}
            margin="normal"
          >
            categoriesList.length > 0 &&
            {categoriesList.map(option => (
              <MenuItem key={option.name} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs>
          <TextField
            id="select-order"
            select
            label="Order By : "
            className={classes.textField}
            value={sortBy}
            disabled={!this.props.categoriesLoaded}
            onChange={this.handleOrderChange()}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            margin="normal"
          >
            {orderByTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    );
  }
}
RootBar.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps({ categories, sortBy, filter, categoriesLoaded }) {
  return { categories, sortBy, filter, categoriesLoaded };
}

function mapDispatchToProps(dispatch) {
  return {
    _getCategories: () => dispatch(getCategories()),
    _sortPosts: data => dispatch(sortPosts(data)),
    _filterPosts: data => dispatch(filterPosts(data))
  };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RootBar))
);
