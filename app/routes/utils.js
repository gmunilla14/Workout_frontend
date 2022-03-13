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
