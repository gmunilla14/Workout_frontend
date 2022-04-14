import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import colors from "../utils/colors";
import AppButton from "../components/AppButton";
import axios from "axios";
import { url, setHeaders } from "../routes/utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getWorkouts } from "../store/actions/workoutActions";
function WorkoutHistoryScreen({ navigation }) {
  const dispatch = useDispatch();
  const plans = useSelector((state) => state.plans);
  const workouts = useSelector((state) => state.workouts);
  useEffect(() => {
    dispatch(getWorkouts());
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Workouts</Text>
      <Text style={styles.subtitle}>Choose a workout for details</Text>
      <View style={styles.workoutsHolder}>
        <FlatList
          data={workouts}
          keyExtractor={(workout) => workout._id.toString()}
          renderItem={({ item }) => {
            const startDate = new Date(item.startTime);
            const startString =
              startDate.getMonth() +
              1 +
              "/" +
              startDate.getDate() +
              "/" +
              startDate.getFullYear();

            const planName = plans.filter((plan) => {
              return plan._id == item.planID;
            })[0].name;
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("View Workout", item);
                }}
              >
                <View style={styles.planHolder}>
                  <Text style={styles.planTitle}>{planName}</Text>
                  <Text style={{ ...styles.subtext }}>
                    {item.groups.length + " exercises | " + startString}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => <View style={styles.line}></View>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.mainBG,
    flex: 1,
    alignItems: "center",
  },
  workoutsHolder: {
    backgroundColor: colors.lightBG,
    width: "80%",
    borderRadius: 16,
    height: "50%",
    marginVertical: 4,
    paddingVertical: 8,
  },
  planHolder: {
    marginTop: 10,
    marginHorizontal: "7.5%",
    marginBottom: 10,
  },
  planTitle: {
    fontWeight: "700",
  },
  line: {
    height: 1,
    width: "85%",
    backgroundColor: colors.subtitle,
    alignSelf: "center",
  },
  title: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 30,
    color: colors.mainDark,
    marginBottom: 16,
  },
  subtitle: {
    alignSelf: "center",
    fontSize: 15,
    color: colors.subtitle,
    marginBottom: 12,
  },
  subtext: {
    color: colors.subtitle,
    fontSize: 15,
    marginVertical: 4,
  },
});

export default WorkoutHistoryScreen;
