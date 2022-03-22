import axios from "axios";
import { setHeaders } from "../../routes/utils";

export const getExercises = () => {
  return async (dispatch) => {
    try {
      const exercises = await axios.get(
        "http://192.168.4.66:3000/api/1.0/exercises",
        await setHeaders()
      );
      dispatch({ type: "GET_EX", exercises });
    } catch (err) {
      console.log(err);
    }
  };
};
