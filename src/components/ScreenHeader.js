import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import colors from '../config/colors';
import AppText from './AppText';

function ScreenHeader({ header, LeftIcon, RightIcon }) {
  return (
    <View style={styles.container}>
      <View style={[styles.topNavItem, styles.leftIconContainer]}>
        {LeftIcon && <LeftIcon />}
      </View>
      <View style={[styles.topNavItem, styles.headerContainer]}>
        <AppText numberOfLines={1} style={styles.header}>
          {header}
        </AppText>
      </View>
      <View style={[styles.topNavItem, styles.rightIconContainer]}>
        {RightIcon && <RightIcon />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 15,
    paddingRight: 20,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
    alignItems: 'center',
  },
  topNavItem: {
    width: '33.33%',
    flexDirection: 'row',
  },
  leftIconContainer: {
    justifyContent: 'flex-start',
  },
  rightIconContainer: {
    justifyContent: 'flex-end',
  },
  headerContainer: {
    justifyContent: 'center',
  },
  header: {
    fontWeight: '600',
    fontSize: 18,
  },
});

export default ScreenHeader;
