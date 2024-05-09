import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';
import constants from '../config/constants';
import dateService from '../utility/dateService';
import AppText from './AppText';
import HeatmapGridItem from './HeatmapGridItem';

export const getHeatmapCellColorFromDuration = (durationInMinutes) => {
  if (!durationInMinutes) return colors.borderGray;
  const totalHours = durationInMinutes / 60;
  let color = colors.primary25Per;
  if (totalHours >= 1) color = colors.primary50Per;
  if (totalHours >= 3) color = colors.primary75Per;
  if (totalHours >= 5) color = colors.primary;
  return color;
};

function WeekToDateHeatmap({ heatmapData, navigation, logbookId, updateGoal }) {
  const [heatmap, setHeatmap] = useState({});
  const [daysOfYear, setDaysOfYear] = useState([]);
  const days = constants.days;

  // THERE'S A MEMORY LEAK HERE, REFACTOR THIS CODE TO INCLUDE CLEAN UP IF NECESSARY!!!!
  useEffect(() => {
    const today = new Date();
    const dayOfYear = dateService.getDayOfYear(today);
    const daysArr = [];

    for (let i = 6; i >= 0; i--) {
      const currentDayOfYear = dayOfYear - i;
      heatmap[currentDayOfYear] = {};
      if (i % 2 === 0) {
        heatmap[currentDayOfYear].day =
          days[
            new Date(
              dateService.getDateFromDayOfYear(
                today.getFullYear(),
                currentDayOfYear
              )
            ).getDay()
          ];
      }
      if (i === 0) heatmap[currentDayOfYear].day = 'Today';
      daysArr.push(currentDayOfYear);
    }
    setDaysOfYear(daysArr);

    Object.keys(heatmap).forEach((key) => {
      const heatmapElement = heatmapData[key];
      if (!heatmapElement) return;
      const goal = heatmapElement.goal;
      const logs = heatmapElement.logs;
      if (goal) {
        heatmap[key].hasGoal = true;
        heatmap[key].goalAchieved = goal.achieved;
        heatmap[key].goalId = goal.id;
        heatmap[key].goalName = goal.name;
      }
      if (logs) {
        heatmap[key].color = getHeatmapCellColorFromDuration(
          logs.totalDurationOfWorkInMinutes
        );
        heatmap[key].startDate = logs.startDate;
        heatmap[key].endDate = logs.endDate;
      }
    });
    setHeatmap(heatmap);
  }, []);

  return (
    <View style={styles.container}>
      {daysOfYear.map((day, i) => (
        <View style={styles.heatmapContainer} key={day}>
          <HeatmapGridItem
            navigation={navigation}
            heatmapItemData={heatmap[day]}
            allowMenu
            logbookId={logbookId}
            updateGoal={updateGoal}
            allowDayDisplay={false}
          />
          <AppText style={styles.day}>{heatmap[day].day}</AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  heatmapCell: {
    width: 25,
    height: 25,
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 5,
  },
  day: {
    fontSize: 12,
  },
  heatmapContainer: {
    alignItems: 'center',
  },
});

export default WeekToDateHeatmap;
