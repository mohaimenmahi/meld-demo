import { combineReducers } from "redux";
import homeReducer from "./home";
import deviceReducer from "./devices";

export default combineReducers({
  homeReducer,
  deviceReducer,
});
