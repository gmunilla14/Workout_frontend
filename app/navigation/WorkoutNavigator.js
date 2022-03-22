import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutClockScreen from "../screens/WorkoutClockScreen";
import ChooseWorkoutScreen from "../screens/ChooseWorkoutScreen";

const Stack = createStackNavigator();

function WorkoutNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Choose Workout" component={ChooseWorkoutScreen} />
      <Stack.Screen name="Clock" component={WorkoutClockScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default WorkoutNavigator;
