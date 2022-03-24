import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutClockScreen from "../screens/WorkoutClockScreen";
import ChooseWorkoutScreen from "../screens/ChooseWorkoutScreen";
import HomeScreen from "../screens/HomeScreen";
import PreWorkoutScreen from "../screens/PreWorkoutScreen";
import CreatePlanScreen from "../screens/CreatePlanScreen";
import CreateExerciseScreen from "../screens/CreateExerciseScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
const Stack = createStackNavigator();

function ParentNavigator(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(async () => {
    const userToken = await AsyncStorage.getItem("token");
    if (userToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  console.log(loggedIn);

  return (
    <>
      {loggedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="App Nav" component={AppNavigator} />
          <Stack.Screen name="Auth Nav" component={AuthNavigator} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Auth Nav" component={AuthNavigator} />
          <Stack.Screen name="App Nav" component={AppNavigator} />
        </Stack.Navigator>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ParentNavigator;
