import React from "react";
import { View, StyleSheet, TextInput, Button, Text } from "react-native";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { activate } from "../routes/authRoutes";
import colors from "../utils/colors";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import axios from "axios";
import { setHeaders, url } from "../routes/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import Link from "../components/Link";
const validationSchema = Yup.object().shape({
  token: Yup.string().required().min(4).max(32).trim().label("Username"),
});

function ActivateScreen({ navigation }) {
  const [token, setToken] = useState("");
  return (
    <View>
      <Formik
        initialValues={{ token: "" }}
        onSubmit={async (values) => {
          const response = await activate(values);
          if (response.status === 200) {
            console.log(response.data);
            await AsyncStorage.setItem("token", response.data.token);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "Home",
                },
              ],
            });
          } else {
            console.log(response.data);
          }
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View style={styles.inputHolder}>
            <Text style={styles.title}>
              Check your email for the activation token
            </Text>

            <AppTextInput
              title="Token"
              onChangeText={handleChange("token")}
              value={values.token}
              error={errors.token}
            />
            <AppButton text="Activate" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
      <View style={styles.tokenHolder}>
        <Text style={styles.subtitle}>Dont see the activation token?</Text>
        <Link
          text="Get Activation Token"
          onPress={async () => {
            try {
              const response = await axios.get(
                `${url}/token`,
                await setHeaders()
              );
              setToken(response.data.token);
            } catch (err) {
              console.log(err);
            }
          }}
        />
        {token !== "" && (
          <View style={styles.token}>
            <Text>{token}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainBG,
  },
  title: {
    textAlign: "center",
    color: colors.mainDark,
    fontSize: 18,
    fontWeight: "500",
    marginTop: 24,
    marginBottom: 24,
  },
  subtitle: {
    color: colors.subtitle,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 48,
  },
  inputHolder: {
    width: "80%",
    alignSelf: "center",
  },
  tokenHolder: {
    alignSelf: "center",
    alignItems: "center",
  },
  token: {
    backgroundColor: colors.lightBG,
    justifyContent: "center",
    padding: 8,
    borderRadius: 4,
    marginTop: 12,
  },
});

export default ActivateScreen;
