import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Button } from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getPlans } from "../store/actions/planActions";
import { getExercises } from "../store/actions/exerciseActions";
import { getMuscles } from "../store/actions/muscleActions";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPlans());
    dispatch(getExercises());
    dispatch(getMuscles());
  }, []);

  const plans = useSelector((state) => state.plans);

  return (
    <View style={styles.container}>
      <Text>All Workouts</Text>
      <Text>Click on a workout to begin</Text>
      <View>
        <FlatList
          data={plans}
          keyExtractor={(plan) => plan._id.toString()}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("Pre Workout", item);
              }}
            >
              <View>
                <Text>{item.name}</Text>
                <Text>LATER MINUTES</Text>
                <Text>{item.groups.length} exercises</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
      <Button
        title="+ New Plan"
        onPress={() => {
          navigation.navigate("Create Plan");
        }}
      />
      <Button
        title="+ Create New Exercise"
        onPress={() => {
          navigation.navigate("Create Exercise");
        }}
      />

      <Button
        title="Sign Out"
        onPress={async () => {
          await AsyncStorage.removeItem("token");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
