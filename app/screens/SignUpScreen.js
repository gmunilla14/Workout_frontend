import React, { useEffect } from "react";
import { Text, StyleSheet, View, ScrollView } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { signUp } from "../routes/authRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../utils/colors";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import Link from "../components/Link";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().min(4).max(32).trim().label("Username"),
  email: Yup.string().required().email().trim().label("Email"),
  password: Yup.string()
    .required()
    .min(6)
    .max(100)
    .trim()
    .matches(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$/,
      "Password must have at least one uppercase letter, one lowercase letter, and one number"
    )
    .label("Password"),
  passwordConfirm: Yup.string()
    .required("Must confirm password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

function SignUpScreen({ navigation }) {
  useEffect(async () => {
    const userToken = await AsyncStorage.getItem("token");
    if (userToken) {
      navigation.navigate("Activate");
    }
  });

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="never">
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        onSubmit={async (values) => {
          const user = {
            username: values.username,
            email: values.email,
            password: values.password,
          };
          //Sign Up User
          const response = await signUp(user);

          //If successful, add token to storage and navigate to App
          if (response.status === 200) {
            await AsyncStorage.setItem("token", response.data.token);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "App Nav",
                },
              ],
            });
          }
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, values }) => (
          <>
            <Text style={styles.title}>Sign Up</Text>

            <View style={styles.holder}>
              <View style={styles.inputHolder}>
                <AppTextInput
                  title="Username"
                  onChangeText={handleChange("username")}
                  error={errors.username}
                  value={values.username}
                />
              </View>

              <View style={styles.inputHolder}>
                <AppTextInput
                  title="Email"
                  onChangeText={handleChange("email")}
                  error={errors.email}
                  keyboardType="email-address"
                  value={values.email}
                />
              </View>

              <View style={styles.inputHolder}>
                <AppTextInput
                  title="Password"
                  onChangeText={handleChange("password")}
                  errors={errors.password}
                  secureTextEntry={true}
                  value={values.password}
                />
              </View>

              <View style={styles.inputHolder}>
                <AppTextInput
                  title="Confirm Password"
                  onChangeText={handleChange("passwordConfirm")}
                  error={errors.passwordConfirm}
                  secureTextEntry={true}
                  value={values.passwordConfirm}
                />
              </View>
            </View>
            <View style={styles.button}>
              <AppButton text="Sign Up" onPress={handleSubmit} size={18} />
            </View>
          </>
        )}
      </Formik>

      <Text style={styles.subtitle}>Already have an account? </Text>

      <View style={styles.link}>
        <Link
          text="Login"
          onPress={() => {
            navigation.navigate("Login");
          }}
          fontWeight="500"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 56,
    height: "100%",
    backgroundColor: colors.mainBG,
  },
  holder: {
    width: "80%",
    alignSelf: "center",
    marginTop: 24,
  },
  inputHolder: {
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.mainDark,
    textAlign: "center",
  },
  subtitle: {
    color: colors.subtitle,
    textAlign: "center",
  },
  button: {
    width: "40%",
    alignSelf: "center",
    marginVertical: 16,
  },
  link: {
    alignSelf: "center",
  },
});

export default SignUpScreen;
