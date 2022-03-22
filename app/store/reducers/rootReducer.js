import muscleReducer from "./muscleReducer";
import exerciseReducer from "./exerciseReducer";
import planReducer from "./planReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  muscles: muscleReducer,
  exercises: exerciseReducer,
  plans: planReducer,
});

export default rootReducer;
