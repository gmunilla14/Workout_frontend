import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../utils/colors";

function Notes({ notes }) {
  return (
    <View style={styles.notesHolder}>
      <View style={styles.notesBar}></View>
      <View style={styles.notesContent}>
        <Text style={styles.notesHeader}>NOTES</Text>
        <Text style={styles.notes}>{notes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notesHolder: {
    width: "80%",
    flexDirection: "row",
    paddingVertical: 16,
    backgroundColor: colors.lightBG,
  },
  notesBar: {
    marginHorizontal: 12,
    height: "100%",
    width: 7,
    backgroundColor: colors.secondaryAccent,
    borderRadius: 4,
  },
  notesHeader: {
    fontSize: 18,
    fontWeight: "700",
  },
  notesContent: {
    width: "80%",
  },
});

export default Notes;
