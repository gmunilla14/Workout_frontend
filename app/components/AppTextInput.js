import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import colors from "../utils/colors";

function AppTextInput({ title, onChangeText, keyboardType = "default" }) {
  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>{title}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  textInput: {
    backgroundColor: colors.lightBG,
    height: 32,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  inputTitle: {
    color: colors.subtitle,
    fontWeight: "500",
  },
});

export default AppTextInput;
