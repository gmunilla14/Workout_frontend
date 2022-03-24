import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import WorkoutClockScreen from "../screens/WorkoutClockScreen";
import ChooseWorkoutScreen from "../screens/ChooseWorkoutScreen";
import HomeScreen from "../screens/HomeScreen";
import PreWorkoutScreen from "../screens/PreWorkoutScreen";
import CreatePlanScreen from "../screens/CreatePlanScreen";
import CreateExerciseScreen from "../screens/CreateExerciseScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import ActivateScreen from "../screens/ActivateScreen";

const Stack = createStackNavigator();

function AppNavigator({ navigation }) {
  useEffect(async () => {
    const userToken = await AsyncStorage.getItem("token");
    const user = jwtDecode(userToken);
    if (!userToken) {
      navigation.navigate("Auth Nav");
    } else if (user.inactive) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Activate",
          },
        ],
      });
    }
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Pre Workout" component={PreWorkoutScreen} />
      <Stack.Screen name="Clock" component={WorkoutClockScreen} />
      <Stack.Screen name="Create Plan" component={CreatePlanScreen} />
      <Stack.Screen name="Create Exercise" component={CreateExerciseScreen} />
      <Stack.Screen name="Activate" component={ActivateScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppNavigator;
