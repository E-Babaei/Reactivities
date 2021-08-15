import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import MyInputText from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            content="Sign up to Activities"
            color="teal"
            textAlign="center"
          />
          <MyInputText name="displayName" placeholder="Display Name" />
          <MyInputText name="username" placeholder="Username" />
          <MyInputText name="email" placeholder="Email" />
          <MyInputText
            name="password"
            placeholder="Password"
            type="password"
            autoComplete="off"
          />
          <ValidationErrors errors={errors.error} />
          <Button
            disabled={!dirty || !isValid || isSubmitting}
            loading={isSubmitting}
            type="submit"
            fluid
            content="Register"
            positive
          />
        </Form>
      )}
    </Formik>
  );
});
