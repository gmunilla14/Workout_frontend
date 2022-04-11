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
function HomeScreen({ navigation }) {
  let plans = useSelector((state) => state.plans);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlans());
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
                <Text style={{ ...styles.subtext, marginVertical: 8 }}>
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

      <Button
        title="Sign Out"
        onPress={async () => {
          await AsyncStorage.removeItem("token");
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "Auth Nav",
              },
            ],
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFF3F8",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  subtext: {
    color: "#BEC2C5",
    fontSize: 15,
  },
  workoutsHolder: {
    backgroundColor: "white",
    width: "80%",
    borderRadius: 16,
    height: "50%",
    marginBottom: 4,
  },
  planHolder: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  planTitle: {
    fontWeight: "700",
  },
  line: {
    height: 1,
    width: 240,
    backgroundColor: "#EFF3F8",
    alignSelf: "center",
  },
  addButton: {
    width: "80%",
    height: "8%",
    backgroundColor: "white",
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e5e5e5",
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
