import axios from "axios";
import { url, setHeaders } from "./utils";

export const signUp = async (user) => {
  try {
    const response = await axios.post(`${url}/signup`, user);
    return response;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const signIn = async (user) => {
  try {
    const response = await axios.post(`${url}/signin`, user);
    return response;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const activate = async (token) => {
  try {
    const response = await axios.post(
      `${url}/activate`,
      token,
      await setHeaders()
    );
    return response;
  } catch (err) {
    return err.response;
  }
};
