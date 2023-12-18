import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';

function Separator({ style }) {
  return <View style={[styles.container, style]} />;
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: colors.borderGray,
    marginTop: 10,
  },
});

export default Separator;
