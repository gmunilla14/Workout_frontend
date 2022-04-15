import React from "react";
import { View, StyleSheet, Text as NormalText } from "react-native";
import { Circle, G, Line, Path, Svg, Text } from "react-native-svg";
import { scaleTime, scaleLinear } from "d3-scale";
import { line } from "d3-shape";
import { useState } from "react";
import { useEffect } from "react";
import colors from "../utils/colors";

function Graph({
  height,
  width,
  leftPadding,
  rightPadding,
  yPadding,
  data,
  exerciseName,
}) {
  //Create state variables for graph
  const [circles, setCircles] = useState([]);
  const [yTicks, setyTicks] = useState([]);
  const [xTicks, setxTicks] = useState([]);
  const [curve, setCurve] = useState("");

  //When data changes, calculate and set the graph values
  useEffect(() => {
    const { curvedLine, circles, yTicks, xTicks } = createGraph(data);
    setCurve(curvedLine);
    setCircles(circles);
    setyTicks(yTicks);
    setxTicks(xTicks);
  }, [data]);

  const createGraph = (data) => {
    if (data.length > 0) {
      //Set range of y values
      const max = Math.max(...data.map((val) => val.y)) + 5;
      const min = Math.min(...data.map((val) => val.y)) - 5;

      //Get range of X values
      const minTime = new Date(data[0].x);
      const maxTime = new Date(data[data.length - 1].x);

      //Create day buffers on the x axis
      const next = new Date(maxTime);
      const prev = new Date(minTime);
      next.setDate(next.getDate() + 1);
      prev.setDate(prev.getDate() - 1);

      const nextDay = new Date(
        next.getFullYear(),
        next.getMonth(),
        next.getDate()
      );
      const prevDay = new Date(
        prev.getFullYear(),
        prev.getMonth(),
        prev.getDate()
      );

      //Set number of x ticks to number of days between first and last days
      let diff = Math.ceil(
        (nextDay.getTime() - prevDay.getTime()) / (1000 * 64 * 64 * 24)
      );

      //Cut the number of x ticks to below 10
      while (diff > 10) {
        diff /= 2;
      }

      //Create scales and line
      const xScale = scaleTime()
        .domain([prevDay, nextDay])
        .range([leftPadding, width - rightPadding]);
      const yScale = scaleLinear()
        .domain([min, max])
        .range([height - yPadding, yPadding]);
      const curvedLine = line()
        .x((d) => xScale(new Date(d.x)))
        .y((d) => yScale(d.y))(data);

      //Create Data points
      const circles = data.map((point) => {
        return { cx: xScale(new Date(point.x)), cy: yScale(point.y) };
      });

      //Create ticks for axes
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

      return { curvedLine, circles, yTicks, xTicks };
    } else {
      return { curvedLine: "", circles: [], yTicks: [], xTicks: [] };
    }
  };

  //Formatting for y axis label
  const yAxisString = "translate(15, " + (height / 2 + 45) + ") rotate(-90)";
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <View style={styles.background}>
          <Svg width={width} height={height} stroke="#6231ff">
            <Text
              x={width / 2}
              y={yPadding / 2 + 5}
              textAnchor="middle"
              stroke={colors.mainDark}
            >
              {exerciseName + " Performance Over Time"}
            </Text>
            <G y={0}>
              <Line
                x1={leftPadding}
                y1={height - yPadding}
                x2={width - rightPadding}
                y2={height - yPadding}
                stroke={colors.mainDark}
                strokeWidth="3"
              />
              <Line
                x1={leftPadding}
                y1={yPadding}
                x2={leftPadding}
                y2={height - yPadding}
                stroke={colors.mainDark}
                strokeWidth="3"
              />

              <Text
                x={0}
                y={0}
                transform={yAxisString}
                stroke={colors.mainDark}
              >
                Volume (Lbs/sec)
              </Text>

              <>
                <Path d={curve} strokeWidth={2} stroke={colors.accent} />
                {circles.map((circle) => {
                  return (
                    <Circle
                      cx={circle.cx}
                      cy={circle.cy}
                      fill={colors.accent}
                      r="2"
                      key={circle.cx + "circle" + Math.random()}
                    />
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
                        stroke={colors.mainDark}
                        strokeWidth="3"
                        key={tick.y + "tick" + Math.random()}
                      />
                      <Text
                        x={leftPadding - 6}
                        y={tick.y + 3}
                        fontSize="10"
                        textAnchor="end"
                        key={tick.y + "ytext" + Math.random()}
                        stroke={colors.mainDark}
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
                        stroke={colors.mainDark}
                        strokeWidth="3"
                        key={tick.x + "tick" + Math.random()}
                      />
                      <Text
                        x={tick.x}
                        y={height - 25}
                        fontSize="10"
                        textAnchor="middle"
                        key={tick.x + "text" + Math.random()}
                        stroke={colors.mainDark}
                      >
                        {tick.val.getMonth() + 1 + "/" + tick.val.getDate()}
                      </Text>
                    </>
                  );
                })}
              </>
            </G>
            <Text
              x={width / 2}
              y={height - 10}
              textAnchor="middle"
              stroke={colors.mainDark}
            >
              Date
            </Text>
          </Svg>
        </View>
      ) : (
        <View style={styles.noData}>
          <NormalText style={styles.text}>
            No workout data for that exercise
          </NormalText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  noData: {
    backgroundColor: colors.lightBG,
    height: 200,
    marginTop: 16,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: colors.mainDark,
  },
  background: {
    backgroundColor: colors.lightBG,
    borderRadius: 8,
  },
});

export default Graph;
