import axios from "axios";
import { setHeaders, url } from "../../routes/utils";

export const getMuscles = () => {
  return async (dispatch) => {
    try {
      const muscles = await axios.get(`${url}/muscles`, await setHeaders());
      dispatch({ type: "GET_MUSCLES", muscles });
    } catch (err) {
      console.log(err);
    }
  };
};
