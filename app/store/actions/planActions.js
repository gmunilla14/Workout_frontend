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
      const response = await axios.post(
        `${url}/plans`,
        newPlan,
        await setHeaders()
      );
      const plan = response.data.plan;
      dispatch({ type: "ADD_PLAN", plan });
    } catch (err) {
      console.log(err);
    }
  };
};

export const editPlan = (id, editedPlan) => {
  console.log("editing");
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${url}/plans/${id}`,
        editedPlan,
        await setHeaders()
      );
      const plan = response.data.plan;
      dispatch({ type: "EDIT_PLAN", plan });
    } catch (err) {
      console.log(err.response);
    }
  };
};
