import React from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getExercises } from "../store/actions/exerciseActions";
import { useDispatch } from "react-redux";

function WorkoutGroup({
  group,
  currentSet,
  doingWorkout,
  setSelectedPlan,
  groupIndex,
  selectedPlan,
}) {
  const dispatch = useDispatch();

  const exercises = useSelector((state) => state.exercises);
  const muscles = useSelector((state) => state.muscles);

  const exerciseList = exercises.filter((ex) => ex._id === group.exerciseID);

  const muscleList = muscles.filter((mus) =>
    exerciseList[0].muscles.includes(mus._id)
  );

  const incrementPlan = (field, value, groupIndex, index) => {
    let currentGroups = selectedPlan.groups;
    currentGroups[groupIndex].sets[index][field] =
      currentGroups[groupIndex].sets[index][field] + value;
    setSelectedPlan({
      ...selectedPlan,
      groups: currentGroups,
    });
  };

  return (
    <>
      {doingWorkout ? (
        <>
          <View style={styles.container}>
            <Text>{exerciseList[0].name}</Text>
            <Text>Muscles</Text>
            <FlatList
              data={muscleList}
              keyExtractor={(muscle) => muscle._id.toString()}
              renderItem={({ item }) => {
                return <Text>{item.name}</Text>;
              }}
              listKey={(item) => "Mu" + item._id.toString()}
            />
            <FlatList
              data={group.sets}
              keyExtractor={(set) => set._id.toString()}
              renderItem={({ item, index }) => {
                if (index < currentSet) {
                  return (
                    <View style={styles.finished}>
                      {item.type === "exercise" ? (
                        <>
                          <Text>Set {Math.floor((index + 1) / 2) + 1}</Text>
                          <Text>Reps {item.reps}</Text>
                          <Text>Weight {item.weight}</Text>
                        </>
                      ) : (
                        <Text>Rest for {item.duration}</Text>
                      )}
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.unfinished}>
                      {item.type === "exercise" ? (
                        <>
                          <Text>Set {Math.floor((index + 1) / 2) + 1}</Text>
                          <Text>Reps {item.reps}</Text>
                          <Text>Weight {item.weight}</Text>
                        </>
                      ) : (
                        <Text>Rest for {item.duration}</Text>
                      )}
                    </View>
                  );
                }
              }}
              listKey={(item) => "Ex" + item._id.toString()}
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.container}>
            <Text>{exerciseList[0].name}</Text>
            <Text>Muscles</Text>
            <FlatList
              data={muscleList}
              keyExtractor={(muscle) => muscle._id.toString()}
              renderItem={({ item }) => {
                return <Text>{item.name}</Text>;
              }}
              listKey={(item) => "Mu" + item._id.toString()}
            />
            <FlatList
              data={group.sets}
              keyExtractor={(set) => set._id.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.show}>
                  {item.type === "exercise" ? (
                    <>
                      <Text>Set {Math.floor((index + 1) / 2) + 1}</Text>

                      <Text>Reps {item.reps}</Text>
                      <Button
                        title="+"
                        onPress={() => {
                          incrementPlan("reps", 1, groupIndex, index);
                        }}
                      />
                      <Button
                        title="-"
                        onPress={() => {
                          incrementPlan("reps", -1, groupIndex, index);
                        }}
                      />
                      <Text>Weight {item.weight}</Text>
                      <Button
                        title="+"
                        onPress={() => {
                          incrementPlan("weight", 1, groupIndex, index);
                        }}
                      />
                      <Button
                        title="-"
                        onPress={() => {
                          incrementPlan("weight", -1, groupIndex, index);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Text>Rest for {item.duration}</Text>
                      <Button
                        title="+"
                        onPress={() => {
                          incrementPlan("duration", 1, groupIndex, index);
                        }}
                      />
                      <Button
                        title="-"
                        onPress={() => {
                          incrementPlan("duration", -1, groupIndex, index);
                        }}
                      />
                    </>
                  )}
                </View>
              )}
              listKey={(item) => "Ex" + item._id.toString()}
            />
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "black",
  },
  finished: {
    backgroundColor: "green",
    color: "red",
  },
  unfinished: {
    backgroundColor: "yellow",
  },
  show: {
    backgroundColor: "white",
  },
});

export default WorkoutGroup;
