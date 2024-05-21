import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import colors from '../config/colors';

function Button({
  children,
  style,
  color = colors.primary,
  outline = false,
  onPress,
  subText,
  Icon,
  textStyle,
  disabled = false,
  ...otherProps
}) {
  return (
    <TouchableOpacity
      {...otherProps}
      style={[
        styles.container,
        {
          backgroundColor: outline ? colors.white : color,
          borderWidth: 1,
          borderColor: color,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={disabled ? () => {} : onPress}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {Icon && (
          <View style={{ marginRight: 10 }}>
            <Icon />
          </View>
        )}
        <Text
          style={[
            styles.text,
            { color: outline ? color : colors.white },
            textStyle,
          ]}
        >
          {children}
        </Text>
      </View>
      {subText && (
        <Text
          style={[styles.subText, { color: outline ? color : colors.white }]}
        >
          {subText}
        </Text>
      )}
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
  subText: {
    color: colors.white,
    fontSize: 14,
  },
});

export default Button;
