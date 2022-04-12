import { useFormikContext } from "formik";
import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import colors from "../utils/colors";

function AppTextInput({
  title,
  onChangeText,
  keyboardType = "default",
  error,
}) {
  return (
    <View style={styles.container}>
      <Text
        style={{ ...styles.inputTitle, color: error ? "red" : colors.subtitle }}
      >
        {title}
      </Text>
      <TextInput
        style={{ ...styles.textInput, borderWidth: error ? 2 : 0 }}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
      <Text style={{ color: "red" }}>{error}</Text>
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
    borderColor: "red",
  },
  inputTitle: {
    color: colors.subtitle,
    fontWeight: "500",
  },
});

export default AppTextInput;
