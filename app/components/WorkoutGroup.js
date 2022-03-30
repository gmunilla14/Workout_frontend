import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getExercises } from "../store/actions/exerciseActions";
import { useDispatch } from "react-redux";
import IncrementPill from "./IncrementPill";
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
  const [maxGroup, setMaxGroup] = useState(0);

  const exerciseList = exercises.filter((ex) => ex._id === group.exerciseID);

  let muscleList = [];

  if (exerciseList.length > 0) {
    muscleList = muscles.filter((mus) =>
      exerciseList[0].muscles.includes(mus._id)
    );
  }

  useEffect(() => {
    if (selectedPlan) {
      setMaxGroup(selectedPlan.groups.length - 1);
    }
  }, []);

  const swapSets = (index1, index2) => {
    const tempGroup = JSON.parse(JSON.stringify(selectedPlan.groups[index1]));
    let initialGroups = [...selectedPlan.groups];

    initialGroups[index1] = selectedPlan.groups[index2];
    initialGroups[index2] = tempGroup;

    console.log(initialGroups);

    setSelectedPlan({ ...selectedPlan, groups: initialGroups });
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
            <View style={styles.header}>
              <View>
                {exerciseList.length > 0 && <Text>{exerciseList[0].name}</Text>}

                <Text>Muscles</Text>
                <FlatList
                  data={muscleList}
                  keyExtractor={(muscle) => muscle._id.toString()}
                  renderItem={({ item }) => {
                    return <Text>{item.name}</Text>;
                  }}
                  listKey={(item) => "Mu" + item._id.toString()}
                />
              </View>
              <View>
                {groupIndex === 0 ? (
                  <>
                    <Text style={styles.disabled}>Up</Text>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        swapSets(groupIndex, groupIndex - 1);
                      }}
                    >
                      <Text>Up</Text>
                    </TouchableOpacity>
                  </>
                )}
                {groupIndex === maxGroup ? (
                  <>
                    <Text style={styles.disabled}>Down</Text>
                  </>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => {
                        swapSets(groupIndex, groupIndex + 1);
                      }}
                    >
                      <Text>Down</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>

            <FlatList
              data={group.sets}
              keyExtractor={(set) => set._id.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.show}>
                  {item.type === "exercise" ? (
                    <>
                      <Text>Set {Math.floor((index + 1) / 2) + 1}</Text>
                      <View style={styles.dataHolder}>
                        <IncrementPill
                          text={String(item.reps) + " REPS"}
                          field="reps"
                          groupIndex={groupIndex}
                          index={index}
                          selectedPlan={selectedPlan}
                          setSelectedPlan={setSelectedPlan}
                        />

                        <IncrementPill
                          text={String(item.weight) + " LBS"}
                          field="weight"
                          groupIndex={groupIndex}
                          index={index}
                          selectedPlan={selectedPlan}
                          setSelectedPlan={setSelectedPlan}
                        />
                      </View>
                    </>
                  ) : (
                    <>
                      <Text>Rest</Text>
                      <IncrementPill
                        text={String(item.duration)}
                        field="duration"
                        groupIndex={groupIndex}
                        index={index}
                        selectedPlan={selectedPlan}
                        setSelectedPlan={setSelectedPlan}
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
  dataHolder: {
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  disabled: {
    color: "white",
  },
});

export default WorkoutGroup;
