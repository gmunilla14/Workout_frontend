import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { getMuscles } from "../routes/muscleRoutes";
import { createExercise } from "../routes/exerciseRoutes";
import { getExercises } from "../routes/exerciseRoutes";
import { Picker } from "@react-native-picker/picker";
import { createPlan } from "../routes/planRoutes";
function CreatePlanScreen(props) {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState();
  const [selectedSets, setSelectedSets] = useState(0);
  const [selectedRest, setSelectedRest] = useState(0);

  useEffect(async () => {
    const exerciseList = await getExercises();
    setExercises(exerciseList);
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
          await createPlan(values);
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
                    });
                  } else {
                    sets.push({
                      type: "rest",
                      duration: Number(selectedRest),
                    });

                    sets.push({
                      type: "exercise",
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
      <Button title="Get Exercises" onPress={getExercises} />
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
