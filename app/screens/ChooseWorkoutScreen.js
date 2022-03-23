import React from "react";
import { View, StyleSheet, Button, Text, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { getPlans } from "../store/actions/planActions";
import WorkoutGroup from "../components/WorkoutGroup";
import { getExercises } from "../store/actions/exerciseActions";
import { FlatList } from "react-native-gesture-handler";
import { getMuscles } from "../store/actions/muscleActions";
import { editPlan } from "../store/actions/planActions";
function ChooseWorkoutScreen({ navigation }) {
  const [selectedPlan, setSelectedPlan] = useState(false);
  const [ogPlan, setOGPlan] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlans());
    dispatch(getExercises());
    dispatch(getMuscles());
  }, []);
  const plans = useSelector((state) => state.plans);
  const exercises = useSelector((state) => state.exercises);

  return (
    <View style={styles.container}>
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
      <Button
        title="Check Plan Matching"
        onPress={() => {
          console.log(selectedPlan == ogPlan);
          console.log(selectedPlan);
        }}
      />
      <Picker
        selectedValue={ogPlan}
        onValueChange={(itemValue) => {
          setSelectedPlan(itemValue);
          setOGPlan(itemValue);
        }}
      >
        {plans.map((plan) => {
          return <Picker.Item key={plan._id} label={plan.name} value={plan} />;
        })}
      </Picker>
      <FlatList
        data={selectedPlan.groups}
        keyExtractor={(group) => group._id.toString()}
        renderItem={({ item, index }) => (
          <>
            <WorkoutGroup group={item} exercises={exercises} />
            <Button
              title="+ Add Set"
              onPress={() => {
                let groups = [...selectedPlan.groups];
                let groupLength = groups[index].sets.length;
                let groupSets = groups[index].sets;
                groupSets.push({
                  ...groupSets[groupLength - 2],
                  _id: String(Math.floor(Math.random() * 100000000) + 1),
                });
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChooseWorkoutScreen;
