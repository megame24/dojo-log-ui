import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import { Pressable } from 'react-native';
import useAuth from '../hooks/useAuth';
import AuthContext from '../context/authContext';
import AdminNavigator from './AdminNavigator';
import constants from '../config/constants';
import SideNav from '../components/SideNav';

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

function BackScreen({ navigation }) {
  return (
    <Screen>
      <Pressable onPress={() => navigation.goBack()}>
        <AppText>Back</AppText>
      </Pressable>
    </Screen>
  );
}

function AppNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={({ navigation }) => <SideNav navigation={navigation} />}
      screenOptions={{ headerShown: false }}
    >
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
      <Drawer.Screen name={constants.DUMMY_SCREEN} component={BackScreen} />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
