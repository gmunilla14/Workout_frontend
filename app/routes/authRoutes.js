import axios from "axios";

export const signUp = async (user) => {
  try {
    const response = await axios.post(
      "http://192.168.4.66:3000/api/1.0/signup",
      user
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};

export const login = async () => {};
