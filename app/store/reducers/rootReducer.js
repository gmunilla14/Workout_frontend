import muscleReducer from "./muscleReducer";
import exerciseReducer from "./exerciseReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  muscles: muscleReducer,
  exercises: exerciseReducer,
});

export default rootReducer;
