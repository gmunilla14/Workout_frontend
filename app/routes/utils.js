import AsyncStorage from "@react-native-async-storage/async-storage";

export const setHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  const header = {
    headers: {
      "x-auth-token": token,
    },
  };
  return header;
};

export const url = "https://workouttrackerbackend46.herokuapp.com/api/1.0";
