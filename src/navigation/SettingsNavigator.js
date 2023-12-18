import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import constants from '../config/constants';
import SettingsScreen from '../screens/SettingsScreen';
import PasswordSettingsScreen from '../screens/PasswordSettingsScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';

const Stack = createNativeStackNavigator();

function SettingsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={constants.SETTINGS_SCREEN}
        component={SettingsScreen}
      />
      <Stack.Screen
        name={constants.ACCOUNT_SETTINGS_SCREEN}
        component={AccountSettingsScreen}
      />
      <Stack.Screen
        name={constants.PASSWORD_SETTINGS_SCREEN}
        component={PasswordSettingsScreen}
      />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;
