import React from "react";
import { View, StyleSheet, Button } from "react-native";
import axios from "axios";
import { url, setHeaders } from "../routes/utils";
import { Circle, G, Line, Path, Svg, Text } from "react-native-svg";
import { useState } from "react";
import { scaleTime, scaleLinear } from "d3-scale";
import { useEffect } from "react";
import { line } from "d3-shape";
import { curveBasis } from "d3-shape";
import { axisLeft } from "d3-axis";
import { ticks } from "d3";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getExercises } from "../store/actions/exerciseActions";

const height = 300;
const width = 325;

const leftPadding = 35;
const rightPadding = 25;
const yPadding = 20;

const createGraph = (data) => {
  const max = Math.max(...data.map((val) => val.y)) + 5;
  const min = Math.min(...data.map((val) => val.y)) - 5;

  const minTime = new Date(data[0].x);
  const maxTime = new Date(data[data.length - 1].x);

  const next = new Date(maxTime);
  next.setDate(next.getDate() + 1);

  const prev = new Date(minTime);
  prev.setDate(prev.getDate() - 1);

  const nextDay = new Date(next.getFullYear(), next.getMonth(), next.getDate());
  const prevDay = new Date(prev.getFullYear(), prev.getMonth(), prev.getDate());

  let diff = Math.ceil(
    (nextDay.getTime() - prevDay.getTime()) / (1000 * 64 * 64 * 24)
  );

  console.log(diff);
  while (diff > 10) {
    diff /= 2;
  }

  const xScale = scaleTime()
    .domain([prevDay, nextDay])
    .range([leftPadding, width - rightPadding]);
  const yScale = scaleLinear()
    .domain([min, max])
    .range([height - yPadding, yPadding]);
  const curvedLine = line()
    .x((d) => xScale(new Date(d.x)))
    .y((d) => yScale(d.y))(data);

  const circles = data.map((point) => {
    return { cx: xScale(new Date(point.x)), cy: yScale(point.y) };
  });

  let xTicks = [];
  let yTicks = [];
  const minTimeInt = prevDay.getTime();
  const maxTimeInt = nextDay.getTime();

  for (let i = 0; i < 10; i++) {
    const yVal = (min + ((max - min) / 9) * i).toFixed(1);
    yTicks.push({ y: yScale(yVal), val: yVal });
  }

  for (let i = 0; i <= diff; i++) {
    const xVal = minTimeInt + ((maxTimeInt - minTimeInt) / diff) * i;
    xTicks.push({ x: xScale(new Date(xVal)), val: new Date(xVal) });
  }

  return { max, min, curvedLine, circles, yTicks, xTicks };
};

function DataScreen(props) {
  const [data, setData] = useState([{ x: 0, y: 0 }]);
  const [curve, setCurve] = useState({});
  const [showCurve, setShowCurve] = useState(false);
  const [circles, setCircles] = useState([]);
  const [yTicks, setyTicks] = useState([]);
  const [xTicks, setxTicks] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState({});

  const exercises = useSelector((state) => state.exercises);

  const dispatch = useDispatch();

  useEffect(() => {
    const { max, min, curvedLine, circles, yTicks, xTicks } = createGraph(data);
    setCurve(curvedLine);
    setCircles(circles);
    setyTicks(yTicks);
    setxTicks(xTicks);
  }, [data]);

  useEffect(() => {
    dispatch(getExercises());
  }, []);
  return (
    <View style={styles.container}>
      <Button
        title="Get data"
        onPress={async () => {
          const response = await axios.get(
            `${url}/data?type=volpersec&exercise=${selectedExercise}`,
            await setHeaders()
          );
          setData(response.data.data);
          setShowCurve(true);
          console.log(selectedExercise);
        }}
      />

      <Picker
        selectedValue={selectedExercise}
        onValueChange={(itemValue) => {
          setSelectedExercise(itemValue);
        }}
      >
        {exercises.map((exercise) => {
          return (
            <Picker.Item
              key={exercise._id}
              label={exercise.name}
              value={exercise._id}
            />
          );
        })}
      </Picker>

      <Svg width={width} height={height} stroke="#6231ff">
        <G y={0}>
          <Line
            x1={leftPadding}
            y1={height - yPadding}
            x2={width - rightPadding}
            y2={height - yPadding}
            stroke={"blue"}
            strokeWidth="3"
          />
          <Line
            x1={leftPadding}
            y1={yPadding}
            x2={leftPadding}
            y2={height - yPadding}
            stroke={"blue"}
            strokeWidth="3"
          />

          {showCurve && (
            <>
              <Path d={curve} strokeWidth={2} stroke="red" />
              {circles.map((circle) => {
                return (
                  <>
                    <Circle
                      cx={circle.cx}
                      cy={circle.cy}
                      fill="blue"
                      r="2"
                      key={circle.cx}
                    />
                  </>
                );
              })}
              {yTicks.map((tick) => {
                return (
                  <>
                    <Line
                      x1={leftPadding - 5}
                      y1={tick.y}
                      x2={leftPadding + 5}
                      y2={tick.y}
                      stroke={"blue"}
                      strokeWidth="3"
                      key={tick.y}
                    />
                    <Text
                      x={leftPadding - 6}
                      y={tick.y + 3}
                      fontSize="10"
                      textAnchor="end"
                      key={tick.y + "t"}
                    >
                      {tick.val}
                    </Text>
                  </>
                );
              })}
              {xTicks.map((tick) => {
                return (
                  <>
                    <Line
                      x1={tick.x}
                      y1={height - yPadding - 5}
                      x2={tick.x}
                      y2={height - yPadding + 5}
                      stroke={"blue"}
                      strokeWidth="3"
                      key={tick.x}
                    />
                    <Text
                      x={tick.x}
                      y={height - 5}
                      fontSize="10"
                      textAnchor="middle"
                      key={tick.x + "x"}
                    >
                      {tick.val.getMonth() + 1 + "/" + tick.val.getDate()}
                    </Text>
                  </>
                );
              })}
            </>
          )}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 40,
  },
});

export default DataScreen;
