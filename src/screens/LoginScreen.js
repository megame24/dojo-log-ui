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
  email: Yup.string()
    .required()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email'
    )
    .label('Email'),
  password: Yup.string().required().label('Password'),
});

function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (credentials) => {
    setError('');
    setLoading(true);
    const { ok, data } = await usersApi.login(credentials);
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
            email: '',
            password: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormHeader>Login</FormHeader>
          <ErrorMessage
            style={styles.errorMessage}
            error={error}
            visible={!!error}
          />
          <FormField
            name="email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            label="Email"
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
          <SubmitButton title="Login" />
          <FormFooter
            linkText="Forgot password?"
            onLinkPress={() => console.log('pressed FP')}
          />
          <FormFooter
            message="Don't have an account?"
            linkText="Sign up"
            onLinkPress={() => navigation.navigate('signup')} // store in constants!!!!!
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

export default LoginScreen;
