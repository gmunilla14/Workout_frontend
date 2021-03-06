import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import IncrementPill from "./IncrementPill";
import { useSelector } from "react-redux";
import Notes from "./Notes";
import { useState } from "react";
import colors from "../utils/colors";

function Clock({ mins, secs, workout, currentGroup, currentSet, setWorkout }) {
  const exercises = useSelector((state) => state.exercises);

  let status = "";
  const [overTime, setOverTime] = useState(false);

  const set = workout.groups[currentGroup].sets[currentSet];

  //Check if time has gone over expected duration
  useEffect(() => {
    if (Number(mins) > Number(durationMin)) {
      setOverTime(true);
    } else if (Number(mins) === Number(durationMin)) {
      if (Number(secs) > Number(durationSec)) {
        setOverTime(true);
      }
    } else {
      setOverTime(false);
    }
  }, [secs]);

  //Get exercise object from exercise ID
  const getCurrentExercise = (exerciseID) => {
    const exerciseList = exercises.filter((ex) => ex._id === exerciseID);
    return exerciseList[0];
  };

  let currentExercise = {};
  let notes = "";

  //Set clock text depending if it is an exercise or a rest
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

  //Create time strings for clock
  const timeString = mins + ":" + secs;
  const durationMin = Math.floor(set.duration / 60)
    .toString()
    .padStart(2, "0");
  const durationSec = (set.duration % 60).toString().padStart(2, "0");

  return (
    <View style={styles.container}>
      <View style={{ ...styles.clock, borderWidth: overTime ? 5 : 0 }}>
        <Text style={styles.time}>{timeString}</Text>
        {set.type === "rest" && <Text>{durationMin + ":" + durationSec}</Text>}
      </View>
      <Text style={styles.status}>{status}</Text>
      {status === "Review Last Set" && (
        <Text style={styles.subtitle}>
          Check to make sure that these numbers reflect the workout you just
          completed.
        </Text>
      )}
      <View style={styles.pillHolder}>
        <IncrementPill
          text={
            set.type === "exercise"
              ? set.reps + " REPS"
              : workout.groups[currentGroup].sets[currentSet - 1].reps + " REPS"
          }
          field="reps"
          groupIndex={currentGroup}
          index={set.type === "exercise" ? currentSet : currentSet - 1}
          selectedPlan={workout}
          setSelectedPlan={setWorkout}
          editable={set.type === "rest"}
        />
        <IncrementPill
          text={
            set.type === "exercise"
              ? set.weight + " LBS"
              : workout.groups[currentGroup].sets[currentSet - 1].weight +
                " LBS"
          }
          field="weight"
          groupIndex={currentGroup}
          index={set.type === "exercise" ? currentSet : currentSet - 1}
          selectedPlan={workout}
          setSelectedPlan={setWorkout}
          editable={set.type === "rest"}
        />
      </View>
      <View style={styles.notesHolder}></View>
      {set.type === "exercise" ? <Notes notes={notes} /> : <></>}
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
    backgroundColor: colors.lightBG,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  time: {
    fontSize: 58,
  },
  status: {
    fontSize: 24,
    marginTop: 20,
  },
  pillHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  notesHolder: {
    marginTop: 16,
  },
  subtitle: {
    color: colors.subtitle,
    textAlign: "center",
    marginVertical: 12,
  },
});

export default Clock;
