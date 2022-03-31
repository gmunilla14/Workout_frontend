import React from "react";
import { View, StyleSheet, Text } from "react-native";
import IncrementPill from "./IncrementPill";
import { useSelector } from "react-redux";
function Clock({ timeString, workout, currentGroup, currentSet, setWorkout }) {
  let status = "";

  const exercises = useSelector((state) => state.exercises);

  const getCurrentExercise = (exerciseID) => {
    const exerciseList = exercises.filter((ex) => ex._id === exerciseID);
    return exerciseList[0];
  };

  let currentExercise = {};
  let notes = "";
  if (workout.groups[currentGroup].sets[currentSet].type === "exercise") {
    currentExercise = getCurrentExercise(
      workout.groups[currentGroup].exerciseID
    );
    if (currentExercise) {
      status = currentExercise.name;
      notes = currentExercise.notes;
    }
  } else {
    status = "Review Last Set";
  }

  const set = workout.groups[currentGroup].sets[currentSet];

  return (
    <View style={styles.container}>
      <View style={styles.clock}>
        <Text style={styles.time}>{timeString}</Text>
      </View>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.pillHolder}>
        <IncrementPill
          text={set.reps + " REPS"}
          field="reps"
          groupIndex={currentGroup}
          index={set.type === "exercise" ? currentSet : currentSet - 1}
          selectedPlan={workout}
          setSelectedPlan={setWorkout}
          editable={set.type === "rest"}
        />
        <IncrementPill
          text={set.weight + " LBS"}
          field="weight"
          groupIndex={currentGroup}
          index={set.type === "exercise" ? currentSet : currentSet - 1}
          selectedPlan={workout}
          setSelectedPlan={setWorkout}
          editable={set.type === "rest"}
        />
      </View>

      {set.type === "exercise" ? (
        <>
          <View style={styles.notesHolder}>
            <View style={styles.notesBar}></View>
            <View style={styles.notesContent}>
              <Text style={styles.notesHeader}>NOTES</Text>
              <Text style={styles.notes}>{notes}</Text>
            </View>
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  clock: {
    height: 224,
    width: 320,
    backgroundColor: "white",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  time: {
    fontSize: 58,
  },
  status: {
    fontSize: 24,
    marginVertical: 20,
  },
  pillHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  notesHolder: {
    width: "80%",
    flexDirection: "row",
    paddingVertical: 16,
    backgroundColor: "white",
    marginTop: 24,
  },
  notesBar: {
    marginHorizontal: 12,
    height: "100%",
    width: 7,
    backgroundColor: "orange",
    borderRadius: 4,
  },
  notesHeader: {
    fontSize: 18,
    fontWeight: "700",
  },
  notesContent: {
    width: "80%",
  },
});

export default Clock;