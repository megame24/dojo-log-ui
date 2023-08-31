import React, { useEffect, useState } from 'react';

import colors from '../config/colors';
import { StyleSheet, View } from 'react-native';
import AppText from './AppText';

function UserInitials({ name, size = 50, fontSize = 20, containerStyles }) {
  const [initials, setInitials] = useState('');

  useEffect(() => {
    const splitName = name.split(' ');
    const initials = splitName[0][0] + (splitName[1] ? splitName[1][0] : '');
    setInitials(initials.toLocaleUpperCase());
  }, [name]);
  return (
    <View
      style={[
        styles.initialsContainer,
        { width: size, height: size, borderRadius: size / 2 },
        containerStyles,
      ]}
    >
      <AppText style={[styles.initials, { fontSize }]}>{initials}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  initials: {
    color: colors.white,
    fontWeight: 'bold',
  },
  initialsContainer: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserInitials;
