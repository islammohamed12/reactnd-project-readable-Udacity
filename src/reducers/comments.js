import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  UPDATE_COMMENT
} from "../actions/types";
function comments(state = [], action) {
  switch (action.type) {
    case GET_COMMENTS:
      console.log(action);
      return {
        ...state,
        [action.postId]: action.comments
      };
    case ADD_COMMENT:
      console.log(action);
      return {
        ...state,
        [action.res.parentId]: [...state[action.res.parentId], action.res]
      };
    case DELETE_COMMENT:
      console.log(action);
      return {
        ...state,
        [action.res.parentId]: state[action.res.parentId].filter(
          comment => action.res.id !== comment.id
        )
      };
    case VOTE_COMMENT:
    case UPDATE_COMMENT:
      console.log(action);

      return {
        ...state,
        [action.res.parentId]: state[action.res.parentId].map(
          comment => (action.res.id === comment.id ? action.res : comment)
        )
      };
    default:
      return state;
  }
}
export default comments;
