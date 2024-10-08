import React, { useContext, useEffect } from 'react';
import * as Yup from 'yup';
import jwtDecode from 'jwt-decode';

import Form from '../components/forms/Form';
import FormField from '../components/forms/FormField';
import FormFooter from '../components/forms/FormFooter';
import FormHeader from '../components/forms/FormHeader';
import SubmitButton from '../components/forms/SubmitButton';
import Screen from '../components/Screen';
import usersApi from '../api/users';
import ErrorMessage from '../components/forms/ErrorMessage';
import ActivityIndicator from '../components/ActivityIndicator';
import useAuth from '../hooks/useAuth';
import constants from '../config/constants';
import validationSchemaObject from '../config/validationSchemaObject';
import FormSubHeader from '../components/forms/FormSubHeader';
import useApi from '../hooks/useApi';
import useSignInWithGoogle from '../hooks/useSignInWithGoogle';
import AppText from '../components/AppText';
import { Platform, StyleSheet, View } from 'react-native';
import colors from '../config/colors';
import SignInWithGoogleButton from '../components/SignInWithGoogleButton';
import AuthContext from '../context/authContext';
import {
  AppleAuthenticationButton,
  AppleAuthenticationButtonType,
  AppleAuthenticationButtonStyle,
} from 'expo-apple-authentication';
import useSignInWithApple from '../hooks/useSignInWithApple';

const validationSchema = Yup.object().shape({
  email: validationSchemaObject.email,
  password: Yup.string().required().label('Password'),
});

function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const { signIn: signInWithGoogle, loading: googleSignInLoading } =
    useSignInWithGoogle();
  const { signIn: signInWithApple } = useSignInWithApple();
  const loginApi = useApi(usersApi.login);
  const googleSignInVerifyApi = useApi(usersApi.googleSignInVerify);
  const appleSignInVerifyApi = useApi(usersApi.appleSignInVerify);
  const { sessionExpired, setSessionExpired } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setSessionExpired(false);
    }, 5000);
  }, []);

  const handleLogin = (authToken) => {
    const { verified, id } = jwtDecode(authToken);

    if (verified) return login(authToken);
    navigation.navigate(constants.VERIFY_SCREEN, { userId: id });
  };

  const handleSubmit = async (credentials) => {
    const { ok, data } = await loginApi.request(credentials);

    if (!ok) return;

    const { authToken } = data;
    handleLogin(authToken);
  };

  const handleAppleSignIn = async () => {
    const credentials = await signInWithApple();

    if (!credentials) return;
    const { fullName, identityToken } = credentials;

    let appleUserFullName = fullName.givenName ? fullName.givenName : '';
    appleUserFullName += fullName.familyName ? fullName.familyName : '';

    const { ok, data } = await appleSignInVerifyApi.request({
      idToken: identityToken,
      appleUserFullName,
    });

    if (!ok) return;

    const { authToken } = data;
    handleLogin(authToken);
  };

  const handleGoogleSignIn = async () => {
    const userInfo = await signInWithGoogle();

    if (!userInfo) return;

    const { ok, data } = await googleSignInVerifyApi.request({
      idToken: userInfo.idToken,
    });

    if (!ok) return;

    const { authToken } = data;
    handleLogin(authToken);
  };

  return (
    <>
      <ActivityIndicator
        visible={
          loginApi.loading ||
          googleSignInVerifyApi.loading ||
          appleSignInVerifyApi.loading
        }
      />
      <Screen scrollable>
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
            error={
              loginApi.error ||
              googleSignInVerifyApi.loading ||
              appleSignInVerifyApi.error
            }
            visible={
              !!(
                loginApi.error ||
                googleSignInVerifyApi.loading ||
                appleSignInVerifyApi.error
              )
            }
          />
          <ErrorMessage
            error={constants.SESSION_EXPIRED_ERROR}
            visible={sessionExpired}
          />
          <FormSubHeader>
            Welcome! kindly enter your login details to continue.
          </FormSubHeader>
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
            onLinkPress={() =>
              navigation.navigate(constants.FORGOT_PASSWORD_SCREEN)
            }
          />
          <FormFooter
            message="Don't have an account?"
            linkText="Sign up"
            onLinkPress={() => navigation.navigate(constants.SIGNUP_SCREEN)}
          />
        </Form>
        <View style={styles.orSeparator}>
          <View style={styles.line} />
          <AppText style={styles.orText}>or</AppText>
          <View style={styles.line} />
        </View>
        {Platform.OS === 'ios' ? (
          <View style={styles.appleButtonContainer}>
            <AppleAuthenticationButton
              buttonType={AppleAuthenticationButtonType.CONTINUE}
              buttonStyle={AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={5}
              onPress={handleAppleSignIn}
              style={styles.appleButton}
            />
          </View>
        ) : null}
        <View style={styles.googleButtonContainer}>
          <SignInWithGoogleButton
            onPress={handleGoogleSignIn}
            loading={googleSignInLoading}
          />
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  orSeparator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: colors.lightGray,
  },
  orText: {
    paddingHorizontal: 10,
    color: colors.mediumGray,
  },
  googleButtonContainer: {
    alignItems: 'center',
  },
  appleButtonContainer: {
    marginBottom: 20,
  },
  appleButton: {
    width: '100%',
    height: 44,
  },
});

export default LoginScreen;
