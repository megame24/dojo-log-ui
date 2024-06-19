import React from 'react';
import { StyleSheet } from 'react-native';
import AppText from '../AppText';

function FormSubHeader({ style, children }) {
  return <AppText style={[style, styles.subHeader]}>{children}</AppText>;
}

const styles = StyleSheet.create({
  subHeader: {
    marginTop: 20,
    marginBottom: 5,
  },
});

export default FormSubHeader;
