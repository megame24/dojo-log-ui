import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AuthContext from '../context/authContext';
import AdminNavigator from './AdminNavigator';
import constants from '../config/constants';
import SideNav from '../components/SideNav';
import BaseUserNavigator from './BaseUserNavigator';

const Drawer = createDrawerNavigator();

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
          component={BaseUserNavigator}
        />
      )}
    </Drawer.Navigator>
  );
}

export default AppNavigator;
