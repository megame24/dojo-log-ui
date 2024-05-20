import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import constants from '../config/constants';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import VerifyScreen from '../screens/VerifyScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import useSkipTutorial from '../hooks/useSkipTutorial';
import ActivityIndicator from '../components/ActivityIndicator';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);
  const { skipTutorial, isReady: skipTutorialStateIsReady } = useSkipTutorial(
    constants.SKIP_ONBOARDING_SCREENS
  );

  useEffect(() => {
    if (skipTutorialStateIsReady) {
      if (skipTutorial) {
        setInitialRoute(constants.LOGIN_SCREEN);
      } else {
        setInitialRoute(constants.ONBOARDING_SCREEN);
      }
    }
  }, [skipTutorialStateIsReady]);
  return (
    <>
      {initialRoute ? (
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name={constants.ONBOARDING_SCREEN}
            component={OnboardingScreen}
          />
          <Stack.Screen
            name={constants.SIGNUP_SCREEN}
            component={SignupScreen}
          />
          <Stack.Screen name={constants.LOGIN_SCREEN} component={LoginScreen} />
          <Stack.Screen
            name={constants.VERIFY_SCREEN}
            component={VerifyScreen}
          />
          <Stack.Screen
            name={constants.FORGOT_PASSWORD_SCREEN}
            component={ForgotPasswordScreen}
          />
          <Stack.Screen
            name={constants.RESET_PASSWORD_SCREEN}
            component={ResetPasswordScreen}
          />
        </Stack.Navigator>
      ) : (
        <ActivityIndicator visible />
      )}
    </>
  );
}

export default AuthNavigator;
