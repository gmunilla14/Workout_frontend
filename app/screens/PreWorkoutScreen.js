import React from "react";
import { View, StyleSheet, Button, Text, FlatList, Alert } from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import WorkoutGroup from "../components/WorkoutGroup";
import { getPlans } from "../store/actions/planActions";
import { getExercises } from "../store/actions/exerciseActions";
import { getMuscles } from "../store/actions/muscleActions";
import { editPlan } from "../store/actions/planActions";
import Group from "../components/Group";
function PreWorkoutScreen({ route, navigation }) {
  const [selectedPlan, setSelectedPlan] = useState(false);
  const [ogPlan, setOGPlan] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlans());
    dispatch(getExercises());
    dispatch(getMuscles());

    setOGPlan(route.params);
    setSelectedPlan(route.params);
  }, []);
  const exercises = useSelector((state) => state.exercises);
  return (
    <View style={styles.container}>
      <Button
        title="Get Plan"
        onPress={() => {
          console.log(selectedPlan);
        }}
      />
      <Button
        title="Go to Clock"
        onPress={() => {
          if (selectedPlan != ogPlan) {
            Alert.alert(
              "Plan Edits",
              "You have updated the original plan. Would you like to save those changes for the future?",
              [
                {
                  text: "Yes",
                  onPress: () => {
                    let editedPlan = JSON.parse(JSON.stringify(selectedPlan));
                    delete editedPlan._id;
                    delete editedPlan.creatorID;
                    delete editedPlan.__v;
                    editedPlan.groups.forEach((group, index) => {
                      delete editedPlan.groups[index]._id;
                      group.sets.forEach((set, setIndex) => {
                        delete editedPlan.groups[index].sets[setIndex]._id;
                      });
                    });

                    dispatch(editPlan(ogPlan._id, editedPlan));
                    navigation.navigate("Clock", selectedPlan);
                  },
                },
                {
                  text: "No",
                  onPress: () => {
                    navigation.navigate("Clock", selectedPlan);
                  },
                },
              ]
            );
          } else {
            navigation.navigate("Clock", selectedPlan);
          }
        }}
      />
      {selectedPlan && (
        <FlatList
          data={selectedPlan.groups}
          keyExtractor={(group) => group._id.toString()}
          renderItem={({ item, index }) => (
            <>
              <Group
                group={item}
                groupIndex={index}
                exercises={exercises}
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
                doingWorkout={false}
              />

              <Button
                title="+ Add Set"
                onPress={() => {
                  let groups = [...selectedPlan.groups];
                  let groupLength = groups[index].sets.length;
                  let groupSets = groups[index].sets;
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

                  groups[index].sets = groupSets;
                  setSelectedPlan({
                    ...selectedPlan,
                    groups: groups,
                  });
                }}
              />
            </>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PreWorkoutScreen;
