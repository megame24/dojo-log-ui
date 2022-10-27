import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';

function HeatMapIntensitySample({ style }) {
  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.text}>Less</AppText>
      <View
        style={[
          styles.heatMapCell,
          {
            backgroundColor: colors.borderGray,
          },
        ]}
      />
      <View
        style={[
          styles.heatMapCell,
          {
            backgroundColor: colors.primary25Per,
          },
        ]}
      />
      <View
        style={[
          styles.heatMapCell,
          {
            backgroundColor: colors.primary50Per,
          },
        ]}
      />
      <View
        style={[
          styles.heatMapCell,
          {
            backgroundColor: colors.primary75Per,
          },
        ]}
      />
      <View
        style={[
          styles.heatMapCell,
          {
            backgroundColor: colors.primary,
            marginRight: 10,
          },
        ]}
      />
      <AppText style={styles.text}>More (hours)</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
  },
  text: {
    fontSize: 12,
    marginRight: 10,
  },
  heatMapCell: {
    width: 15,
    height: 15,
    borderRadius: 3,
    marginRight: 4,
  },
});

export default HeatMapIntensitySample;
