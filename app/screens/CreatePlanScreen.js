import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  DevSettings,
  FlatList,
  ScrollView,
} from "react-native";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";
import { Picker } from "@react-native-picker/picker";
import { createPlan, getPlans } from "../store/actions/planActions";
import { getExercises } from "../store/actions/exerciseActions";
import { useDispatch, useSelector } from "react-redux";
import colors from "../utils/colors";
import AppTextInput from "../components/AppTextInput";
import Dropdown from "../components/Dropdown";
import Group from "../components/Group";
import AppButton from "../components/AppButton";
function CreatePlanScreen({ navigation }) {
  const [selectedExercise, setSelectedExercise] = useState();
  const [selectedSets, setSelectedSets] = useState(0);
  const [selectedReps, setSelectedReps] = useState(0);
  const [groups, setGroups] = useState([]);
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
          dispatch(createPlan(values));
          navigation.navigate("Home", true);
        }}
      >
        {({ handleChange, handleSubmit, values, setFieldValue }) => (
          <>
            <View style={styles.planHeader}>
              <View style={styles.planName}>
                <AppTextInput
                  title="Plan Name"
                  onChangeText={handleChange("name")}
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

            <View style={styles.setInputHolder}>
              <View style={styles.dropdownHolder}>
                <Text>Exercise: </Text>
                <Dropdown
                  selectedValue={selectedExercise}
                  setSelectedValue={setSelectedExercise}
                  values={exercises}
                  placeholder="-- Exercise --"
                />
              </View>
              <View style={styles.setInputRow}>
                <View style={styles.setInput}>
                  <AppTextInput
                    title="Sets"
                    onChangeText={(text) => setSelectedSets(text)}
                    keyboardType="number-pad"
                  />
                </View>
                <View style={styles.setInput}>
                  <AppTextInput
                    title="Reps"
                    onChangeText={(text) => setSelectedReps(text)}
                    keyboardType="number-pad"
                  />
                </View>

                <View style={styles.setInput}>
                  <AppTextInput
                    title="Weight (lbs)"
                    onChangeText={(text) => setSelectedWeight(text)}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.setInputRow}>
                <AppTextInput
                  title="Rest Duration (sec)"
                  onChangeText={(text) => setSelectedRest(text)}
                  keyboardType="number-pad"
                />
                <View style={styles.createPlanButton}>
                  <AppButton
                    text="Add Sets"
                    size={16}
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

                      let currentGroups = values.groups;
                      currentGroups.push(group);
                      setFieldValue("groups", currentGroups);
                      setGroups(currentGroups);
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.line}></View>
            {groups && (
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
    backgroundColor: colors.mainDark,
    alignSelf: "center",
    marginVertical: 12,
  },
  dropdownHolder: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 100,
  },
  setInputHolder: {
    justifyContent: "center",
    alignItems: "center",
  },
  setInputRow: {
    flexDirection: "row",
    marginVertical: 8,
  },
  setInput: {
    marginHorizontal: 8,
    minWidth: 50,
  },
  groupHolder: {
    width: "80%",
    alignSelf: "center",
  },
});

export default CreatePlanScreen;
