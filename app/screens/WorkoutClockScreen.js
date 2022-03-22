import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Button, FlatList } from "react-native";
import { getPlans } from "../routes/planRoutes";
import { Picker } from "@react-native-picker/picker";
import { createWorkout } from "../routes/workoutRoutes";
import { useDispatch, useSelector } from "react-redux";
import { findExercises } from "../store/actions/exerciseActions";
import { findMuscles } from "../store/actions/muscleActions";
function WorkoutClockScreen(props) {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [milliseconds, setMilliseconds] = useState("000");
  const [clockRunning, setClockRunning] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [maxSet, setMaxSet] = useState(0);
  const [maxGroup, setMaxGroup] = useState(0);

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(false);

  const [startBound, setStartBound] = useState(0);
  const [workout, setWorkout] = useState({});

  const dispatch = useDispatch();

  const exercises = useSelector((state) => state.exercises);
  const muscles = useSelector((state) => state.muscles);

  console.log(exercises);

  useEffect(async () => {
    const planList = await getPlans();
    setPlans(planList);
  }, []);

  useEffect(() => {
    if (clockRunning) {
      const now = new Date();

      setCurrentGroup(0);
      setCurrentSet(0);

      setStartBound(now.getTime());
      setWorkout({
        ...workout,
        planID: selectedPlan._id,
        uid: selectedPlan.creatorID,
        startTime: now.getTime(),
        groups: selectedPlan.groups,
      });

      setMaxGroup(selectedPlan.groups.length - 1);
      setMaxSet(selectedPlan.groups[0].sets.length - 1);
    }
  }, [clockRunning]);

  const onStartButton = () => {
    setClockRunning(true);
  };

  const onIntervalButton = () => {
    const now = new Date();

    let workoutGroups = workout.groups;
    let workoutSets = workoutGroups[currentGroup].sets;
    workoutSets[currentSet] = {
      ...workoutSets[currentSet],
      startTime: startBound,
      endTime: now.getTime(),
    };
    workoutGroups[currentGroup] = {
      ...workoutGroups[currentGroup],
      sets: workoutSets,
    };

    setWorkout({ ...workout, groups: workoutGroups });

    setStartBound(now.getTime());

    if (currentSet < maxSet) {
      setCurrentSet(currentSet + 1);
    } else {
      setCurrentSet(0);
      setMaxSet(workout.groups[currentGroup + 1].sets.length - 1);
      setCurrentGroup(currentGroup + 1);
    }

    console.log("Interval");
    console.log("----------------------------------------");
  };
  const onStopButton = () => {
    const now = new Date();
    const endTime = now.getTime();
    let workoutGroups = workout.groups;
    let workoutSets = workoutGroups[currentGroup].sets;
    workoutSets[currentSet] = {
      ...workoutSets[currentSet],
      startTime: startBound,
      endTime: now.getTime(),
    };
    workoutGroups[currentGroup] = {
      ...workoutGroups[currentGroup],
      sets: workoutSets,
    };

    setWorkout({ ...workout, groups: workoutGroups, endTime });

    setClockRunning(false);
    console.log(workout);
  };

  useEffect(() => {
    if (clockRunning) {
      const interval = setInterval(() => {
        const now = new Date();
        const time = now - startBound;
        const mins = Math.floor(time / 60000)
          .toString()
          .padStart(2, "0");
        const secs = (Math.floor(time / 1000) % 60).toString().padStart(2, "0");
        const ms = (time % 1000).toString().padStart(3, "0");

        setMilliseconds(ms);
        setSeconds(secs);
        setMinutes(mins);
      }, 1);

      return () => clearInterval(interval);
    }
  });

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedPlan}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedPlan(itemValue);
          console.log(itemValue);
          let maxGroups = 0;
          let maxSets = 0;
          let sets = [];
          itemValue.groups.forEach((group) => {
            maxGroups += 1;
            group.sets.forEach((set) => {
              maxSets += 1;
              sets.push(set);
            });
          });
          setMaxGroup(maxGroups);
          setMaxSet(maxSets);
        }}
      >
        {plans.map((plan) => {
          return <Picker.Item key={plan._id} label={plan.name} value={plan} />;
        })}
      </Picker>
      <Text>
        {minutes}:{seconds}.{milliseconds}
      </Text>
      {!clockRunning ? (
        <Button title="Start" onPress={onStartButton} />
      ) : (
        <>
          {(currentSet === maxSet) & (currentGroup === maxGroup) ? (
            <Button title="Stop" onPress={onStopButton} />
          ) : (
            <Button title="Interval" onPress={onIntervalButton} />
          )}
        </>
      )}
      {selectedPlan !== false && (
        <>
          {selectedPlan.groups.map((group) => {
            let elements = group.sets.map((set) => {
              return <Text>{set.type}</Text>;
            });
            return elements;
          })}
        </>
      )}
      <Button
        title="Workout"
        onPress={async () => {
          console.log(workout);
          let newWorkout = { ...workout };
          newWorkout.groups.forEach((group, index) => {
            delete newWorkout.groups[index]._id;
            group.sets.forEach((set, setIndex) => {
              delete newWorkout.groups[index].sets[setIndex]._id;
            });
          });
          delete newWorkout.uid;
          console.log(newWorkout);
          await createWorkout(newWorkout);
        }}
      />
      <Button
        title="Get Exercises"
        onPress={() => {
          dispatch(findExercises());
        }}
      />

      <FlatList
        data={exercises}
        keyExtractor={(exercise) => exercise._id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />

      <Button
        title="Get Muscles"
        onPress={() => {
          dispatch(findMuscles());
        }}
      />

      <FlatList
        data={muscles}
        keyExtractor={(muscle) => muscle._id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
});

export default WorkoutClockScreen;
