import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../config/colors';
import constants from '../config/constants';
import useAuth from '../hooks/useAuth';
import storageService from '../utility/storageService';
import AppText from './AppText';
import Screen from './Screen';
import SideNavItem from './SideNavItem';

const APP_VERSION = require('../../package.json').version;

function SideNav({ navigation }) {
  const [initials, setInitials] = useState('');
  const { logout, user } = useAuth();

  useEffect(() => {
    const splitName = user.name.split(' ');
    const initials = splitName[0][0] + (splitName[1] ? splitName[1][0] : '');
    setInitials(initials.toLocaleUpperCase());
  }, [user.name]);

  return (
    <Screen>
      <View style={styles.navContainer}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate(constants.DUMMY_SCREEN)}
            style={styles.profileContainer}
          >
            <View style={styles.initialsContainer}>
              <AppText style={styles.initials}>{initials}</AppText>
            </View>
            <View style={styles.nameContainer}>
              <AppText numberOfLines={1} style={styles.name}>
                {user.name}
              </AppText>
              <AppText numberOfLines={1} style={styles.profile}>
                {user.username}
              </AppText>
            </View>
          </TouchableOpacity>
          <SideNavItem
            text="Donate"
            iconName="cash-outline"
            onPress={() => navigation.navigate(constants.DUMMY_SCREEN)}
          />
          <SideNavItem
            text="Settings"
            iconName="settings-outline"
            onPress={() => navigation.navigate(constants.DUMMY_SCREEN)}
          />
          <SideNavItem
            text="Personal data & Privacy"
            iconName="shield-outline"
            onPress={() => navigation.navigate(constants.DUMMY_SCREEN)}
          />
          <SideNavItem
            text="About us"
            iconName="information-circle-outline"
            onPress={() => navigation.navigate(constants.DUMMY_SCREEN)}
          />
        </View>
        <View>
          <SideNavItem
            textStyle={styles.logout}
            iconColor={colors.red}
            text="Logout"
            iconName="log-out-outline"
            onPress={() => {
              logout();
              storageService.clearCache();
            }}
          />
          <AppText style={styles.version}>Version {APP_VERSION}</AppText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    height: '100%',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  logout: {
    color: colors.red,
  },
  version: {
    color: colors.lightGray,
    fontSize: 14,
  },
  flexRow: {
    flexDirection: 'row',
  },
  initials: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  initialsContainer: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  name: {
    fontWeight: 'bold',
  },
  profile: {
    fontSize: 14,
    color: colors.mediumGray,
  },
  nameContainer: {
    maxWidth: 200,
  },
});

export default SideNav;
