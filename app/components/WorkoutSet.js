import React from "react";
import { View, StyleSheet, Text } from "react-native";
import IncrementPill from "./IncrementPill";

function WorkoutSet({
  set,
  index,
  group,
  currentSet,
  doingWorkout,
  setSelectedPlan,
  groupIndex,
  selectedPlan,
  editable,
}) {
  return (
    <>
      {set.type === "exercise" ? (
        <>
          <View style={styles.exerciseHeader}>
            <Text style={styles.title}>
              {"Set " + (Math.floor((index + 1) / 2) + 1)}
            </Text>
            <Text> Delete</Text>
          </View>
          <View style={styles.buttonParent}>
            <View style={styles.buttonHolderLeft}>
              <IncrementPill
                text={set.reps + " REPS"}
                field="reps"
                groupIndex={groupIndex}
                index={index}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                editable={editable}
              />
            </View>

            <View style={styles.buttonHolderRight}>
              <IncrementPill
                text={set.weight + " LBS"}
                field="weight"
                groupIndex={groupIndex}
                index={index}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                editable={editable}
              />
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.restHolder}></View>
          <Text style={{ ...styles.title, textAlign: "center" }}>
            {"Rest " + set.duration + " Seconds"}{" "}
          </Text>
        </>
      )}
      <View style={styles.container}></View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  exerciseHeader: {
    flexDirection: "row",
    marginHorizontal: 32,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    color: "grey",
    fontWeight: "700",
    marginVertical: 8,
  },
  restHolder: {
    alignItems: "center",
  },
  buttonParent: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonHolderLeft: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    width: "50%",
    borderLeftWidth: 0,
    borderRightWidth: 1,
    alignItems: "center",
  },
  buttonHolderRight: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "black",
    width: "50%",
    borderLeftWidth: 1,
    borderRightWidth: 0,
    alignItems: "center",
  },
});

export default WorkoutSet;
