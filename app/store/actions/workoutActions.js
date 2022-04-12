import axios from "axios";
import { setHeaders, url } from "../../routes/utils";

export const createWorkout = (newWorkout) => {
  return async (dispatch) => {
    try {
      const workout = await axios.post(
        `${url}/workouts`,
        newWorkout,
        await setHeaders()
      );
      dispatch({ type: "ADD_WORKOUT", workout });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getWorkouts = () => {
  return async (dispatch) => {
    try {
      const workouts = await axios.get(`${url}/workouts`, await setHeaders());
      dispatch({ type: "GET_WORKOUTS", workouts });
    } catch (err) {
      console.log(err);
    }
  };
};
