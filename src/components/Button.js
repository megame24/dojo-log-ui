import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../config/colors';

function Button({
  children,
  style,
  color = colors.primary,
  onPress,
  ...otherProps
}) {
  return (
    <TouchableOpacity
      {...otherProps}
      style={[
        styles.container,
        { backgroundColor: color, opacity: otherProps.disabled ? 0.5 : 1 },
        style,
      ]}
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
    height: 45,
    borderRadius: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Button;
