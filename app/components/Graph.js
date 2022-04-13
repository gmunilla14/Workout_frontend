import React from "react";
import { View, StyleSheet, Text as NormalText } from "react-native";
import { Circle, G, Line, Path, Svg, Text } from "react-native-svg";
import { scaleTime, scaleLinear } from "d3-scale";
import { line } from "d3-shape";
import { useState } from "react";
import { useEffect } from "react";
import colors from "../utils/colors";

function Graph({ height, width, leftPadding, rightPadding, yPadding, data }) {
  const [circles, setCircles] = useState([]);
  const [yTicks, setyTicks] = useState([]);
  const [xTicks, setxTicks] = useState([]);
  const [curve, setCurve] = useState("");

  useEffect(() => {
    const { curvedLine, circles, yTicks, xTicks } = createGraph(data);
    setCurve(curvedLine);
    setCircles(circles);
    setyTicks(yTicks);
    setxTicks(xTicks);
  }, [data]);

  const createGraph = (data) => {
    if (data.length > 0) {
      const max = Math.max(...data.map((val) => val.y)) + 5;
      const min = Math.min(...data.map((val) => val.y)) - 5;

      const minTime = new Date(data[0].x);
      const maxTime = new Date(data[data.length - 1].x);

      const next = new Date(maxTime);
      next.setDate(next.getDate() + 1);

      const prev = new Date(minTime);
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

      let diff = Math.ceil(
        (nextDay.getTime() - prevDay.getTime()) / (1000 * 64 * 64 * 24)
      );

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

      return { curvedLine, circles, yTicks, xTicks };
    } else {
      return { curvedLine: "", circles: [], yTicks: [], xTicks: [] };
    }
  };

  const yAxisString = "translate(15, " + (height / 2 + 45) + ") rotate(-90)";
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <Svg width={width} height={height} stroke="#6231ff">
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

            <Text x={0} y={0} transform={yAxisString} stroke={colors.mainDark}>
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
                      y={height - 5}
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
        </Svg>
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
});

export default Graph;
