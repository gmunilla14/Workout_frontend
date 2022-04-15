import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, ScrollView } from "react-native";
import { createWorkout } from "../store/actions/workoutActions";
import { useDispatch, useSelector } from "react-redux";
import Clock from "../components/Clock";
import Footer from "../components/Footer";
import Group from "../components/Group";
import colors from "../utils/colors";

function WorkoutClockScreen({ route, navigation }) {
  const sentPlan = route.params;

  //State for clock
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [clockRunning, setClockRunning] = useState(false);

  //State for tracking state in workout
  const [currentSet, setCurrentSet] = useState(0);
  const [maxSet, setMaxSet] = useState(0);
  const [currentGroup, setCurrentGroup] = useState(0);
  const [maxGroup, setMaxGroup] = useState(0);
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

  useEffect(() => {
    //On load, initialize groups and sets
    setCurrentGroup(0);
    setCurrentSet(0);
    setMaxGroup(sentPlan.groups.length - 1);
    setMaxSet(sentPlan.groups[0].sets.length - 1);

    const now = new Date();

    //Initialize workout and clock start bound
    setWorkout({
      ...workout,
      planID: sentPlan._id,
      groups: sentPlan.groups,
      startTime: now.getTime(),
    });

    setStartBound(now.getTime());

    //Turn on clock and set the next set
    setClockRunning(true);
    setNextSet(sentPlan.groups[0].sets[1]);
  }, []);

  //Run Clock
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

  //Set next set each time the set changes
  useEffect(() => {
    if (currentSet < maxSet) {
      setNextSet(workout.groups[currentGroup].sets[currentSet + 1]);
    } else if (currentGroup < maxGroup) {
      setNextSet(workout.groups[currentGroup + 1].sets[0]);
    }
  }, [currentSet]);

  const onIntervalButton = () => {
    const now = new Date();
    let workoutGroups = workout.groups;
    let workoutSets = workoutGroups[currentGroup].sets;

    //If user is currently in between groups
    if (inBetween) {
      //Start new exercise and save to workout
      workoutSets[currentSet] = {
        ...workoutSets[currentSet],
        startTime: now.getTime(),
      };

      setInBetween(false);
    } else {
      //End previous exercise and save to workout
      workoutSets[currentSet] = {
        ...workoutSets[currentSet],
        startTime: startBound,
        endTime: now.getTime(),
      };

      //If not the last set in group continue, if it is then switch to the
      //next group and set the status to in between
      if (currentSet < maxSet) {
        setCurrentSet(currentSet + 1);
      } else {
        setCurrentSet(0);
        setMaxSet(workout.groups[currentGroup + 1].sets.length - 1);
        setCurrentGroup(currentGroup + 1);
        setInBetween(true);
      }
    }

    setStartBound(now.getTime());

    workoutGroups[currentGroup] = {
      ...workoutGroups[currentGroup],
      sets: workoutSets,
    };

    setWorkout({ ...workout, groups: workoutGroups });
  };

  //Get exercise object from exercise ID
  const getCurrentExercise = (exerciseID) => {
    const exerciseList = exercises.filter((ex) => ex._id === exerciseID);
    return exerciseList[0];
  };

  //When workout is stopped
  const onStop = () => {
    setClockRunning(false);
    const now = new Date();
    const endTime = now.getTime();
    let workoutGroups = workout.groups;

    //If set was stopped in the middle by deletion, end that set
    if (!inBetween) {
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
    }

    let newWorkout = { ...workout, groups: workoutGroups, endTime };

    setWorkout({ ...workout, groups: workoutGroups, endTime });

    //Delete undesired attributes from workout
    newWorkout.groups.forEach((group, index) => {
      delete newWorkout.groups[index]._id;

      //Remove any undone partial groups
      if (group.sets.length === 1 && !group.sets[0].startTime) {
        newWorkout.groups.splice(index, 1);
        return;
      }

      //Clear any partial sets and undesired attributes
      group.sets.forEach((set, setIndex) => {
        delete newWorkout.groups[index].sets[setIndex]._id;
        if (set.type === "exercise" && !set.startTime) {
          newWorkout.groups[index].sets.splice(setIndex - 1, 2);
        }
      });
    });
    delete newWorkout.uid;
    dispatch(createWorkout(newWorkout));

    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      {workout.groups.length > 0 &&
        clockRunning &&
        workout.groups[currentGroup] && (
          <>
            <ScrollView>
              {!inBetween && (
                <Clock
                  workout={workout}
                  currentGroup={currentGroup}
                  currentSet={currentSet}
                  setWorkout={setWorkout}
                  mins={minutes}
                  secs={seconds}
                />
              )}

              {(workout.groups[currentGroup].sets[currentSet].type === "rest" ||
                inBetween) && (
                <>
                  <Text style={styles.title}>Up Next</Text>
                  <View style={styles.groupsHolder}>
                    <FlatList
                      data={workout.groups}
                      keyExtractor={(group) => group._id.toString()}
                      renderItem={({ item, index }) => {
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
                            inBetween={inBetween}
                            setCurrentSet={setCurrentSet}
                            setCurrentGroup={setCurrentGroup}
                            setInBetween={setInBetween}
                            setMaxSet={setMaxSet}
                            onStop={onStop}
                          />
                        );
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
                      getCurrentExercise(
                        workout.groups[currentGroup].exerciseID
                      ).name
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
                        size={currentSet < maxSet ? 24 : 18}
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
    backgroundColor: colors.mainBG,
  },
  groupsHolder: {
    width: "90%",
    alignSelf: "center",
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 24,
  },
});

export default WorkoutClockScreen;
