import axios from "axios";
import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.4.66/api/1.0",
});

export const signUp = async () => {
  apiClient.post("/signup").then((response) => {
    if (!response.ok) {
      console.log(response.problem);
    } else {
      console.log(response);
    }
  });
};
