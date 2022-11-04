import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';
import constants from '../config/constants';
import dateService from '../utility/dateService';
import AppText from './AppText';
import Icon from './Icon';

export const getHeatmapCellColorFromDuration = (duration) => {
  if (!duration) return colors.borderGray;
  const durationSplit = duration.split(' ');
  const hours = durationSplit[0] ? durationSplit[0].split('h')[0] : 0;
  const minutes = durationSplit[1] ? durationSplit[1].split('m')[0] : 0;
  const totalHours = +hours + +minutes / 60;
  let color = colors.primary25Per;
  if (totalHours >= 2) color = colors.primary50Per;
  if (totalHours >= 6) color = colors.primary75Per;
  if (totalHours >= 12) color = colors.primary;
  return color;
};

function WeekToDateHeatmap({ heatmapData }) {
  const [heatmap, setHeatmap] = useState({});
  const [daysOfYear, setDaysOfYear] = useState([]);
  const days = constants.days;

  // THERE'S A MEMORY LEAK HERE, REFACTOR THIS CODE TO INCLUDE CLEAN UP IF NECESSARY!!!!
  // Update, it's a 12am time bug!!!
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
      if (heatmapElement.goal) {
        heatmap[key].hasGoal = true;
        heatmap[key].goalAchieved = heatmapElement.goal.achieved;
      }
      if (heatmapElement.logs) {
        heatmap[key].color = getHeatmapCellColorFromDuration(
          heatmapElement.logs.totalDurationOfWork
        );
      }
    });
    setHeatmap(heatmap);
  }, []);

  return (
    <View style={styles.container}>
      {daysOfYear.map((day) => (
        <View style={styles.heatmapContainer} key={day}>
          {!heatmap[day].hasGoal && (
            <View
              style={[
                styles.heatmapCell,
                {
                  backgroundColor: heatmap[day].color
                    ? heatmap[day].color
                    : colors.borderGray,
                },
              ]}
            />
          )}
          {heatmap[day].hasGoal && (
            <View style={styles.heatmapCell}>
              <Icon
                size={25}
                name="trophy-sharp"
                color={
                  heatmap[day].goalAchieved ? colors.gold : colors.trophyGray
                }
              />
            </View>
          )}
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
    marginRight: 8,
  },
  heatmapContainer: {
    alignItems: 'center',
  },
});

export default WeekToDateHeatmap;
