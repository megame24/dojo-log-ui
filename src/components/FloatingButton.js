import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import colors from '../config/colors';

function FloatingButton({
  Icon,
  onPress,
  color = colors.secondary,
  size = 50,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: color, width: size, height: size },
      ]}
    >
      {Icon ? (
        <Icon />
      ) : (
        <Ionicons name="add-outline" size={30} color={colors.white} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
});

export default FloatingButton;
