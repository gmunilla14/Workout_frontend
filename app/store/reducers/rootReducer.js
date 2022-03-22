import muscleReducer from "./muscleReducer";
import exerciseReducer from "./exerciseReducer";
import planReducer from "./planReducer";
import workoutReducer from "./workoutReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  muscles: muscleReducer,
  exercises: exerciseReducer,
  plans: planReducer,
  workouts: workoutReducer,
});

export default rootReducer;
