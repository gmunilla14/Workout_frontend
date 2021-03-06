import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import colors from "../utils/colors";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

function Dropdown({
  selectedValue,
  setSelectedValue,
  values,
  placeholder,
  error,
  setError = () => {},
  automaticallyClose = true,
}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{ ...styles.headerContainer, borderWidth: error ? 2 : 0 }}>
        <Text selectedValue={selectedValue} style={styles.valueName}>
          {selectedValue ? selectedValue.name : placeholder}
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
              color={colors.mainDark}
              style={styles.downArrow}
            />
          </TouchableOpacity>
        </View>
      </View>
      {error && <Text style={{ color: colors.error }}>{error}</Text>}

      <View
        style={{
          ...styles.dropDownItems,
          marginTop: open ? 4 : 0,
          marginLeft: open ? 8 : 0,
          padding: open ? 12 : 0,
          borderWidth: open ? 1 : 0,
        }}
      >
        {open && (
          <View>
            <FlatList
              data={values}
              keyExtractor={(value) => value._id.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedValue(item);
                      if (automaticallyClose) setOpen(!open);
                      setError(false);
                    }}
                    style={styles.dropDownItem}
                  >
                    <Text style={styles.valueName}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={() => {
                return <View style={styles.line}></View>;
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  headerContainer: {
    backgroundColor: colors.lightBG,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 32,
    alignItems: "center",
    borderRadius: 4,
    paddingLeft: 8,
    minWidth: 120,
    borderColor: colors.error,
  },
  dropDown: {
    marginHorizontal: 8,
    position: "relative",
  },
  dropDownItems: {
    position: "absolute",
    backgroundColor: colors.lightBG,
    borderRadius: 4,
    top: 32,
    left: 8,
    maxHeight: 150,
    zIndex: 100,
  },
  dropDownItem: {
    marginVertical: 1,
  },
  valueName: {
    fontWeight: "500",
    color: colors.mainDark,
  },
  line: {
    height: 1,
    backgroundColor: colors.mainDark,
  },
});

export default Dropdown;
