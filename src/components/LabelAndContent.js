import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';

function LabelAndContent({ label, Content }) {
  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{label}</AppText>
      {Content && <Content />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    color: colors.mediumGray,
    fontSize: 14,
    marginBottom: 10,
  },
});

export default LabelAndContent;
