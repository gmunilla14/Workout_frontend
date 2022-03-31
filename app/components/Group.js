import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import WorkoutSet from "./WorkoutSet";
import AppButton from "./AppButton";
import { useSelector } from "react-redux";
import Notes from "./Notes";
import { useState } from "react";
import { useEffect } from "react";
function Group({
  group,
  groupIndex,
  exercises,
  selectedPlan,
  setSelectedPlan,
  doingWorkout,
}) {
  const muscles = useSelector((state) => state.muscles);
  const [expanded, setExpanded] = useState(false);
  const exerciseList = exercises.filter((ex) => ex._id === group.exerciseID);
  const [maxGroup, setMaxGroup] = useState(0);
  let muscleList = [];
  const currentExercise = exerciseList[0];

  useEffect(() => {
    if (selectedPlan) {
      setMaxGroup(selectedPlan.groups.length - 1);
    }
  }, []);

  if (exerciseList.length > 0) {
    muscleList = muscles.filter((mus) =>
      currentExercise.muscles.includes(mus._id)
    );
  }

  const sets = group.sets;

  const swapSets = (index1, index2) => {
    const tempGroup = JSON.parse(JSON.stringify(selectedPlan.groups[index1]));
    let initialGroups = [...selectedPlan.groups];

    initialGroups[index1] = selectedPlan.groups[index2];
    initialGroups[index2] = tempGroup;

    console.log(initialGroups);

    setSelectedPlan({ ...selectedPlan, groups: initialGroups });
  };

  const addSet = () => {
    let groups = [...selectedPlan.groups];
    let groupLength = groups[groupIndex].sets.length;
    let groupSets = groups[groupIndex].sets;
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
          <View style={styles.arrowHolder}>
            {groupIndex === 0 ? (
              <Ionicons
                name="md-caret-up-sharp"
                size={36}
                color="grey"
                style={styles.upArrow}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  swapSets(groupIndex, groupIndex - 1);
                }}
              >
                <Ionicons
                  name="md-caret-up-sharp"
                  size={36}
                  color="black"
                  style={styles.upArrow}
                />
              </TouchableOpacity>
            )}
            {groupIndex === maxGroup ? (
              <Ionicons
                name="md-caret-down-sharp"
                size={36}
                color="grey"
                style={styles.downArrow}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  swapSets(groupIndex, groupIndex + 1);
                }}
              >
                <Ionicons
                  name="md-caret-down-sharp"
                  size={36}
                  color="black"
                  style={styles.downArrow}
                />
              </TouchableOpacity>
            )}
          </View>
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
            <Ionicons
              name={expanded ? "md-caret-up-sharp" : "md-caret-down-sharp"}
              size={36}
              color="black"
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
              return (
                <WorkoutSet
                  set={item}
                  index={index}
                  groupIndex={groupIndex}
                  editable={!doingWorkout ? true : false}
                  selectedPlan={selectedPlan}
                  setSelectedPlan={setSelectedPlan}
                />
              );
            }}
          />
          <View style={styles.buttonHolder}>
            <AppButton
              text="+ Add Another Set"
              onPress={() => {
                addSet();
              }}
              size={18}
            />
          </View>

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
    backgroundColor: "white",
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
  },
  dropDown: {
    justifyContent: "center",
    marginTop: 20,
  },
  buttonHolder: {
    width: "60%",
    alignSelf: "center",
    marginVertical: 12,
  },
});

export default Group;
