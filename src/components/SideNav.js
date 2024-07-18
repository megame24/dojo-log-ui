import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../config/colors';
import constants from '../config/constants';
import useAuth from '../hooks/useAuth';
import storageService from '../utility/storageService';
import AppText from './AppText';
import Screen from './Screen';
import SideNavItem from './SideNavItem';
import UserInitials from './UserInitials';
import useLink from '../hooks/useLink';

const APP_VERSION = require('../../package.json').version;

function SideNav({ navigation }) {
  const { logout, user } = useAuth();
  const { openLink } = useLink();

  return (
    <Screen>
      <View style={styles.navContainer}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate(constants.PROFILE_TAB)}
            style={styles.profileContainer}
          >
            <UserInitials
              containerStyles={styles.userInitialsContainer}
              name={user.name}
            />
            <View style={styles.nameContainer}>
              <AppText numberOfLines={1} style={styles.name}>
                {user.name}
              </AppText>
              <AppText numberOfLines={1} style={styles.profile}>
                {user.username}
              </AppText>
            </View>
          </TouchableOpacity>
          {/* <SideNavItem
            text="Thanks"
            iconName="cash-outline"
            onPress={() => navigation.navigate(constants.DUMMY_SCREEN)}
          /> */}
          {user.role === 'ADMIN' ? null : (
            <SideNavItem
              text="Settings"
              iconName="settings-outline"
              onPress={() => navigation.navigate(constants.SETTINGS_TAB)}
            />
          )}
          <SideNavItem
            text="About us"
            iconName="information-circle-outline"
            onPress={() => openLink('https://dojologs.com')}
          />
          <SideNavItem
            text="Terms of service"
            iconName="receipt-outline"
            onPress={() =>
              openLink('https://dojologs.com/terms-of-service.html')
            }
          />
          <SideNavItem
            text="Personal data & Privacy"
            iconName="shield-checkmark-outline"
            onPress={() => openLink('https://dojologs.com/privacy-policy.html')}
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
  userInitialsContainer: {
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
