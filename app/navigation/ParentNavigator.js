import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import TitleScreen from "../screens/TitleScreen";

const Stack = createStackNavigator();

function ParentNavigator(props) {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Title" component={TitleScreen} />
        <Stack.Screen name="App Nav" component={AppNavigator} />
        <Stack.Screen name="Auth Nav" component={AuthNavigator} />
      </Stack.Navigator>
    </>
  );
}

export default ParentNavigator;
