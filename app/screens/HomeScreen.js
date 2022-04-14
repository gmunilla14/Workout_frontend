import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getPlans } from "../store/actions/planActions";
import { getExercises } from "../store/actions/exerciseActions";
import { getMuscles } from "../store/actions/muscleActions";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppButton from "../components/AppButton";
import colors from "../utils/colors";
function HomeScreen({ navigation }) {
  let plans = useSelector((state) => state.plans);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlans());
    dispatch(getMuscles());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Plans</Text>
      <Text
        style={{ ...styles.subtext, textAlign: "center", marginBottom: 20 }}
      >
        Click a plan to get started
      </Text>
      <View style={styles.workoutsHolder}>
        <FlatList
          data={plans}
          keyExtractor={(plan) => plan._id.toString()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("Begin Workout", item);
              }}
            >
              <View style={styles.planHolder}>
                <Text style={styles.planTitle}>{item.name}</Text>
                <Text style={{ ...styles.subtext, marginVertical: 4 }}>
                  {item.groups.length + " exercises"}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          ItemSeparatorComponent={() => <View style={styles.line}></View>}
        />
      </View>
      <View style={styles.buttonHolder}>
        <View style={styles.planButton}>
          <AppButton
            text="+ New Plan"
            onPress={() => {
              navigation.navigate("Create Plan");
            }}
            size={18}
            secondary={true}
          />
        </View>
        <View style={styles.exerciseButton}>
          <AppButton
            text="+ New Exercise"
            onPress={() => {
              navigation.navigate("Create Exercise");
            }}
            size={18}
            secondary={true}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBG,
    alignItems: "center",
    height: "100%",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 16,
    color: colors.mainDark,
    fontWeight: "700",
  },
  subtext: {
    color: colors.subtitle,
    fontSize: 15,
  },
  workoutsHolder: {
    backgroundColor: colors.lightBG,
    width: "80%",
    borderRadius: 16,
    height: "50%",
    marginBottom: 4,
  },
  planHolder: {
    marginTop: 20,
    marginHorizontal: "7.5%",
    marginBottom: 10,
  },
  planTitle: {
    fontWeight: "700",
  },
  line: {
    height: 1,
    width: "85%",
    backgroundColor: colors.subtitle,
    alignSelf: "center",
  },
  buttonHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 12,
  },
  planButton: {
    width: "45%",
  },
  exerciseButton: {
    width: "50%",
  },
});

export default HomeScreen;
