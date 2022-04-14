import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../utils/colors";
import Link from "./Link";
import { useState } from "react";

function Header({ title, back, navigation }) {
  const [popup, setPopup] = useState(false);
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
            <Entypo name="arrow-long-left" size={24} color={colors.mainDark} />
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
              <SimpleLineIcons name="graph" size={24} color={colors.mainDark} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.backButton, left: 56 }}
              onPress={() => {
                navigation.navigate("Workout History");
              }}
            >
              <FontAwesome name="history" size={24} color={colors.mainDark} />
            </TouchableOpacity>
          </>
        )}
        <Text style={styles.headerTitle}>{title}</Text>
        <TouchableOpacity
          style={{ ...styles.backButton, right: 0 }}
          onPress={() => {
            setPopup(!popup);
          }}
        >
          <Octicons name="gear" size={24} color={colors.mainDark} />
        </TouchableOpacity>
        {popup && (
          <View style={styles.signOutPopup}>
            <View style={styles.popupTop}></View>
            <Link
              text="Sign Out"
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
            />
          </View>
        )}
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
  signOutPopup: {
    position: "absolute",
    backgroundColor: colors.lightBG,
    height: 60,
    width: 100,
    right: 0,
    top: 60,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  popupTop: {
    backgroundColor: colors.lightBG,
    height: 20,
    width: 20,
    position: "absolute",
    right: 14,
    top: -10,
    transform: [{ rotate: "45deg" }],
  },
});

export default Header;
