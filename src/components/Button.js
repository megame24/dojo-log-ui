import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../config/colors';

function Button({ children, style, color = colors.primary, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }, style]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    borderRadius: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Button;
