import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import AppText from '../AppText';

function FormFooter({ message, linkText, onLinkPress }) {
  return (
    <View style={styles.container}>
      {message && <AppText style={styles.message}>{message}</AppText>}
      <TouchableOpacity onPress={onLinkPress}>
        <AppText style={styles.link}>{linkText}</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  message: {
    fontSize: 14,
    color: colors.mediumGray,
  },
  link: {
    fontSize: 14,
    marginLeft: 5,
    textDecorationLine: 'underline',
    color: colors.primary,
  },
});

export default FormFooter;
