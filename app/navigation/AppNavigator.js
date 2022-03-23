import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutClockScreen from "../screens/WorkoutClockScreen";
import ChooseWorkoutScreen from "../screens/ChooseWorkoutScreen";
import HomeScreen from "../screens/HomeScreen";
import PreWorkoutScreen from "../screens/PreWorkoutScreen";
import CreatePlanScreen from "../screens/CreatePlanScreen";
import CreateExerciseScreen from "../screens/CreateExerciseScreen";
const Stack = createStackNavigator();

function AppNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pre Workout" component={PreWorkoutScreen} />
      <Stack.Screen name="Clock" component={WorkoutClockScreen} />
      <Stack.Screen name="Create Plan" component={CreatePlanScreen} />
      <Stack.Screen name="Create Exercise" component={CreateExerciseScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigator;
