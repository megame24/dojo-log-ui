import React, { forwardRef, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import colors from '../config/colors';
import AppText from './AppText';
import Icon from './Icon';
import ConnectionContext from '../context/connectionContext';

const FloatingButton = forwardRef((props, ref) => {
  const {
    Icon: PassedIcon,
    onPress,
    color = colors.secondary,
    size = 50,
    style,
    label,
    disabled = false,
  } = props;
  const { isNotConnected } = useContext(ConnectionContext);

  return (
    <View collapsable={false} style={[styles.container, style]} ref={ref}>
      {label && (
        <TouchableOpacity
          onPress={disabled || isNotConnected ? () => {} : onPress}
          style={styles.labelContainer}
        >
          <AppText style={{ color: colors.white }}>{label}</AppText>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={disabled || isNotConnected ? () => {} : onPress}
        style={[
          styles.buttonContainer,
          {
            backgroundColor: color,
            width: size,
            height: size,
            opacity: disabled || isNotConnected ? 0.5 : 1,
          },
        ]}
      >
        {PassedIcon ? (
          <PassedIcon />
        ) : (
          <Icon name="add-outline" size={30} color={colors.white} />
        )}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  labelContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: colors.mediumGray,
    marginRight: 20,
    borderRadius: 5,
  },
});

export default FloatingButton;
