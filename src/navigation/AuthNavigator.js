import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import constants from '../config/constants';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import VerifyScreen from '../screens/VerifyScreen';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={constants.LOGIN_SCREEN}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={constants.SIGNUP_SCREEN} component={SignupScreen} />
      <Stack.Screen name={constants.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={constants.VERIFY_SCREEN} component={VerifyScreen} />
      <Stack.Screen
        name={constants.FORGOT_PASSWORD_SCREEN}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={constants.RESET_PASSWORD_SCREEN}
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
