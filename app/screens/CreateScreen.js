import React from "react";
import { View, StyleSheet, Button } from "react-native";

function CreateScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Exercise"
        onPress={() => {
          navigation.navigate("Create Exercise");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CreateScreen;
