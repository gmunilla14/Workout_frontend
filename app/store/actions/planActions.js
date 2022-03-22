import axios from "axios";
import { setHeaders, url } from "../../routes/utils";

export const getPlans = () => {
  return async (dispatch) => {
    try {
      const plans = await axios.get(`${url}/plans`, await setHeaders());
      dispatch({ type: "GET_PLANS", plans });
    } catch (err) {
      console.log(err);
    }
  };
};

export const createPlan = (newPlan) => {
  return async (dispatch) => {
    try {
      await axios.post(`${url}/plans`, newPlan, await setHeaders());
      dispatch({ type: "ADD_PLAN" });
    } catch (err) {
      console.log(err);
    }
  };
};
