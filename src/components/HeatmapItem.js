import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';
import Icon from './Icon';

function HeatmapItem({
  heatmapItemData,
  trophySize = 25,
  todayMarkSize = 35,
  heatmapCellStyle,
  logOnAGoalStyle = {},
}) {
  return (
    <View style={styles.container}>
      <View>
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
        {!heatmapItemData.inactive && (
          <View
            style={[
              heatmapCellStyle,
              {
                backgroundColor: heatmapItemData.color
                  ? heatmapItemData.color
                  : colors.borderGray,
              },
              {
                ...(heatmapItemData.hasGoal && {
                  ...styles.logOnAGoal,
                  ...logOnAGoalStyle,
                }),
              },
              {
                ...(!heatmapItemData.color &&
                  heatmapItemData.hasGoal && {
                    display: 'none',
                  }),
              },
            ]}
          />
        )}
      </View>
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
  logOnAGoal: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default HeatmapItem;
