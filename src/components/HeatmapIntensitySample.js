import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';

function HeatmapIntensitySample({ style }) {
  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.text}>Less</AppText>
      <View
        style={[
          styles.heatmapCell,
          {
            backgroundColor: colors.borderGray,
          },
        ]}
      />
      <View
        style={[
          styles.heatmapCell,
          {
            backgroundColor: colors.primary25Per,
          },
        ]}
      />
      <View
        style={[
          styles.heatmapCell,
          {
            backgroundColor: colors.primary50Per,
          },
        ]}
      />
      <View
        style={[
          styles.heatmapCell,
          {
            backgroundColor: colors.primary75Per,
          },
        ]}
      />
      <View
        style={[
          styles.heatmapCell,
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
  heatmapCell: {
    width: 15,
    height: 15,
    borderRadius: 3,
    marginRight: 4,
  },
});

export default HeatmapIntensitySample;
