import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import Icon from './Icon';

function SideNavItem({
  text,
  iconName,
  iconColor = colors.darkGray,
  onPress,
  textStyle,
}) {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      <Icon color={iconColor} name={iconName} />
      <AppText style={[styles.navText, textStyle]}>{text}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  navText: {
    marginLeft: 10,
  },
});

export default SideNavItem;
