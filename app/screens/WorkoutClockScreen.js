import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  DevSettings,
} from "react-native";
import { getPlans } from "../store/actions/planActions";
import { Picker } from "@react-native-picker/picker";
import { createWorkout } from "../store/actions/workoutActions";
import { useDispatch, useSelector } from "react-redux";
import { getExercises } from "../store/actions/exerciseActions";
import { getMuscles } from "../store/actions/muscleActions";
import WorkoutGroup from "../components/WorkoutGroup";
function WorkoutClockScreen({ route, navigation }) {
  const sentPlan = route.params;
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [milliseconds, setMilliseconds] = useState("000");
  const [clockRunning, setClockRunning] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [maxSet, setMaxSet] = useState(0);
  const [maxGroup, setMaxGroup] = useState(0);

  const [startBound, setStartBound] = useState(0);
  const [workout, setWorkout] = useState({});

  const dispatch = useDispatch();

  const exercises = useSelector((state) => state.exercises);
  const muscles = useSelector((state) => state.muscles);
  const plans = useSelector((state) => state.plans);

  useEffect(() => {
    let sets = [];
    sentPlan.groups.forEach((group) => {
      group.sets.forEach((set) => {
        sets.push(set);
      });
    });
    setMaxGroup(sentPlan.groups.length - 1);
    setMaxSet(sentPlan.groups[0].sets.length - 1);

    setWorkout({
      ...workout,
      planID: sentPlan._id,
      groups: sentPlan.groups,
    });
  }, []);

  useEffect(() => {
    dispatch(getPlans());
  }, []);

  useEffect(() => {
    if (clockRunning) {
      const now = new Date();

      setCurrentGroup(0);
      setCurrentSet(0);

      setStartBound(now.getTime());
      setWorkout({
        ...workout,

        startTime: now.getTime(),
      });
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

  const getCurrentExercise = (exerciseID) => {
    const exerciseList = exercises.filter((ex) => ex._id === exerciseID);
    return exerciseList[0];
  };

  const incrementWorkout = (field, value, groupIndex, index) => {
    let currentGroups = workout.groups;
    currentGroups[groupIndex].sets[index][field] =
      currentGroups[groupIndex].sets[index][field] + value;
    setWorkout({
      ...workout,
      groups: currentGroups,
    });
  };

  return (
    <View style={styles.container}>
      {!clockRunning ? (
        <Button title="Start" onPress={onStartButton} />
      ) : (
        <>
          {(currentSet === maxSet) & (currentGroup === maxGroup) ? (
            <Button title="Stop" onPress={onStopButton} />
          ) : (
            <Button title="Interval" onPress={onIntervalButton} />
          )}

          {workout.groups[currentGroup].sets[currentSet].type === "exercise" ? (
            <>
              <Text>Workout</Text>
              <View>
                <Text>
                  {minutes}:{seconds}.{milliseconds}
                </Text>
              </View>
              <Text>
                {
                  getCurrentExercise(workout.groups[currentGroup].exerciseID)
                    .name
                }
              </Text>
              <Text>
                {workout.groups[currentGroup].sets[currentSet].reps} Reps
              </Text>
              <Text>
                {workout.groups[currentGroup].sets[currentSet].weight} LBS
              </Text>
              <Text>Notes</Text>
              <Text>
                {
                  getCurrentExercise(workout.groups[currentGroup].exerciseID)
                    .notes
                }
              </Text>
            </>
          ) : (
            <>
              <Text>Workout</Text>
              <View>
                <Text>
                  {minutes}:{seconds}.{milliseconds}
                </Text>
              </View>
              <Text>Review Last Set</Text>
              <Text>
                {workout.groups[currentGroup].sets[currentSet - 1].reps} Reps
              </Text>
              <Button
                title="+"
                onPress={() => {
                  incrementWorkout("reps", 1, currentGroup, currentSet - 1);
                }}
              />
              <Button
                title="-"
                onPress={() => {
                  incrementWorkout("reps", -1, currentGroup, currentSet - 1);
                }}
              />
              <Text>
                {workout.groups[currentGroup].sets[currentSet - 1].weight} LBS
              </Text>

              <Button
                title="+"
                onPress={() => {
                  incrementWorkout("weight", 1, currentGroup, currentSet - 1);
                }}
              />
              <Button
                title="-"
                onPress={() => {
                  incrementWorkout("weight", -1, currentGroup, currentSet - 1);
                }}
              />
            </>
          )}
        </>
      )}
      <Button
        title="See Workout"
        onPress={() => {
          console.log(workout);
          console.log(maxGroup);
          console.log(maxSet);
        }}
      />
      <Button
        title="Workout"
        onPress={async () => {
          let newWorkout = { ...workout };
          newWorkout.groups.forEach((group, index) => {
            delete newWorkout.groups[index]._id;
            group.sets.forEach((set, setIndex) => {
              delete newWorkout.groups[index].sets[setIndex]._id;
            });
          });
          delete newWorkout.uid;
          dispatch(createWorkout(newWorkout));
          DevSettings.reload();
        }}
      />
      <FlatList
        data={workout.groups}
        keyExtractor={(group) => group._id.toString()}
        renderItem={({ item, index }) => {
          if (index < currentGroup) {
            return <Text>Done</Text>;
          } else {
            return (
              <WorkoutGroup
                group={item}
                exercises={exercises}
                doingWorkout={true}
                currentSet={currentSet}
              />
            );
          }
        }}
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
