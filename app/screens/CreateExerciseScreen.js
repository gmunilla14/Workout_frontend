import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { getMuscles } from "../routes/muscleRoutes";
import { createExercise } from "../routes/exerciseRoutes";

function CreateExerciseScreen(props) {
  const [muscles, setMuscles] = useState([]);
  const [chosenMuscles, setChosenMuscles] = useState([]);
  useEffect(async () => {
    const userToken = await AsyncStorage.getItem("token");
    if (userToken) {
      console.log(jwtDecode(userToken));
    }

    const musclesList = await getMuscles();
    setMuscles(musclesList);
  }, []);

  const handleChangeMuscle = (id, values, setFieldValue) => {
    let currentMuscles = values.muscles;
    currentMuscles.push(id);
    console.log(values.muscles);
    setFieldValue("muscles", currentMuscles);
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: "",
          muscles: [],
          notes: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          await createExercise(values);
        }}
      >
        {({ handleChange, handleSubmit, errors, values, setFieldValue }) => (
          <>
            <Text>Exercise</Text>
            <TextInput
              placeholder="Name"
              name="name"
              onChangeText={handleChange("name")}
            />

            <TextInput
              placeholder="Notes"
              name="notes"
              onChangeText={handleChange("notes")}
            />

            {muscles.map((muscle) => {
              return (
                <Button
                  key={muscle._id}
                  title={muscle.name}
                  onPress={() =>
                    handleChangeMuscle(muscle._id, values, setFieldValue)
                  }
                />
              );
            })}

            <Button title="Create Exercise" onPress={handleSubmit} />
          </>
        )}
      </Formik>

      <Button title="Get Muscles" onPress={getMuscles} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CreateExerciseScreen;
