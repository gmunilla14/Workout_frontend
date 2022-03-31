import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

function AppButton({ text, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    marginVertical: 12,
    textAlign: "center",
    color: "white",
    fontSize: 18,
  },
});

export default AppButton;
