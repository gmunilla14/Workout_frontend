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

            <Button title="Log In" onPress={handleSubmit} />
            <Text>Dont have an account?</Text>
            <Button
              title="Sign up"
              onPress={() => {
                navigation.navigate("Sign Up");
              }}
            />
          </>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    height: 1000,
  },
  holder: {
    padding: 10,
    backgroundColor: "white",
    margin: 20,
  },
});

export default LoginScreen;
