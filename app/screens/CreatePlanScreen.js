import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { createPlan } from "../store/actions/planActions";
import { getExercises } from "../store/actions/exerciseActions";
import { useDispatch, useSelector } from "react-redux";
import colors from "../utils/colors";
import AppTextInput from "../components/AppTextInput";
import Dropdown from "../components/Dropdown";
import Group from "../components/Group";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).max(100).label("Name"),
  groups: Yup.array()
    .of(
      Yup.object().shape({
        exerciseID: Yup.string().required(),
        sets: Yup.array().of(
          Yup.object().shape({
            type: Yup.string().required().oneOf(["rest", "exercise"]),
            reps: Yup.number(),
            weight: Yup.number(),
            duration: Yup.number(),
          })
        ),
      })
    )
    .min(1)
    .label("Groups"),
});
function CreatePlanScreen({ navigation }) {
  //State and errors for sets to be added
  const [selectedExercise, setSelectedExercise] = useState();
  const [selectedSets, setSelectedSets] = useState(false);
  const [selectedReps, setSelectedReps] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState(false);
  const [selectedRest, setSelectedRest] = useState(0);

  const [setError, setSetError] = useState(false);
  const [repsError, setRepsError] = useState(false);
  const [weightError, setWeightError] = useState(false);
  const [restError, setRestError] = useState(false);
  const [exerciseError, setExerciseError] = useState(false);

  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.exercises);

  //Get Exercises on load
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
          //Send plan to database
          dispatch(createPlan(values));
          navigation.navigate("Home", true);
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.planHeader}>
              <View style={styles.planName}>
                <AppTextInput
                  title="Plan Name"
                  onChangeText={handleChange("name")}
                  error={touched["name"] ? errors["name"] : false}
                  value={values["name"]}
                />
              </View>

              <View style={styles.createPlanButton}>
                <AppButton
                  text="Create Plan"
                  size={16}
                  onPress={handleSubmit}
                />
              </View>
            </View>

            <View style={styles.line}></View>

            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
              <View style={styles.setInputHolder}>
                <View style={styles.dropdownHolder}>
                  <Text style={styles.dropDownLabel}>Exercise</Text>
                  <Dropdown
                    selectedValue={selectedExercise}
                    setSelectedValue={setSelectedExercise}
                    values={exercises}
                    placeholder="-- Exercise --"
                    error={errors["groups"] ? errors["groups"] : exerciseError}
                    setError={setExerciseError}
                  />
                </View>
                <View style={styles.setInputRow}>
                  <View style={styles.setInput}>
                    <AppTextInput
                      title="Sets"
                      onChangeText={(text) => {
                        setSetError(false);
                        setSelectedSets(text);
                      }}
                      keyboardType="number-pad"
                      error={setError}
                      value={selectedSets}
                    />
                  </View>
                  <View style={styles.setInput}>
                    <AppTextInput
                      title="Reps"
                      onChangeText={(text) => {
                        setRepsError(false);
                        setSelectedReps(text);
                      }}
                      keyboardType="number-pad"
                      error={repsError}
                      value={selectedReps}
                    />
                  </View>

                  <View style={styles.setInput}>
                    <AppTextInput
                      title="Weight (lbs)"
                      onChangeText={(text) => {
                        setWeightError(false);
                        setSelectedWeight(text);
                      }}
                      keyboardType="numeric"
                      error={weightError}
                      value={selectedWeight}
                    />
                  </View>
                </View>
                <View style={styles.setInputRow}>
                  <AppTextInput
                    title="Rest Duration (sec)"
                    onChangeText={(text) => {
                      setRestError(false);
                      setSelectedRest(text);
                    }}
                    keyboardType="number-pad"
                    error={restError}
                    value={selectedRest}
                  />
                  <View style={styles.createPlanButton}>
                    <AppButton
                      text="Add Sets"
                      size={16}
                      onPress={() => {
                        //Set errors if any fields are empty
                        let error = false;
                        if (selectedSets <= 0) {
                          setSetError(true);
                          error = true;
                        }

                        if (selectedReps <= 0) {
                          setRepsError(true);
                          error = true;
                        }

                        if (selectedWeight <= 0) {
                          setWeightError(true);
                          error = true;
                        }

                        if (selectedRest <= 0) {
                          setRestError(true);
                          error = true;
                        }

                        if (!selectedExercise) {
                          setExerciseError("Choose an exercise");
                          error = true;
                        }

                        if (error) return;
                        let sets = [];

                        //Push sets into new group
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
                        //Add group to current plan
                        let currentGroups = values.groups;
                        currentGroups.push(group);
                        setFieldValue("groups", currentGroups);

                        //Reset values
                        setSelectedSets(0);
                        setSelectedWeight(0);
                        setSelectedReps(0);
                        setSelectedRest(0);
                        setSelectedExercise();
                        Keyboard.dismiss();
                      }}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.line}></View>
            {values.groups && (
              <ScrollView style={styles.groupHolder}>
                <FlatList
                  data={values.groups}
                  keyExtractor={(group, index) =>
                    group.exerciseID + index + values.groups.length
                  }
                  renderItem={({ item, index }) => (
                    <>
                      <Group
                        group={item}
                        groupIndex={index}
                        exercises={exercises}
                        selectedPlan={values}
                        doingWorkout={false}
                        setSelectedPlan={(plan) => {
                          setFieldValue("groups", plan.groups);
                        }}
                      />
                    </>
                  )}
                />
              </ScrollView>
            )}
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBG,
    height: "100%",
    paddingTop: 12,
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "center",
  },
  planName: {
    width: 200,
  },
  createPlanButton: {
    width: 100,
    marginTop: 14,
    marginLeft: 16,
  },
  line: {
    width: "80%",
    height: 1,
    backgroundColor: colors.subtitle,
    alignSelf: "center",
    marginVertical: 12,
  },
  dropdownHolder: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    zIndex: 100,
    marginBottom: 8,
  },
  dropDownLabel: {
    color: colors.subtitle,
    marginBottom: 4,
    fontWeight: "500",
  },
  setInputHolder: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: "10%",
  },
  setInputRow: {
    flexDirection: "row",
    marginVertical: 8,
  },
  setInput: {
    marginRight: 36,
    minWidth: 50,
  },
  groupHolder: {
    width: "80%",
    alignSelf: "center",
  },
});

export default CreatePlanScreen;
