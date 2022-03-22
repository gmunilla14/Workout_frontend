import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AuthNavigator from "./app/navigation/AuthNavigator";
import TitleScreen from "./app/screens/TitleScreen";
import { NavigationContainer } from "@react-navigation/native";
import CreateExerciseScreen from "./app/screens/CreateExerciseScreen";
import CreatePlanScreen from "./app/screens/CreatePlanScreen";
import WorkoutClockScreen from "./app/screens/WorkoutClockScreen";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./app/store/reducers/rootReducer";
const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <WorkoutClockScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
