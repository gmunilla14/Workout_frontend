import axios from "axios";
import { setHeaders } from "./utils";

export const getMuscles = async () => {
  try {
    const response = await axios.get(
      "http://192.168.4.66:3000/api/1.0/muscles",
      await setHeaders()
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
