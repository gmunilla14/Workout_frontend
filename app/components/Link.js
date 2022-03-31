import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

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
    color: "#3A5DAA",
    textDecorationLine: "underline",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Link;
