import React from 'react';
import { StyleSheet } from 'react-native';
import AppText from '../AppText';

function FormHeader({ children }) {
  return <AppText style={styles.formHeader}>{children}</AppText>;
}

const styles = StyleSheet.create({
  formHeader: {
    // textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default FormHeader;
