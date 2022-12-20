import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import constants from '../config/constants';
import AppText from './AppText';
import Icon from './Icon';
import WeekToDateHeatmap from './WeekToDateHeatmap';

function LogbookListItem({ item, navigation }) {
  return (
    <View style={styles.logbookContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(constants.LOGBOOK_SCREEN, { logbookId: item.id })
        }
      >
        <AppText style={styles.logbookName}>{item.name}</AppText>
      </TouchableOpacity>
      <AppText style={styles.logbookDesc} numberOfLines={1}>
        {item.description}
      </AppText>
      <View style={styles.heatmapIconContainer}>
        <WeekToDateHeatmap heatmapData={item.heatmap} />
        <Icon
          size={25}
          name={item.category?.iconName}
          color={item.category?.color}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logbookContainer: {
    borderWidth: 1,
    borderColor: colors.borderPrimary,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  logbookName: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 5,
  },
  logbookDesc: {
    marginBottom: 15,
  },
  heatmapIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LogbookListItem;
