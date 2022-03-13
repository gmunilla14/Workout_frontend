import React from "react";
import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import { signUp } from "../routes/authRoutes";

function TitleScreen({ navigation }) {
  const onSignUpPress = async () => {
    navigation.navigate("Sign Up");
  };

  const onLoginPress = () => {
    console.log("Cutie");
    navigation.navigate("Login");
  };
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onSignUpPress}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container} onPress={onLoginPress}>
        <Text>Log In</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "red",
    padding: 10,
    marginTop: 10,
  },
});

export default TitleScreen;
