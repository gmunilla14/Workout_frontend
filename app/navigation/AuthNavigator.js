import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import TitleScreen from "../screens/TitleScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import ActivateScreen from "../screens/ActivateScreen";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

function AuthNavigator({ navigation }) {
  useEffect(async () => {
    const userToken = await AsyncStorage.getItem("token");
    if (userToken) {
      navigation.navigate("App Nav");
    }
  });
  return (
    <Stack.Navigator>
      <Stack.Screen name="Title" component={TitleScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Activate" component={ActivateScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AuthNavigator;
