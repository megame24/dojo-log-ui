import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import colors from '../config/colors';
import AppText from './AppText';

function ScreenHeader({ header, style, LeftIcon, RightIcon }) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftIconContainer}>{LeftIcon && <LeftIcon />}</View>
      <View style={styles.headerContainer}>
        <AppText numberOfLines={1} style={styles.header}>
          {header}
        </AppText>
      </View>
      <View style={styles.rightIconContainer}>
        {RightIcon && <RightIcon />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 15,
    paddingBottom: 15,
    paddingRight: 20,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
    alignItems: 'center',
  },
  leftIconContainer: {
    width: '20%',
    alignItems: 'flex-start',
  },
  rightIconContainer: {
    width: '20%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  headerContainer: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: '600',
    fontSize: 18,
  },
});

export default ScreenHeader;
