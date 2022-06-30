import React, { useState } from 'react';
import * as Yup from 'yup';

import Form from '../components/forms/Form';
import FormField from '../components/forms/FormField';
import FormFooter from '../components/forms/FormFooter';
import FormHeader from '../components/forms/FormHeader';
import FormLogo from '../components/forms/FormLogo';
import SubmitButton from '../components/forms/SubmitButton';
import Screen from '../components/Screen';
import usersApi from '../api/users';
import ErrorMessage from '../components/forms/ErrorMessage';
import { StyleSheet } from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(2).max(255).label('Name'),
  email: Yup.string()
    .required()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email'
    )
    .label('Email'),
  username: Yup.string().required().min(2).max(255).label('Username '),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!”#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]).{8,}$/,
      'Your password must be greater than 8 characters and must contain at least one uppercase letter, one lowercase letter, one number, and a special character'
    )
    .label('Password'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .label('Confirm Password'),
});

function SignupScreen() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (user) => {
    setError('');
    setLoading(true);
    const { ok, data } = await usersApi.signup(user);
    setLoading(false);

    if (!ok) return setError(data?.message || 'An unexpected error occurred');

    const { authToken } = data;
    login(authToken);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen scrollable>
        <FormLogo />
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
          <ErrorMessage
            style={styles.errorMessage}
            error={error}
            visible={!!error}
          />
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
            onLinkPress={() => console.log('pressed')}
          />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    textAlign: 'center',
  },
});

export default SignupScreen;
