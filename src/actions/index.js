import * as APIs from "../utils/api";
import {
  GET_CATEGORIES,
  CATEGORIES_LOADED,
  GET_POSTS,
  SORT_POSTS,
  FLITER_POSTS,
  GET_POST,
  ADD_POST,
  UPDATE_POST,
  VOTE_POST,
  DELETE_POST,
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  UPDATE_COMMENT
} from "./types";

//////////////////////////////Categories Actions //////////////////////////////

export const getCategories = () => dispatch => {
  return APIs.getCategories().then(categories => {
    dispatch({ type: GET_CATEGORIES, categories });
    dispatch(categoriesLoaded(true));
  });
};

export const categoriesLoaded = categoriesLoaded => {
  return {
    type: CATEGORIES_LOADED,
    categoriesLoaded
  };
};

//////////////////////////////Posts Actions //////////////////////////////

export const getPosts = () => dispatch => {
  return APIs.getPosts().then(posts => {
    dispatch({ type: GET_POSTS, posts });
  });
};

export const sortPosts = sortBy => {
  return {
    type: SORT_POSTS,
    sortBy
  };
};
export const filterPosts = filter => {
  return {
    type: FLITER_POSTS,
    filter
  };
};
export const getPost = id => dispatch => {
  return APIs.getPost(id).then(post => {
    dispatch({ type: GET_POST, post });
  });
};

export const addPost = post => dispatch => {
  return APIs.addPost(post).then(post => {
    dispatch({ type: ADD_POST, post });
  });
};
export const updatePost = post => dispatch => {
  return APIs.updatePost(post).then(post => {
    dispatch({ type: UPDATE_POST, post });
  });
};
export const votePost = (id, option) => dispatch => {
  return APIs.votePost(id, option).then(post => {
    dispatch({ type: VOTE_POST, post });
  });
};
export const deletePost = id => dispatch => {
  return APIs.deletePost(id).then(result => {
    if (result.status === 200) dispatch({ type: DELETE_POST, id });
  });
};

//////////////////////////////Comments Actions //////////////////////////////
export const getComments = postId => dispatch => {
  return APIs.getComments(postId).then(comments => {
    dispatch({ type: GET_COMMENTS, postId, comments });
  });
};

export const addComment = comment => dispatch => {
  console.log(comment);
  return APIs.addComment(comment).then(res => {
    dispatch({
      type: ADD_COMMENT,
      res
    });
    dispatch(getPost(res.parentId));
  });
};

export const deleteComment = id => dispatch => {
  return APIs.deleteComment(id).then(res => {
    dispatch({ type: DELETE_COMMENT, res });
    dispatch(getPost(res.parentId));
  });
};

export const voteComment = (id, option) => dispatch => {
  return APIs.voteComment(id, option).then(res => {
    dispatch({ type: VOTE_COMMENT, res });
  });
};
export const updateComment = comment => dispatch => {
  return APIs.updateComment(comment).then(res => {
    dispatch({ type: UPDATE_COMMENT, res });
  });
};
