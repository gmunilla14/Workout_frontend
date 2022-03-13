import axios from "axios";
import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.4.66:3000/api/1.0",
});

export const signUp = async () => {
  try {
    const response = await axios.post(
      "http://192.168.4.66:3000/api/1.0/signup",
      {
        username: "user",
        email: "user@mail.com",
        password: "Password1",
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};
