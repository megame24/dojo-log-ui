import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import colors from '../config/colors';
import CategoriesNavigator from './CategoriesNavigator';
import SettingsNavigator from './SettingsNavigator';
import constants from '../config/constants';

const Tab = createBottomTabNavigator();

function AdminNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Categories') {
            iconName = 'list-outline';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.lightGray,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={constants.CATEGORIES_TAB}
        component={CategoriesNavigator}
      />
      <Tab.Screen name={constants.SETTINGS_TAB} component={SettingsNavigator} />
    </Tab.Navigator>
  );
}

export default AdminNavigator;
