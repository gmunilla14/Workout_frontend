import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";

function Link({ text, onPress, fontWeight = "700", fontSize = 18 }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{ ...styles.text, fontWeight, fontSize }}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: colors.accent,
    textDecorationLine: "underline",
  },
});

export default Link;
