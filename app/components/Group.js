import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import WorkoutSet from "./WorkoutSet";
import AppButton from "./AppButton";
import Notes from "./Notes";
import colors from "../utils/colors";
function Group({
  group,
  groupIndex,
  exercises,
  selectedPlan,
  setSelectedPlan,
  doingWorkout,
  currentSet,
  currentGroup,
  inBetween,
  isWorkout,
  setCurrentSet,
  setCurrentGroup,
  setInBetween,
  setMaxSet,
  onStop,
}) {
  const [expanded, setExpanded] = useState(false);
  const [maxGroup, setMaxGroup] = useState(0);

  const exerciseList = exercises.filter((ex) => ex._id === group.exerciseID);
  const currentExercise = exerciseList[0];

  //When current plan/workout changes, calculate number of groups
  useEffect(() => {
    if (selectedPlan) {
      setMaxGroup(selectedPlan.groups.length - 1);
    }
  }, [selectedPlan]);

  const sets = group.sets;

  //Swap this group with another based on indices
  const swapSets = (index1, index2) => {
    const tempGroup = JSON.parse(JSON.stringify(selectedPlan.groups[index1]));
    let initialGroups = [...selectedPlan.groups];

    initialGroups[index1] = selectedPlan.groups[index2];
    initialGroups[index2] = tempGroup;

    setSelectedPlan({ ...selectedPlan, groups: initialGroups });
  };

  //Add set to group
  const addSet = () => {
    let groups = [...selectedPlan.groups];
    let groupLength = groups[groupIndex].sets.length;
    let groupSets = groups[groupIndex].sets;

    //If there is another rest in the group, use that to add rest
    //if not, create a rest with 60 seconds
    if (groupLength > 1) {
      groupSets.push({
        ...groupSets[groupLength - 2],
        _id: String(Math.floor(Math.random() * 100000000) + 1),
      });
    } else {
      groupSets.push({
        type: "rest",
        duration: 60,
        _id: String(Math.floor(Math.random() * 100000000) + 1),
      });
    }

    //Add a copy of the last set to the end of the group
    groupSets.push({
      ...groupSets[groupLength - 1],
      _id: String(Math.floor(Math.random() * 100000000) + 1),
    });

    groups[groupIndex].sets = groupSets;
    setSelectedPlan({
      ...selectedPlan,
      groups: groups,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          {!isWorkout && (
            <View style={styles.arrowHolder}>
              {groupIndex === 0 ||
              (doingWorkout && !inBetween && groupIndex <= currentGroup + 1) ||
              (doingWorkout && inBetween && currentGroup >= groupIndex) ? (
                <MaterialIcons
                  name="keyboard-arrow-up"
                  size={36}
                  color={colors.subtitle}
                  style={styles.upArrow}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    swapSets(groupIndex, groupIndex - 1);
                  }}
                >
                  <MaterialIcons
                    name="keyboard-arrow-up"
                    size={36}
                    color={colors.mainDark}
                    style={styles.upArrow}
                  />
                </TouchableOpacity>
              )}
              {groupIndex === maxGroup ||
              (doingWorkout && groupIndex <= currentGroup && !inBetween) ||
              (inBetween && currentGroup > groupIndex) ? (
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={36}
                  color={colors.subtitle}
                  style={styles.downArrow}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    swapSets(groupIndex, groupIndex + 1);
                  }}
                >
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={36}
                    color={colors.mainDark}
                    style={styles.downArrow}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}

          <View style={styles.titleHolder}>
            {exerciseList.length > 0 && (
              <Text style={styles.title}>{currentExercise.name}</Text>
            )}
          </View>
        </View>

        <View style={styles.dropDown}>
          <TouchableOpacity
            onPress={() => {
              setExpanded(!expanded);
            }}
          >
            <MaterialIcons
              name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={36}
              color={colors.mainDark}
              style={styles.downArrow}
            />
          </TouchableOpacity>
        </View>
      </View>

      {expanded && (
        <>
          <FlatList
            data={sets}
            keyExtractor={() => String(Math.random())}
            renderItem={({ item, index }) => {
              let editable = false;
              let done = false;
              //Determine if the group should be editable
              if (doingWorkout) {
                if (groupIndex > currentGroup) {
                  editable = true;
                } else if (groupIndex === currentGroup) {
                  if (index >= currentSet) {
                    editable = true;
                  } else {
                    done = true;
                  }
                } else {
                  done = true;
                }
              } else {
                editable = true;
              }

              return (
                <WorkoutSet
                  set={item}
                  index={index}
                  groupIndex={groupIndex}
                  editable={editable && !isWorkout}
                  selectedPlan={selectedPlan}
                  setSelectedPlan={setSelectedPlan}
                  isWorkout={isWorkout}
                  done={done}
                  setMaxGroup={setMaxGroup}
                  maxGroup={maxGroup}
                  currentSet={currentSet}
                  setCurrentSet={setCurrentSet}
                  setMaxSet={setMaxSet}
                  setCurrentGroup={setCurrentGroup}
                  setInBetween={setInBetween}
                  currentGroup={currentGroup}
                  onStop={onStop}
                  doingWorkout={doingWorkout}
                />
              );
            }}
          />
          {isWorkout || (doingWorkout && currentGroup > groupIndex) ? (
            <View style={{ marginBottom: 12 }}></View>
          ) : (
            <View style={styles.buttonHolder}>
              <AppButton
                text="+ Add Another Set"
                onPress={() => {
                  addSet();
                }}
                size={18}
              />
            </View>
          )}

          {exerciseList.length > 0 && (
            <>
              {currentExercise.notes !== "" && (
                <Notes notes={exerciseList[0].notes} />
              )}
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: colors.lightBG,
    marginVertical: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  leftSection: {
    flexDirection: "row",
  },
  arrowHolder: {},
  upArrow: {
    marginBottom: -8,
  },
  downArrow: {
    marginTop: -8,
  },
  titleHolder: {
    justifyContent: "center",
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.mainDark,
  },
  dropDown: {
    justifyContent: "center",
    marginTop: 12,
  },
  buttonHolder: {
    width: "60%",
    alignSelf: "center",
    marginVertical: 12,
  },
});

export default Group;
