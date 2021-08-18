import { Form, Formik } from "formik";
import React from "react";
import { Button } from "semantic-ui-react";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyInputText from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";

interface Props {
  setEditMode: (editMode: boolean) => void;
}

export default function ProfileEditFrom({ setEditMode }: Props) {
  const {
    profileStore: { profile, editProfile },
  } = useStore();
  return (
    <Formik
      initialValues={{ displayName: profile?.displayName, bio: profile?.bio }}
      enableReinitialize
      onSubmit={(values) => editProfile(values).then(() => setEditMode(false))}
      validationSchema={Yup.object({ displayName: Yup.string().required() })}
    >
      {({ isValid, dirty, isSubmitting }) => (
        <Form className="ui form" autoComplete="off">
          <MyInputText name="displayName" placeholder="DisplayName" />
          <MyTextArea name="bio" placeholder="Bio" rows={3} />
          <Button
            type="submit"
            content="Update profile"
            floated="right"
            positive
            disabled={!dirty || !isValid}
            loading={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
}
