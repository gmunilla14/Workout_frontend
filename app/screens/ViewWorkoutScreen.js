import React from "react";
import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Group from "../components/Group";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getExercises } from "../store/actions/exerciseActions";
import colors from "../utils/colors";
function ViewWorkoutScreen({ route }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExercises());
  }, []);
  const workout = route.params;
  const startDate = new Date(workout.startTime);

  const plans = useSelector((state) => state.plans);
  const exercises = useSelector((state) => state.exercises);

  const startString =
    startDate.getMonth() +
    1 +
    "/" +
    startDate.getDate() +
    "/" +
    startDate.getFullYear();

  const planName = plans.filter((plan) => {
    return plan._id == workout.planID;
  })[0].name;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{planName}</Text>
      <Text style={styles.subtitle}>{startString}</Text>
      <ScrollView>
        <View style={styles.groupsHolder}>
          <FlatList
            data={workout.groups}
            keyExtractor={(group) => group._id.toString()}
            renderItem={({ item, index }) => (
              <>
                <Group
                  group={item}
                  groupIndex={index}
                  exercises={exercises}
                  selectedPlan={workout}
                  doingWorkout={false}
                  isWorkout={true}
                />
              </>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.mainBG,
  },
  groupsHolder: {
    width: "80%",
    alignSelf: "center",
    marginTop: 16,
  },
  title: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 30,
    color: colors.mainDark,
  },
  subtitle: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "700",
    color: colors.subtitle,
  },
});

export default ViewWorkoutScreen;
