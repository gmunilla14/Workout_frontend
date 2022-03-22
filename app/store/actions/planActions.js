import axios from "axios";
import { setHeaders } from "../../routes/utils";

export const getPlans = () => {
  return async (dispatch) => {
    try {
      const plans = await axios.get(
        "http://192.168.4.66:3000/api/1.0/plans",
        await setHeaders()
      );
      dispatch({ type: "GET_PLANS", plans });
    } catch (err) {
      console.log(err);
    }
  };
};

export const createPlan = (newPlan) => {
  return async (dispatch) => {
    try {
      await axios.post(
        "http://192.168.4.66:3000/api/1.0/plans",
        newPlan,
        await setHeaders()
      );
      dispatch({ type: "ADD_PLAN" });
    } catch (err) {
      console.log(err);
    }
  };
};
