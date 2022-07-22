import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import { Pressable } from 'react-native';
import useAuth from '../auth/useAuth';
import AuthContext from '../auth/context';
import AdminNavigator from './AdminNavigator';
import constants from '../config/constants';

const Drawer = createDrawerNavigator();

function HomeScreen() {
  const { logout } = useAuth();
  return (
    <Screen>
      <Pressable onPress={logout}>
        <AppText>Logout</AppText>
      </Pressable>
    </Screen>
  );
}

function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      {user.role.toLowerCase() === 'admin' ? (
        <Drawer.Screen
          name={constants.ADMIN_SCREEN}
          component={AdminNavigator}
        />
      ) : (
        <Drawer.Screen
          name={constants.BASE_USER_SCREEN}
          component={HomeScreen}
        />
      )}
    </Drawer.Navigator>
  );
}

export default AppNavigator;
