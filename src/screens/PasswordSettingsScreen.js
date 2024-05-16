import React, { useState } from 'react';
import * as Yup from 'yup';

import ActivityIndicator from '../components/ActivityIndicator';
import ErrorMessage from '../components/forms/ErrorMessage';
import Form from '../components/forms/Form';
import FormField from '../components/forms/FormField';
import FormHeader from '../components/forms/FormHeader';
import SubmitButton from '../components/forms/SubmitButton';
import Screen from '../components/Screen';
import {
  invalidPasswordMessage,
  validPasswordRegEx,
} from '../config/validationSchemaObject';
import constants from '../config/constants';
import useApi from '../hooks/useApi';
import usersApi from '../api/users';
import BackButton from '../components/BackButton';
import SuccessToast from '../components/SuccessToast';
import ScreenHeader from '../components/ScreenHeader';
import useAuth from '../hooks/useAuth';
import Separator from '../components/Separator';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required()
    .matches(validPasswordRegEx, invalidPasswordMessage)
    .label('Old password'),
  newPassword: Yup.string()
    .required()
    .matches(validPasswordRegEx, invalidPasswordMessage)
    .label('New password'),
  confirmNewPassword: Yup.string()
    .required()
    .matches(validPasswordRegEx, invalidPasswordMessage)
    .label('Confirm new password'),
});

function PasswordSettingsScreen({ navigation }) {
  const [toastVisible, setToastVisible] = useState(false);
  const changePasswordApi = useApi(usersApi.changePassword);
  const {
    user: { id },
  } = useAuth();

  const handleSubmit = async (formDetails) => {
    const { ok } = await changePasswordApi.request(formDetails, id);

    if (!ok) return;

    setToastVisible(true);
  };

  return (
    <>
      <ScreenHeader
        header={constants.PASSWORD_SETTINGS_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator visible={changePasswordApi.loading} />
      <Screen scrollable>
        <Form
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormHeader style={{ fontSize: 24 }}>Change password</FormHeader>
          <Separator />
          <ErrorMessage
            error={changePasswordApi.error}
            visible={!!changePasswordApi.error}
          />
          <FormField
            name="oldPassword"
            autoCapitalize="none"
            label="Old password"
            secureTextEntry
            textContentType="password"
            autoCorrect={false}
          />
          <FormField
            name="newPassword"
            autoCapitalize="none"
            label="New password"
            secureTextEntry
            textContentType="password"
            autoCorrect={false}
          />
          <FormField
            name="confirmNewPassword"
            autoCapitalize="none"
            label="Confirm new password"
            secureTextEntry
            textContentType="password"
            autoCorrect={false}
          />
          <SubmitButton title="Update password" />
        </Form>
        <SuccessToast
          message="Password updated successfully"
          visible={toastVisible}
          onClose={() => setToastVisible(false)}
        />
      </Screen>
    </>
  );
}

export default PasswordSettingsScreen;
