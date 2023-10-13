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
          <SideNavItem
            text="Settings"
            iconName="settings-outline"
            onPress={() => navigation.navigate(constants.DUMMY_SCREEN)}
          />
          <SideNavItem
            text="Personal data & Privacy"
            iconName="shield-outline"
            onPress={() =>
              openLink('https://dojologs/personal-data-and-privacy')
            }
          />
          <SideNavItem
            text="About us"
            iconName="information-circle-outline"
            onPress={() => openLink('https://dojologs/about-us')}
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
