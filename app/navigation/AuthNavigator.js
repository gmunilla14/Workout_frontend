import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

function AuthNavigator({ navigation }) {
  //Check for token on load and navigate accordingly
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
    }
  }, []);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sign Up" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
