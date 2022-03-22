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

export const url = "http://192.168.4.66:3000/api/1.0";
