import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import constants from '../config/constants';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

function RewardsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={constants.SETTINGS_SCREEN}
        component={SettingsScreen}
      />
    </Stack.Navigator>
  );
}

export default RewardsNavigator;
