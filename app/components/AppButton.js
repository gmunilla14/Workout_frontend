import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
function AppButton({ text, onPress, size = 24, secondary = false }) {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: secondary ? colors.mainBG : colors.accent,
        borderWidth: secondary ? 2 : 0,
        borderColor: colors.accent,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          ...styles.buttonText,
          fontSize: size,
          color: secondary ? colors.accent : colors.lightBG,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accent,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    marginVertical: 12,
    textAlign: "center",
    color: colors.lightBG,
  },
});

export default AppButton;
