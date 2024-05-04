import React, { useContext, useEffect, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

import AuthContext from '../context/authContext';
import colors from '../config/colors';
import SettingsNavigator from './SettingsNavigator';
import constants from '../config/constants';
import Icon from '../components/Icon';
import LogbooksNavigator from './LogbooksNavigator';
import RewardsNavigator from './RewardsNavigator';
import ProfilesNavigator from './ProfilesNavigator';
import Constants from 'expo-constants';
import useApi from '../hooks/useApi';
import usersApi from '../api/users';

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });

    return token.data;
  } else {
    alert('Must use physical device for Push Notifications');
  }
}

const Tab = createBottomTabNavigator();

function BaseUserNavigator({ navigation }) {
  const { user } = useContext(AuthContext);
  const createExpoNotificationTokenApi = useApi(
    usersApi.createExpoNotificationToken
  );
  const [notifResponseData, setNotifResponseData] = useState('');
  const responseListener = useRef();

  const createExpoNotificationTokenAsync = async (token) => {
    await createExpoNotificationTokenApi.request({ token }, user.id);
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (!user.expoNotificationTokens.includes(token)) {
        createExpoNotificationTokenAsync(token);
      }
    });

    // responseListener.current =
    //   Notifications.addNotificationResponseReceivedListener((response) => {
    //     setNotifResponseData(JSON.stringify(response.data));
    //     const { view, payload } = response.data;
    //     navigation.navigate(constants[view], {
    //       ...payload,
    //     });
    //   });

    // return () => {
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };
  }, []);

  return (
    <>
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
          tabBarStyle: {
            height: 80,
            paddingTop: 20,
            paddingBottom: 20,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.lightGray,
          headerShown: false,
        })}
      >
        <Tab.Screen
          name={constants.LOGBOOKS_TAB}
          component={LogbooksNavigator}
        />
        <Tab.Screen name={constants.REWARDS_TAB} component={RewardsNavigator} />
        <Tab.Screen
          name={constants.PROFILE_TAB}
          component={ProfilesNavigator}
        />
        <Tab.Screen
          name={constants.SETTINGS_TAB}
          component={SettingsNavigator}
        />
      </Tab.Navigator>
    </>
  );
}

export default BaseUserNavigator;
