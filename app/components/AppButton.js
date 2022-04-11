import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

function AppButton({ text, onPress, size = 24, secondary = false }) {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: secondary ? "#EFF3F8" : "blue",
        borderWidth: secondary ? 2 : 0,
        borderColor: "blue",
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...styles.buttonText,
          fontSize: size,
          color: secondary ? "blue" : "white",
        }}
      >
        {text}
      </Text>
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
  },
});

export default AppButton;
