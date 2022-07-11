import React, { useState } from 'react';
import * as Yup from 'yup';

import Form from '../components/forms/Form';
import FormField from '../components/forms/FormField';
import FormFooter from '../components/forms/FormFooter';
import FormHeader from '../components/forms/FormHeader';
import SubmitButton from '../components/forms/SubmitButton';
import Screen from '../components/Screen';
import usersApi from '../api/users';
import ErrorMessage from '../components/forms/ErrorMessage';
import ActivityIndicator from '../components/ActivityIndicator';
import constants from '../config/constants';
import validationSchemaObject from '../config/validationSchemaObject';
import FormSubHeader from '../components/forms/FormSubHeader';

const validationSchema = Yup.object().shape({
  email: validationSchemaObject.email,
});

function ForgotPasswordScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (email) => {
    setError('');
    setLoading(true);
    const { ok, data } = await usersApi.forgotPassword(email);
    setLoading(false);

    if (!ok) return setError(data?.message || constants.UNEXPECTED_ERROR);

    navigation.navigate(constants.RESET_PASSWORD_SCREEN);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen scrollable>
        <Form
          initialValues={{ email: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormHeader>Forgot password</FormHeader>
          <ErrorMessage error={error} visible={!!error} />
          <FormSubHeader>
            Kindly enter your email address to receive a reset password code.
          </FormSubHeader>
          <FormField
            name="email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            label="Email"
            autoCorrect={false}
          />
          <SubmitButton title="Send code" />
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

export default ForgotPasswordScreen;