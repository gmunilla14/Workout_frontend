import axios from "axios";
import { setHeaders } from "../../routes/utils";

export const findMuscles = () => {
  return async (dispatch) => {
    try {
      const muscles = await axios.get(
        "http://192.168.4.66:3000/api/1.0/muscles",
        await setHeaders()
      );
      dispatch({ type: "GET_MUSCLES", muscles });
    } catch (err) {
      console.log(err);
    }
  };
};
