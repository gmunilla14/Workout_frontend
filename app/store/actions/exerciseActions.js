import axios from "axios";
import { setHeaders, url } from "../../routes/utils";

export const getExercises = () => {
  return async (dispatch) => {
    try {
      const exercises = await axios.get(`${url}/exercises`, await setHeaders());
      dispatch({ type: "GET_EX", exercises });
    } catch (err) {
      console.log(err);
    }
  };
};

export const createExercise = (newExercise) => {
  return async (dispatch) => {
    try {
      await axios.post(`${url}/exercises`, newExercise, await setHeaders());
      dispatch({ type: "ADD_EXERCISE" });
    } catch (err) {
      console.log(err);
    }
  };
};
