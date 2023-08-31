import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import colors from '../config/colors';
import SettingsNavigator from './SettingsNavigator';
import constants from '../config/constants';
import Icon from '../components/Icon';
import LogbooksNavigator from './LogbooksNavigator';
import RewardsNavigator from './RewardsNavigator';
import ProfilesNavigator from './ProfilesNavigator';

const Tab = createBottomTabNavigator();

function BaseUserNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // REFACTOR!!!
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === constants.LOGBOOKS_TAB) {
            iconName = 'list-outline';
          } else if (route.name === constants.REWARDS_TAB) {
            iconName = 'gift-outline';
          } else if (route.name === constants.SETTINGS_TAB) {
            iconName = 'settings-outline';
          } else if (route.name === constants.PROFILE_TAB) {
            iconName = 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.lightGray,
        headerShown: false,
      })}
    >
      <Tab.Screen name={constants.LOGBOOKS_TAB} component={LogbooksNavigator} />
      <Tab.Screen name={constants.REWARDS_TAB} component={RewardsNavigator} />
      <Tab.Screen name={constants.PROFILE_TAB} component={ProfilesNavigator} />
      <Tab.Screen name={constants.SETTINGS_TAB} component={SettingsNavigator} />
    </Tab.Navigator>
  );
}

export default BaseUserNavigator;
