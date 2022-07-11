import React from 'react';
import { StyleSheet } from 'react-native';
import AppText from '../AppText';

function FormSubHeader({ children }) {
  return <AppText style={styles.subHeader}>{children}</AppText>;
}

const styles = StyleSheet.create({
  subHeader: {
    marginTop: 20,
    marginBottom: 5,
  },
});

export default FormSubHeader;
