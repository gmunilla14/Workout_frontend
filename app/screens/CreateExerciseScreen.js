import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { getMuscles } from "../store/actions/muscleActions";
import { createExercise } from "../store/actions/exerciseActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
function CreateExerciseScreen({ navigation }) {
  const [chosenMuscles, setChosenMuscles] = useState([]);

  const dispatch = useDispatch();
  useEffect(async () => {
    const userToken = await AsyncStorage.getItem("token");
    if (userToken) {
      console.log(jwtDecode(userToken));
    }

    dispatch(getMuscles());
  }, []);

  const muscles = useSelector((state) => state.muscles);

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
        onSubmit={async (values, { resetForm }) => {
          console.log(values);
          dispatch(createExercise(values));
          navigation.goBack();
        }}
      >
        {({ handleChange, handleSubmit, errors, values, setFieldValue }) => (
          <>
            <Text>Exercise</Text>
            <TextInput
              placeholder="Name"
              name="name"
              onChangeText={handleChange("name")}
              value={values.name || ""}
            />

            <TextInput
              placeholder="Notes"
              name="notes"
              onChangeText={handleChange("notes")}
              value={values.notes || ""}
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
