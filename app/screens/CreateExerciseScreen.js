import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { getMuscles } from "../store/actions/muscleActions";
import { createExercise } from "../store/actions/exerciseActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import colors from "../utils/colors";
import AppTextInput from "../components/AppTextInput";
import Dropdown from "../components/Dropdown";
import { AntDesign } from "@expo/vector-icons";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).max(32).label("Name"),
  notes: Yup.string().max(200).label("Notes"),
  muscles: Yup.array().of(Yup.string()).min(1).label("Muscles"),
});

function CreateExerciseScreen({ navigation }) {
  const dispatch = useDispatch();

  //Get Muscles on Load
  useEffect(async () => {
    dispatch(getMuscles());
  }, []);

  const muscles = useSelector((state) => state.muscles);

  //State for muscles that have been added to the exercise
  const [chosenMuscles, setChosenMuscles] = useState([]);

  //State for muscles that havent been added to exercise
  const [remainingMuscles, setRemainingMuscles] = useState(muscles);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Formik
          initialValues={{
            name: "",
            muscles: [],
            notes: "",
          }}
          onSubmit={async (values) => {
            //Send Exercise to database
            dispatch(createExercise(values));
            navigation.goBack();
          }}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            setFieldValue,
            touched,
            values,
          }) => (
            <>
              <View style={styles.nameHolder}>
                <View style={styles.nameInput}>
                  <AppTextInput
                    title="Exercise Name"
                    onChangeText={handleChange("name")}
                    error={touched["name"] && errors["name"]}
                    value={values.name}
                  />
                </View>

                <View style={styles.createButton}>
                  <AppButton
                    text="Create Exercise"
                    onPress={handleSubmit}
                    size={16}
                  />
                </View>
              </View>

              <View style={styles.notesHolder}>
                <AppTextInput
                  title="Notes"
                  onChangeText={handleChange("notes")}
                  error={errors["notes"]}
                  multiline={true}
                  numberOfLines={3}
                  value={values.notes}
                />
              </View>
              <View style={styles.musclesHolder}>
                <View style={styles.muscleList}>
                  <Text style={{ color: colors.subtitle }}>Muscles:</Text>
                  <FlatList
                    data={chosenMuscles}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => {
                      return (
                        <View style={styles.muscleChoice}>
                          <Text>{item.name}</Text>
                          <TouchableOpacity
                            onPress={() => {
                              //Add muscle to remaining muscles and remove from exercise
                              setRemainingMuscles([...remainingMuscles, item]);
                              setChosenMuscles(
                                chosenMuscles.filter((muscle) => {
                                  return item._id !== muscle._id;
                                })
                              );

                              //Set the form value of muscles to muscle IDs
                              if (chosenMuscles.length > 1) {
                                setFieldValue(
                                  "muscles",
                                  chosenMuscles
                                    .filter((muscle) => {
                                      return item._id !== muscle._id;
                                    })
                                    .map((mus) => mus._id)
                                );
                              } else {
                                setFieldValue("muscles", []);
                              }
                            }}
                          >
                            <AntDesign name="close" />
                          </TouchableOpacity>
                        </View>
                      );
                    }}
                  />
                </View>

                <View style={styles.dropdownHolder}>
                  <Dropdown
                    setSelectedValue={(item) => {
                      setRemainingMuscles(
                        remainingMuscles.filter((muscle) => {
                          return muscle._id !== item._id;
                        })
                      );
                      setChosenMuscles([...chosenMuscles, item]);
                      setFieldValue(
                        "muscles",
                        [...chosenMuscles, item].map((mus) => mus._id)
                      );
                    }}
                    error={errors["muscles"]}
                    values={remainingMuscles}
                    automaticallyClose={false}
                    placeholder="Choose Muscle"
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBG,
    height: "100%",
    paddingTop: 24,
  },
  musclesHolder: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  muscleList: {
    width: "40%",
    marginLeft: "10%",
  },
  muscleChoice: {
    flexDirection: "row",
    backgroundColor: colors.lightBG,
    width: 140,
    marginVertical: 4,
    borderRadius: 4,
    padding: 4,
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameHolder: {
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameInput: {
    width: "55%",
  },
  notesHolder: {
    width: "80%",
    alignSelf: "center",
  },

  dropdownHolder: {
    width: "40%",
  },
  createButton: {
    marginTop: 8,
    width: "42.5%",
    alignSelf: "center",
  },
});

export default CreateExerciseScreen;
