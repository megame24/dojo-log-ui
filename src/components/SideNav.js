import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import useAuth from '../hooks/useAuth';
import AppText from './AppText';
import Screen from './Screen';

const APP_VERSION = require('../../package.json').version;

function SideNav() {
  const { logout } = useAuth();
  return (
    <Screen>
      <View style={styles.navContainer}>
        <View>
          <AppText>Innocent Ngene</AppText>
        </View>
        <View>
          <Pressable onPress={logout}>
            <MaterialIcons name="logout" size={20} color={colors.red} />
            <AppText style={styles.logout}>Logout</AppText>
          </Pressable>
          <AppText>Version {APP_VERSION}</AppText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    height: '100%',
    paddingVertical: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },
  logout: {
    color: colors.red,
    marginBottom: 15,
  },
});

export default SideNav;
