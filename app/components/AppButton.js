import React from "react";
import { View, StyleSheet, Text } from "react-native";

function AppButton(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.buttonText}>+ Add Another Set</Text>
    </View>
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
