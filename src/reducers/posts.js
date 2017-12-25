import {
  GET_POSTS,
  ADD_POST,
  UPDATE_POST,
  VOTE_POST,
  DELETE_POST,
  GET_POST
} from "../actions/types";
function posts(state = [], action) {
  switch (action.type) {
    case GET_POSTS:
      console.log(action);
      return action.posts;
    case VOTE_POST:
    case GET_POST:
    case UPDATE_POST:
      console.log(action);
      return state.map(
        post => (action.post.id === post.id ? action.post : post)
      );
    case ADD_POST:
      console.log(action);
      return [...state, action.post];
    case DELETE_POST:
      console.log(action);
      return state.filter(post => post.id !== action.id);
    default:
      return state;
  }
}
export default posts;
