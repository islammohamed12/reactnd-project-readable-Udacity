import { combineReducers } from "redux";
import categories from "./categories";
import posts from "./posts";
import comments from "./comments";
import sortBy from "./sort";
import filter from "./filter";

import { CATEGORIES_LOADED } from "../actions/types";
export function categoriesLoaded(state = false, action) {
  switch (action.type) {
    case CATEGORIES_LOADED:
      console.log(action);
      return action.categoriesLoaded;
    default:
      return state;
  }
}

export default combineReducers({
  categories,
  posts,
  sortBy,
  filter,
  categoriesLoaded,
  comments
});
