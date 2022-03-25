import React from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import { signUp } from "../routes/authRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
function TitleScreen({ navigation }) {
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
  });

  return (
    <>
      <View style={styles.container}></View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "red",
    padding: 10,
    marginTop: 10,
    height: "100%",
  },
});

export default TitleScreen;
