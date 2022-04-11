import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../utils/colors";

function Header({ title, back, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.contentHolder}>
        {back && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ ...styles.backButton, left: 0 }}
          >
            <Entypo name="arrow-long-left" size={24} />
          </TouchableOpacity>
        )}
        {title === "Home" && (
          <>
            <TouchableOpacity
              style={{ ...styles.backButton, left: 0 }}
              onPress={() => {
                navigation.navigate("Data");
              }}
            >
              <SimpleLineIcons name="graph" size={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.backButton, left: 56 }}
              onPress={() => {
                navigation.navigate("Workout History");
              }}
            >
              <FontAwesome name="history" size={24} />
            </TouchableOpacity>
          </>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity
          style={{ ...styles.backButton, right: 0 }}
          onPress={async () => {
            await AsyncStorage.removeItem("token");
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "Auth Nav",
                },
              ],
            });
          }}
        >
          <Octicons name="gear" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: colors.mainBG,
  },
  contentHolder: {
    flexDirection: "row",
    marginTop: 24,
    height: 48,
    marginHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backButton: {
    borderRadius: 24,
    height: 48,
    width: 48,
    backgroundColor: colors.lightBG,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: colors.mainDark,
  },
});

export default Header;
