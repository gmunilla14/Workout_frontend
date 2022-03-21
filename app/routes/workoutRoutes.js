import axios from "axios";
import { setHeaders } from "./utils";

export const createWorkout = async (workout) => {
  try {
    const response = await axios.post(
      "http://192.168.4.66:3000/api/1.0/workouts",
      workout,
      await setHeaders()
    );
    console.log(response.status);
  } catch (err) {
    console.log(err);
  }
};
