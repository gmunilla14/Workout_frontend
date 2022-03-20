import axios from "axios";
import { setHeaders } from "./utils";

export const createExercise = async (exercise) => {
  try {
    const response = await axios.post(
      "http://192.168.4.66:3000/api/1.0/exercises",
      exercise,
      await setHeaders()
    );
    console.log(response.status);
  } catch (err) {
    console.log(err);
  }
};

export const getExercises = async () => {
  try {
    const response = await axios.get(
      "http://192.168.4.66:3000/api/1.0/exercises",
      await setHeaders()
    );
    console.log(response.data);
    return response.data.exercises;
  } catch (err) {
    console.log(err);
  }
};
