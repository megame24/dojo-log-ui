import React from 'react';
import * as Yup from 'yup';

import ActivityIndicator from '../components/ActivityIndicator';
import ErrorMessage from '../components/forms/ErrorMessage';
import Form from '../components/forms/Form';
import FormField from '../components/forms/FormField';
import FormFooter from '../components/forms/FormFooter';
import FormHeader from '../components/forms/FormHeader';
import FormSubHeader from '../components/forms/FormSubHeader';
import SubmitButton from '../components/forms/SubmitButton';
import Screen from '../components/Screen';
import validationSchemaObject from '../config/validationSchemaObject';
import constants from '../config/constants';
import useApi from '../hooks/useApi';
import usersApi from '../api/users';
import BackButton from '../components/BackButton';

const validationSchema = Yup.object().shape({
  code: Yup.string().required().length(4).label('Reset password code'),
  password: validationSchemaObject.password,
  confirmPassword: validationSchemaObject.confirmPassword,
});

function ResetPasswordScreen({ route, navigation }) {
  const resetPasswordApi = useApi(usersApi.resetPassword);

  const { userId } = route.params;

  const handleSubmit = async (formDetails) => {
    const { ok } = await resetPasswordApi.request(formDetails, userId);

    if (!ok) return;

    navigation.navigate(constants.LOGIN_SCREEN);
  };

  return (
    <>
      <ActivityIndicator visible={resetPasswordApi.loading} />
      <Screen scrollable>
        <BackButton onPress={() => navigation.goBack()} />
        <Form
          initialValues={{ code: '', password: '', confirmPassword: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormHeader>Reset password</FormHeader>
          <ErrorMessage
            error={resetPasswordApi.error}
            visible={!!resetPasswordApi.error}
          />
          <FormSubHeader>
            Kindly enter the reset password code sent to you, and your new
            password.
          </FormSubHeader>
          <FormField
            name="code"
            label="Reset password code"
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            maxLength={4}
          />
          <FormField
            name="password"
            autoCapitalize="none"
            label="Password"
            secureTextEntry
            textContentType="password"
            autoCorrect={false}
          />
          <FormField
            name="confirmPassword"
            autoCapitalize="none"
            label="Confirm password"
            secureTextEntry
            textContentType="password"
            autoCorrect={false}
          />
          <SubmitButton title="Resent password" />
          <FormFooter
            message="Remember password?"
            linkText="Login"
            onLinkPress={() => navigation.navigate(constants.LOGIN_SCREEN)}
          />
        </Form>
      </Screen>
    </>
  );
}

export default ResetPasswordScreen;
