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
import { signUp } from "../routes/authRoutes";

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
function SignUpScreen(props) {
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
          const data = await signUp(user);
          console.log(data);
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors }) => (
          <>
            <View style={styles.holder}>
              <TextInput
                placeholder="Username"
                name="username"
                onChangeText={handleChange("username")}
              />
              <Text>{errors.username}</Text>
            </View>
            <View style={styles.holder}>
              <TextInput
                placeholder="Email"
                name="email"
                onChangeText={handleChange("email")}
              />
              <Text>{errors.email}</Text>
            </View>

            <View style={styles.holder}>
              <TextInput
                placeholder="Password"
                name="password"
                onChangeText={handleChange("password")}
              />
              <Text>{errors.password}</Text>
            </View>

            <View style={styles.holder}>
              <TextInput
                placeholder="Confirm Password"
                name="passwordConfirm"
                onChangeText={handleChange("passwordConfirm")}
              />
              <Text>{errors.passwordConfirm}</Text>
            </View>

            <Button title="Log In" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    marginTop: 50,
    height: 1000,
  },
  holder: {
    padding: 10,
    backgroundColor: "blue",
    margin: 20,
  },
});

export default SignUpScreen;
