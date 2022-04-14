import React from "react";
import { View, StyleSheet, Text } from "react-native";
import axios from "axios";
import { url, setHeaders } from "../routes/utils";
import { useState } from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { useEffect } from "react";
import { line } from "d3-shape";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getExercises } from "../store/actions/exerciseActions";
import AppButton from "../components/AppButton";
import Graph from "../components/Graph";
import colors from "../utils/colors";
import Dropdown from "../components/Dropdown";

function DataScreen(props) {
  const [data, setData] = useState([{ x: 0, y: 0 }]);
  const [showCurve, setShowCurve] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(false);
  const dispatch = useDispatch();

  const exercises = useSelector((state) => state.exercises);

  useEffect(() => {
    dispatch(getExercises());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Performance Data</Text>
      <Text style={styles.subtitle}>
        Pick an exercise and see how your performance has changed over time
      </Text>
      <View style={styles.holder}>
        <View>
          <Text style={styles.dropdownHeader}>Exercise:</Text>
          <Dropdown
            selectedValue={selectedExercise}
            setSelectedValue={setSelectedExercise}
            values={exercises}
            placeholder="-- Exercise --"
          />
        </View>

        <View style={styles.dataButton}>
          <AppButton
            text="View Performance"
            onPress={async () => {
              const response = await axios.get(
                `${url}/data?type=volpersec&exercise=${selectedExercise._id}`,
                await setHeaders()
              );
              console.log(response.data);
              console.log(selectedExercise);
              setData(response.data.data);
              setShowCurve(true);
            }}
            size={16}
          />
        </View>
      </View>
      <View style={{ zIndex: -1 }}>
        {showCurve && (
          <Graph
            height={320}
            width={365}
            leftPadding={55}
            rightPadding={35}
            yPadding={40}
            data={data}
            exerciseName={selectedExercise.name}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 10,
    backgroundColor: colors.mainBG,
    height: "100%",
  },
  title: {
    color: colors.mainDark,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    color: colors.subtitle,
    fontSize: 15,
    marginBottom: 20,
    textAlign: "center",
    width: "95%",
    alignSelf: "center",
  },
  holder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    alignSelf: "center",
  },
  dropdownHeader: {
    color: colors.subtitle,
    fontWeight: "500",
    marginBottom: 4,
  },
  dataButton: {
    width: 150,
    marginLeft: 8,
  },
});

export default DataScreen;
