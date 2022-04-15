import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../utils/colors";
import IncrementPill from "./IncrementPill";
import Link from "./Link";
import { AntDesign } from "@expo/vector-icons";
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
  done,
  currentGroup,
  setCurrentSet,
  setCurrentGroup,
  setInBetween,
  setMaxSet,
  onStop,
}) {
  const handleDelete = (index) => {
    const newPlan = JSON.parse(JSON.stringify(selectedPlan));
    const maxSet = newPlan.groups[groupIndex].sets.length - 1;

    //If this is the only set in the group
    if (newPlan.groups[groupIndex].sets.length === 1) {
      //If a workout is being done and this is the last group
      if (groupIndex === newPlan.groups.length - 1 && doingWorkout) {
        //Stop the workout
        onStop();
        return;
      }

      //Remove set
      newPlan.groups.splice(groupIndex, 1);
    } else {
      //If this is the last set in the group
      if (index === maxSet) {
        //Get rid of set and rest above it
        newPlan.groups[groupIndex].sets.splice(index - 1, 2);
        //If this is the last group and set and is the current set
        //in workout, end the workout
        if (
          groupIndex === newPlan.groups.length - 1 &&
          doingWorkout &&
          currentSet === index &&
          currentGroup === groupIndex
        ) {
          setSelectedPlan(newPlan);

          onStop();
          return;
        } else {
          //If deleted set is last one in current exercise, go to next group
          if (currentSet === maxSet - 1 && currentGroup === groupIndex) {
            setCurrentSet(0);
            setMaxSet(newPlan.groups[currentGroup + 1].sets.length - 1);
            setCurrentGroup(currentGroup + 1);
            setInBetween(true);
          }
        }
      } else {
        newPlan.groups[groupIndex].sets.splice(index, 2);
      }
    }

    setSelectedPlan(newPlan);
  };

  return (
    <>
      {set.type === "exercise" ? (
        <>
          <View style={styles.exerciseHeader}>
            <View style={styles.nameHeader}>
              <Text style={styles.title}>
                {"Set " + (Math.floor((index + 1) / 2) + 1)}
              </Text>

              {done && (
                <View style={styles.check}>
                  <AntDesign
                    name="checkcircle"
                    size={24}
                    color={colors.success}
                  />
                </View>
              )}
            </View>

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
  check: {
    alignSelf: "center",
    marginLeft: 8,
  },
  nameHeader: {
    flexDirection: "row",
  },
});

export default WorkoutSet;
