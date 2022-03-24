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

const styles = StyleSheet.create({
  container: {},
});

export default ParentNavigator;
