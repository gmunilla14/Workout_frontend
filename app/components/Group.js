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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getExercises } from "../store/actions/exerciseActions";
import { getMuscles } from "../store/actions/muscleActions";
import { getPlans } from "../store/actions/planActions";
import Notes from "./Notes";
import { useState } from "react";
function Group({
  group,
  groupIndex,
  exercises,
  selectedPlan,
  setSelectedPlan,
}) {
  const muscles = useSelector((state) => state.muscles);
  const [expanded, setExpanded] = useState(false);
  const exerciseList = exercises.filter((ex) => ex._id === group.exerciseID);

  let muscleList = [];
  const currentExercise = exerciseList[0];

  if (exerciseList.length > 0) {
    muscleList = muscles.filter((mus) =>
      currentExercise.muscles.includes(mus._id)
    );
  }

  const sets = group.sets;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSection}>
          <View style={styles.arrowHolder}>
            <TouchableOpacity>
              <Ionicons
                name="md-caret-up-sharp"
                size={36}
                color="black"
                style={styles.upArrow}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons
                name="md-caret-down-sharp"
                size={36}
                color="black"
                style={styles.downArrow}
              />
            </TouchableOpacity>
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
                <WorkoutSet set={item} index={index} groupIndex={groupIndex} />
              );
            }}
          />
          <View style={styles.buttonHolder}>
            <AppButton />
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
