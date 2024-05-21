import React from 'react';
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
import useApi from '../hooks/useApi';

const validationSchema = Yup.object().shape({
  ...validationSchemaObject,
});

function SignupScreen({ navigation }) {
  const signupApi = useApi(usersApi.signup);

  const handleSubmit = async (user) => {
    const { ok, data } = await signupApi.request(user);

    if (!ok) return;

    const { userId } = data;
    navigation.navigate(constants.VERIFY_SCREEN, { userId });
  };

  return (
    <>
      <ActivityIndicator visible={signupApi.loading} />
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
          <ErrorMessage error={signupApi.error} visible={!!signupApi.error} />
          <FormSubHeader>
            Welcome! kindly enter your details to get started.
          </FormSubHeader>
          <FormField name="name" label="Full name" autoCorrect={false} />
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
