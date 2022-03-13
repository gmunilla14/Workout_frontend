import React from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { activate } from "../routes/authRoutes";

const validationSchema = Yup.object().shape({
  token: Yup.string().required().min(4).max(32).trim().label("Username"),
});

function ActivateScreen(props) {
  return (
    <View>
      <Formik
        initialValues={{ token: "" }}
        onSubmit={async (values) => {
          const response = await activate(values);
          if (response.status === 200) {
            console.log(response.data);
          } else {
            console.log(response.data);
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <>
            <TextInput
              placeholder="Token"
              name="token"
              onChangeText={handleChange("token")}
            />
            <Button title="Activate" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ActivateScreen;
