import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import { Pressable } from 'react-native';
import useAuth from '../auth/useAuth';
import AuthContext from '../auth/context';
import AdminNavigator from './AdminNavigator';
import constants from '../config/constants';
import MyDrawer from './DrawerNavigator';

const Stack = createNativeStackNavigator();

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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user.role.toLowerCase() === 'admin' ? (
        <Stack.Screen
          name={constants.ADMIN_SCREEN}
          component={AdminNavigator}
        />
      ) : (
        <Stack.Screen
          name={constants.BASE_USER_SCREEN}
          component={HomeScreen}
        />
      )}
    </Stack.Navigator>
  );
}

export default AppNavigator;
