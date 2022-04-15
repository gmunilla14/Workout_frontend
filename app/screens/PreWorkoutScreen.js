import React from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPlans } from "../store/actions/planActions";
import { getExercises } from "../store/actions/exerciseActions";
import { getMuscles } from "../store/actions/muscleActions";
import { editPlan } from "../store/actions/planActions";
import Group from "../components/Group";
import Footer from "../components/Footer";
import colors from "../utils/colors";

function PreWorkoutScreen({ route, navigation }) {
  //State for originally chosen plan
  const [ogPlan, setOGPlan] = useState(false);

  //State for new plan
  const [selectedPlan, setSelectedPlan] = useState(false);

  const dispatch = useDispatch();

  //On load, get plans, exercises, and muscles and set plan states to chosen plan
  useEffect(() => {
    dispatch(getPlans());
    dispatch(getExercises());
    dispatch(getMuscles());

    setOGPlan(route.params);
    setSelectedPlan(route.params);
  }, []);

  const exercises = useSelector((state) => state.exercises);

  const handlePlanChange = () => {
    //Deep copy chosen plan
    let editedPlan = JSON.parse(JSON.stringify(selectedPlan));

    //Delete undesired attributes for plan
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
  };

  const handleBeginWorkout = () => {
    //If the plan has changed, ask user if they would like to implement
    //changes to the original plan
    if (selectedPlan != ogPlan) {
      Alert.alert(
        "Plan Edits",
        "You have updated the original plan. Would you like to save those changes for the future?",
        [
          {
            text: "Yes",
            onPress: () => {
              handlePlanChange();
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
  };
  return (
    <View style={styles.container}>
      {selectedPlan && (
        <>
          <ScrollView>
            <Text style={styles.title}>{selectedPlan.name}</Text>
            <View style={styles.groupsHolder}>
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
                  </>
                )}
              />
            </View>
          </ScrollView>

          <Footer
            topText={selectedPlan.groups.length + " EXERCISES"}
            buttonText="Begin Workout"
            onButtonPress={() => {
              handleBeginWorkout();
            }}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.mainBG,
  },
  groupsHolder: {
    width: "90%",
    alignSelf: "center",
  },
  title: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "700",
    marginVertical: 30,
    color: colors.mainDark,
  },
});

export default PreWorkoutScreen;
