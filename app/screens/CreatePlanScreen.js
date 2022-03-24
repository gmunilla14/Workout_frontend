import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { Picker } from "@react-native-picker/picker";
import { createPlan } from "../store/actions/planActions";
import { getExercises } from "../store/actions/exerciseActions";
import { useDispatch, useSelector } from "react-redux";
function CreatePlanScreen({ navigation }) {
  const [selectedExercise, setSelectedExercise] = useState();
  const [selectedSets, setSelectedSets] = useState(0);
  const [selectedReps, setSelectedReps] = useState(0);

  const [selectedWeight, setSelectedWeight] = useState(0);

  const [selectedRest, setSelectedRest] = useState(0);

  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.exercises);

  useEffect(() => {
    dispatch(getExercises());
  }, []);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: "",
          groups: [],
        }}
        onSubmit={async (values) => {
          console.log(values);
          dispatch(createPlan(values));
          navigation.goBack();
        }}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => (
          <>
            <Text>Plan</Text>
            <TextInput
              placeholder="Name"
              name="name"
              onChangeText={handleChange("name")}
            />

            <Picker
              selectedValue={selectedExercise}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedExercise(itemValue);
              }}
            >
              {exercises.map((exercise) => {
                return (
                  <Picker.Item
                    key={exercise._id}
                    label={exercise.name}
                    value={exercise}
                  />
                );
              })}
            </Picker>

            <TextInput
              placeholder="Sets"
              onChangeText={(text) => setSelectedSets(text)}
            />

            <TextInput
              placeholder="Reps"
              onChangeText={(text) => setSelectedReps(text)}
            />

            <TextInput
              placeholder="Weight"
              onChangeText={(text) => setSelectedWeight(text)}
            />

            <TextInput
              placeholder="Rest Duration"
              onChangeText={(text) => setSelectedRest(text)}
            />

            <Button
              title="Add Sets"
              onPress={() => {
                let sets = [];
                for (let i = 0; i < Number(selectedSets); i++) {
                  if (i === 0) {
                    sets.push({
                      type: "exercise",
                      reps: Number(selectedReps),
                      weight: Number(selectedWeight),
                    });
                  } else {
                    sets.push({
                      type: "rest",
                      duration: Number(selectedRest),
                    });

                    sets.push({
                      type: "exercise",
                      reps: Number(selectedReps),
                      weight: Number(selectedWeight),
                    });
                  }
                }

                let group = {
                  exerciseID: selectedExercise._id,
                  sets,
                };

                console.log(values.groups);
                let currentGroups = values.groups;
                currentGroups.push(group);
                setFieldValue("groups", currentGroups);
              }}
            />
            <Button title="Create Plan" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Button
        title="Get Selected Ex"
        onPress={() => {
          console.log(selectedExercise);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CreatePlanScreen;
