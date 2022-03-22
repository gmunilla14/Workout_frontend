import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { getPlans } from "../store/actions/planActions";
import WorkoutGroup from "../components/WorkoutGroup";
import { getExercises } from "../store/actions/exerciseActions";
import { FlatList } from "react-native-gesture-handler";
import { getMuscles } from "../store/actions/muscleActions";
function ChooseWorkoutScreen({ navigation }) {
  const [selectedPlan, setSelectedPlan] = useState(false);
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
          navigation.navigate("Clock", selectedPlan);
        }}
      />
      <Picker
        selectedValue={selectedPlan}
        onValueChange={(itemValue) => {
          setSelectedPlan(itemValue);
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
