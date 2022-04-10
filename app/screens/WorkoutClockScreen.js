import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  DevSettings,
  ScrollView,
} from "react-native";
import { getPlans } from "../store/actions/planActions";
import { Picker } from "@react-native-picker/picker";
import { createWorkout } from "../store/actions/workoutActions";
import { useDispatch, useSelector } from "react-redux";
import { getExercises } from "../store/actions/exerciseActions";
import { getMuscles } from "../store/actions/muscleActions";
import WorkoutGroup from "../components/WorkoutGroup";
import Clock from "../components/Clock";
import Footer from "../components/Footer";
import Group from "../components/Group";
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
  const [timeString, setTimeString] = useState("00:00.000");
  const [inBetween, setInBetween] = useState(false);
  const [nextSet, setNextSet] = useState({
    type: "",
    duration: "",
    weight: "",
    reps: "",
  });
  const [startBound, setStartBound] = useState(0);
  const [workout, setWorkout] = useState({ groups: [] });

  const dispatch = useDispatch();

  const exercises = useSelector((state) => state.exercises);
  const muscles = useSelector((state) => state.muscles);
  const plans = useSelector((state) => state.plans);

  useEffect(() => {
    dispatch(getPlans());

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

    setClockRunning(true);

    setNextSet(sentPlan.groups[0].sets[1]);
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

  useEffect(() => {
    if (currentSet < maxSet) {
      setNextSet(workout.groups[currentGroup].sets[currentSet + 1]);
    } else if (currentGroup < maxGroup) {
      setNextSet(workout.groups[currentGroup + 1].sets[0]);
    }
  }, [currentSet]);

  const onIntervalButton = () => {
    const now = new Date();

    if (inBetween) {
      setStartBound(now.getTime());

      let workoutGroups = workout.groups;
      let workoutSets = workoutGroups[currentGroup].sets;
      workoutSets[currentSet] = {
        ...workoutSets[currentSet],
        startTime: now.getTime(),
      };
      workoutGroups[currentGroup] = {
        ...workoutGroups[currentGroup],
        sets: workoutSets,
      };

      setInBetween(false);
    } else {
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
        setInBetween(true);
      }
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

        setSeconds(secs);
        setMinutes(mins);
      }, 200);

      return () => clearInterval(interval);
    }
  });

  const getCurrentExercise = (exerciseID) => {
    const exerciseList = exercises.filter((ex) => ex._id === exerciseID);
    return exerciseList[0];
  };

  const onStop = () => {
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

    let newWorkout = { ...workout, groups: workoutGroups, endTime };

    setWorkout({ ...workout, groups: workoutGroups, endTime });

    newWorkout.groups.forEach((group, index) => {
      delete newWorkout.groups[index]._id;
      group.sets.forEach((set, setIndex) => {
        delete newWorkout.groups[index].sets[setIndex]._id;
      });
    });
    delete newWorkout.uid;
    dispatch(createWorkout(newWorkout));

    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {workout.groups.length > 0 && (
        <>
          <ScrollView>
            {!inBetween && (
              <Clock
                workout={workout}
                currentGroup={currentGroup}
                currentSet={currentSet}
                timeString={timeString}
                setWorkout={setWorkout}
                mins={minutes}
                secs={seconds}
              />
            )}

            {(workout.groups[currentGroup].sets[currentSet].type === "rest" ||
              inBetween) && (
              <>
                <View>
                  <FlatList
                    data={workout.groups}
                    keyExtractor={(group) => group._id.toString()}
                    renderItem={({ item, index }) => {
                      if (index < currentGroup) {
                        return <Text>Done</Text>;
                      } else {
                        return (
                          <Group
                            group={item}
                            exercises={exercises}
                            currentSet={currentSet}
                            currentGroup={currentGroup}
                            doingWorkout={true}
                            groupIndex={index}
                            selectedPlan={workout}
                            setSelectedPlan={setWorkout}
                          />
                        );
                      }
                    }}
                  />
                </View>
              </>
            )}
          </ScrollView>
          {!(currentSet === maxSet && currentGroup === maxGroup) ? (
            <>
              {inBetween ? (
                <Footer
                  buttonText={
                    "Start " +
                    getCurrentExercise(workout.groups[currentGroup].exerciseID)
                      .name
                  }
                  onButtonPress={onIntervalButton}
                />
              ) : (
                <>
                  {workout.groups[currentGroup].sets[currentSet].type ===
                  "exercise" ? (
                    <Footer
                      buttonText={
                        currentSet < maxSet
                          ? "Begin Rest"
                          : "Start Moving to Next Exercise"
                      }
                      topText={
                        currentSet < maxSet
                          ? nextSet.duration + " SECONDS"
                          : getCurrentExercise(
                              workout.groups[currentGroup + 1].exerciseID
                            ).name
                      }
                      onButtonPress={onIntervalButton}
                    />
                  ) : (
                    <Footer
                      buttonText="Start Next Set"
                      topText={
                        nextSet.reps + " REPS, " + nextSet.weight + " LBS"
                      }
                      onButtonPress={onIntervalButton}
                    />
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <Footer
                buttonText="Complete Workout"
                onButtonPress={() => {
                  onStop();
                }}
              />
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WorkoutClockScreen;
