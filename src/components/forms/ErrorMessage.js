import React from 'react';
import { StyleSheet } from 'react-native';
import colors from '../../config/colors';
import AppText from '../AppText';

function ErrorMessage({ style, error, visible }) {
  if (!visible || !error) return null;
  return <AppText style={[styles.error, style]}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.red,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default ErrorMessage;
