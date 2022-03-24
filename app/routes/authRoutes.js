import axios from "axios";
import { setHeaders } from "./utils";

export const signUp = async (user) => {
  try {
    const response = await axios.post(
      "http://192.168.4.66:3000/api/1.0/signup",
      user
    );
    return response;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const signIn = async (user) => {
  try {
    const response = await axios.post(
      "http://192.168.4.66:3000/api/1.0/signin",
      user
    );
    return response;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const activate = async (token) => {
  try {
    const response = await axios.post(
      "http://192.168.4.66:3000/api/1.0/activate",
      token,
      await setHeaders()
    );
    return response;
  } catch (err) {
    return err.response;
  }
};
