import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

function Dropdown({ selectedValue, setSelectedValue, exercises }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <Text selectedValue={selectedValue}>
          {selectedValue ? selectedValue.name : "Blank"}
        </Text>
        <View style={styles.dropDown}>
          <TouchableOpacity
            onPress={() => {
              setOpen(!open);
            }}
          >
            <Ionicons
              name={open ? "md-caret-up-sharp" : "md-caret-down-sharp"}
              size={18}
              color={colors.black}
              style={styles.downArrow}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {open && (
          <>
            {exercises.map((exercise) => {
              return (
                <TouchableOpacity onPress={() => setSelectedValue(exercise)}>
                  <Text key={exercise._id}>{exercise.name}</Text>
                </TouchableOpacity>
              );
            })}
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    backgroundColor: colors.lightBG,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropDown: {
    marginHorizontal: 8,
  },
});

export default Dropdown;
