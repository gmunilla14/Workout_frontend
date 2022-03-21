import axios from "axios";
import { setHeaders } from "./utils";

export const createPlan = async (plan) => {
  try {
    const response = await axios.post(
      "http://192.168.4.66:3000/api/1.0/plans",
      plan,
      await setHeaders()
    );
    console.log(response.status);
  } catch (err) {
    console.log(err);
  }
};

export const getPlans = async () => {
  try {
    const response = await axios.get(
      "http://192.168.4.66:3000/api/1.0/plans",
      await setHeaders()
    );
    console.log(response.data);
    return response.data.plans;
  } catch (err) {
    console.log(err);
  }
};
