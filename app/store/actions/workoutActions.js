import axios from "axios";
import { setHeaders, url } from "../../routes/utils";

export const createWorkout = (newWorkout) => {
  return async (dispatch) => {
    try {
      await axios.post(`${url}/workouts`, newWorkout, await setHeaders());
      dispatch({ type: "ADD_WORKOUT" });
    } catch (err) {
      console.log(err);
    }
  };
};
