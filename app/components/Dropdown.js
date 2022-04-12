import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../utils/colors";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

function Dropdown({ selectedValue, setSelectedValue, values }) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <View style={styles.container}>
        <Text selectedValue={selectedValue} style={styles.valueName}>
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
      <View
        style={{
          ...styles.dropDownItems,
          marginTop: open ? 4 : 0,
          marginLeft: open ? 8 : 0,
          padding: open ? 12 : 0,
        }}
      >
        {open && (
          <View>
            {values.map((value) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedValue(value);
                    setOpen(!open);
                  }}
                  style={styles.dropDownItem}
                >
                  <Text key={value._id} style={styles.valueName}>
                    {value.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBG,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 32,
    alignItems: "center",
    borderRadius: 4,
    paddingLeft: 8,
  },
  dropDown: {
    marginHorizontal: 8,
  },
  dropDownItems: {
    backgroundColor: colors.lightBG,
    borderRadius: 4,
  },
  dropDownItem: {
    marginVertical: 1,
  },
  valueName: {
    fontWeight: "500",
  },
});

export default Dropdown;
