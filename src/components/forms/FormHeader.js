import React from 'react';
import { StyleSheet } from 'react-native';
import AppText from '../AppText';

function FormHeader({ children, style }) {
  return <AppText style={[styles.formHeader, style]}>{children}</AppText>;
}

const styles = StyleSheet.create({
  formHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default FormHeader;
