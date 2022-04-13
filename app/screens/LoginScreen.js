import React from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Button,
  ScrollView,
} from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { signIn } from "../routes/authRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../utils/colors";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().trim().label("Email"),
  password: Yup.string().required().min(6).max(100).trim().label("Password"),
});

function LoginScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="never">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          const user = {
            email: values.email,
            password: values.password,
          };
          const response = await signIn(user);
          console.log(response.status);
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
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <Text style={styles.title}>Log In</Text>
            <View style={styles.holder}>
              <AppTextInput
                title="Email"
                onChangeText={handleChange("email")}
                error={errors.email}
              />

              <AppTextInput
                title="Password"
                onChangeText={handleChange("password")}
                error={errors.password}
              />
            </View>

            <View style={styles.button}>
              <AppButton text="Log In" onPress={handleSubmit} size={18} />
            </View>
            <Text style={styles.subtitle}>Dont have an account?</Text>

            <View style={styles.button}>
              <AppButton
                text="Sign up"
                onPress={() => {
                  navigation.navigate("Sign Up");
                }}
                size={18}
              />
            </View>
          </>
        )}
      </Formik>
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
});

export default LoginScreen;
