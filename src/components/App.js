import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Root from "../components/Root";
import AppHeader from "../components/AppHeader";
import PostDetails from "../components/PostDetails";
import AddPost from "../components/AddPost";
import EditPost from "../components/EditPost";
import { getCategories, getPosts } from "../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import CategoryView from "../components/CategoryView";

class App extends Component {
  componentWillMount() {
    this.props._getCategories();
    this.props._getPosts();
  }

  render() {
    return (
      <div className="app">
        <AppHeader />
        <Switch>
          <Route exact path="/" component={Root} />
          <Route exact path="/:category" component={CategoryView} />
          <Route exact path="/post/add" component={AddPost} />
          <Route exact path="/:category/:post" component={PostDetails} />
          <Route exact path="/:category/:post/edit" component={EditPost} />
        </Switch>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _getCategories: () => dispatch(getCategories()),
    _getPosts: () => dispatch(getPosts())
  };
}
export default withRouter(connect(null, mapDispatchToProps)(App));
