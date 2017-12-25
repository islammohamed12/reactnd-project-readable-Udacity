import { SORT_POSTS } from "../actions/types";
function sortBy(state = "Votes", action) {
  switch (action.type) {
    case SORT_POSTS:
      console.log(action);
      return action.sortBy;
    default:
      return state;
  }
}
export default sortBy;
