import { FLITER_POSTS } from "../actions/types";
function filter(state = "All", action) {
  switch (action.type) {
    case FLITER_POSTS:
      console.log(action);
      return action.filter;
    default:
      return state;
  }
}
export default filter;
