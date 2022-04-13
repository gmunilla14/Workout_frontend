import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../utils/colors";
import AppButton from "./AppButton";
import Link from "./Link";
function Footer({ buttonText, topText, linkText, onButtonPress, size = 24 }) {
  return (
    <View style={styles.container}>
      <Text style={styles.topText}>{topText}</Text>
      <View style={styles.buttonHolder}>
        <AppButton text={buttonText} onPress={onButtonPress} size={size} />
      </View>
      <Link text={linkText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: colors.lightBG,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonHolder: {
    width: "80%",
    marginVertical: 8,
  },
  topText: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: "700",
  },
});

export default Footer;
