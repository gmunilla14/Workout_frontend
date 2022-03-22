import axios from "axios";
import { setHeaders } from "../../routes/utils";

export const createWorkout = (newWorkout) => {
  return async (dispatch) => {
    try {
      await axios.post(
        "http://192.168.4.66:3000/api/1.0/workouts",
        newWorkout,
        await setHeaders()
      );
      dispatch({ type: "ADD_WORKOUT" });
    } catch (err) {
      console.log(err);
    }
  };
};
