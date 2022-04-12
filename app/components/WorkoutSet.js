import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import colors from "../utils/colors";
import IncrementPill from "./IncrementPill";
import Link from "./Link";

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
  isWorkout,
}) {
  const handleDelete = (index) => {
    const newPlan = JSON.parse(JSON.stringify(selectedPlan));
    const maxSet = newPlan.groups[groupIndex].sets.length - 1;

    if (index === maxSet) {
      newPlan.groups[groupIndex].sets.splice(index - 1, 2);
    } else {
      newPlan.groups[groupIndex].sets.splice(index, 2);
    }
    setSelectedPlan(newPlan);
  };

  return (
    <>
      {set.type === "exercise" ? (
        <>
          <View style={styles.exerciseHeader}>
            <Text style={styles.title}>
              {"Set " + (Math.floor((index + 1) / 2) + 1)}
            </Text>
            {editable && (
              <View style={styles.deleteHolder}>
                <Link
                  text="Delete"
                  onPress={() => {
                    handleDelete(index);
                  }}
                />
              </View>
            )}
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
            {!isWorkout
              ? "Rest " + set.duration + " Seconds"
              : "Rested " +
                Math.round((set.endTime - set.startTime) / 100) / 10 +
                " Seconds"}
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
    color: colors.subtitle,
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
    borderColor: colors.subtitle,
    width: "50%",
    borderLeftWidth: 0,
    borderRightWidth: 1,
    alignItems: "center",
  },
  buttonHolderRight: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: colors.subtitle,
    width: "50%",
    borderLeftWidth: 1,
    borderRightWidth: 0,
    alignItems: "center",
  },
  deleteHolder: {
    alignSelf: "center",
  },
  testButton: {
    zIndex: 1000,
  },
});

export default WorkoutSet;
