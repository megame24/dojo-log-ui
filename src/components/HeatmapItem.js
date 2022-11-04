import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';
import Icon from './Icon';

function HeatmapItemData({
  heatmapItemData,
  trophySize = 25,
  todayMarkSize = 35,
  heatmapCellStyle,
}) {
  return (
    <View style={styles.container}>
      {!heatmapItemData.inactive && !heatmapItemData.hasGoal && (
        <View
          style={[
            heatmapCellStyle,
            {
              backgroundColor: heatmapItemData.color
                ? heatmapItemData.color
                : colors.borderGray,
            },
          ]}
        />
      )}
      {!heatmapItemData.inactive && heatmapItemData.hasGoal && (
        <View style={heatmapCellStyle}>
          <Icon
            size={trophySize}
            name="trophy-sharp"
            color={
              heatmapItemData.goalAchieved ? colors.gold : colors.trophyGray
            }
          />
        </View>
      )}
      {!heatmapItemData.inactive && heatmapItemData.isToday && (
        <Icon
          style={{ position: 'absolute' }}
          size={todayMarkSize}
          name="scan-outline"
          color={colors.mediumGray}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default HeatmapItemData;
