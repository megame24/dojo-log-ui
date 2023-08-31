import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import constants from '../config/constants';
import ProfileScreen from '../screens/ProfileScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';

const Stack = createNativeStackNavigator();

function ProfilesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={constants.PROFILE_SCREEN} component={ProfileScreen} />
      <Stack.Screen
        name={constants.UPDATE_PROFILE_SCREEN}
        component={UpdateProfileScreen}
      />
    </Stack.Navigator>
  );
}

export default ProfilesNavigator;
