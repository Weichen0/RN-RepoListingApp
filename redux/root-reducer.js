import { combineReducers } from "redux";
import { reducer as repoReducer } from "./repo/reducers";

const reducer = combineReducers({
  repo: repoReducer,
});

export { reducer };
