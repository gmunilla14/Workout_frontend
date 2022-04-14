import { useFormikContext } from "formik";
import React from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import colors from "../utils/colors";

function AppTextInput({
  title,
  onChangeText,
  keyboardType = "default",
  error,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
  value,
}) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.inputTitle,
          color: error ? colors.error : colors.subtitle,
        }}
      >
        {title}
      </Text>
      <TextInput
        style={{
          ...styles.textInput,
          borderWidth: error ? 2 : 0,
          height: numberOfLines * 32,
        }}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        numberOfLines={numberOfLines}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        value={!value ? "" : String(value)}
      />
      <Text style={{ color: colors.error }}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  textInput: {
    backgroundColor: colors.lightBG,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginTop: 4,
    borderColor: colors.error,
    height: 32,
  },
  inputTitle: {
    color: colors.subtitle,
    fontWeight: "500",
  },
});

export default AppTextInput;
