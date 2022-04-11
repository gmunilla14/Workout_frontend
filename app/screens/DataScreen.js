import React from "react";
import { View, StyleSheet, Button } from "react-native";
import axios from "axios";
import { url, setHeaders } from "../routes/utils";
import { Circle, G, Line, Path, Svg, Text } from "react-native-svg";
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

function DataScreen(props) {
  const [data, setData] = useState([{ x: 0, y: 0 }]);
  const [showCurve, setShowCurve] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExercises());
  }, []);

  return (
    <View style={styles.container}>
      <AppButton
        text="Get data"
        onPress={async () => {
          const response = await axios.get(
            `${url}/data?type=volpersec&exercise=62465c7da6c7baaf6b58b514`,
            await setHeaders()
          );
          setData(response.data.data);
          setShowCurve(true);
        }}
      />

      {showCurve && (
        <Graph
          height={300}
          width={350}
          leftPadding={50}
          rightPadding={25}
          yPadding={20}
          data={data}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});

export default DataScreen;
