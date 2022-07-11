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
import useAuth from '../auth/useAuth';
import constants from '../config/constants';
import validationSchemaObject from '../config/validationSchemaObject';
import FormSubHeader from '../components/forms/FormSubHeader';

const validationSchema = Yup.object().shape({
  ...validationSchemaObject,
});

function SignupScreen({ navigation }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (user) => {
    setError('');
    setLoading(true);
    const { ok, data } = await usersApi.signup(user);
    setLoading(false);

    if (!ok) return setError(data?.message || constants.UNEXPECTED_ERROR);

    const { authToken } = data;
    login(authToken);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen scrollable>
        <Form
          initialValues={{
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormHeader>Sign up</FormHeader>
          <ErrorMessage error={error} visible={!!error} />
          <FormSubHeader>
            Welcome! kindly enter your details to get started.
          </FormSubHeader>
          <FormField name="name" label="Name" autoCorrect={false} />
          <FormField
            name="email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            label="Email"
            autoCorrect={false}
          />
          <FormField
            name="username"
            label="Username"
            autoCapitalize="none"
            autoCorrect={false}
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
          <SubmitButton title="Sign up" />
          <FormFooter
            message="Already have an account?"
            linkText="Login"
            onLinkPress={() => navigation.navigate(constants.LOGIN_SCREEN)}
          />
        </Form>
      </Screen>
    </>
  );
}

export default SignupScreen;
