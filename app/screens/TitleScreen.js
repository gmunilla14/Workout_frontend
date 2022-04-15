import React from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import colors from "../utils/colors";
function TitleScreen({ navigation }) {
  //On load, check if the user is logged in, if so, go to app, if not go to authentications
  useEffect(async () => {
    const userToken = await AsyncStorage.getItem("token");
    if (userToken) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "App Nav",
          },
        ],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Auth Nav",
          },
        ],
      });
    }
  }, []);

  return (
    <>
      <View style={styles.container}></View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: colors.mainBG,
    padding: 10,
    marginTop: 10,
    height: "100%",
  },
});

export default TitleScreen;
