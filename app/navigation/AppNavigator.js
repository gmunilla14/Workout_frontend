import React from "react";
import { View, StyleSheet, Text } from "react-native";
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
import Header from "../components/Header";
import { getHeaderTitle } from "@react-navigation/elements";

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
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          if (title === "Create Plan" || title === "Create Exercise") {
            return <Header title={title} back={true} navigation={navigation} />;
          } else if (title === "Home" || title === "Activate") {
            return <Header title={title} navigation={navigation} />;
          } else if (title === "Pre Workout") {
            return (
              <Header
                title={route.params.name}
                back={true}
                navigation={navigation}
              />
            );
          } else {
            return <Header title={route.params.name} navigation={navigation} />;
          }
        },
      }}
    >
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
