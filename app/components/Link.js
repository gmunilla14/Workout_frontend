import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";

function Link({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: colors.accent,
    textDecorationLine: "underline",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Link;
