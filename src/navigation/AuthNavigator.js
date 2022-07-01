import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signup" component={SignupScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
