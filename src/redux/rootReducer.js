import { combineReducers } from "redux";
import counter from "./module/counter";
import counter2 from "./module/counter2";

const rootReducer = combineReducers({
  counter, counter2
  });
  
export default rootReducer;