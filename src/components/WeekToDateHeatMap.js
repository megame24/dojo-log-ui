import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';
import dateService from '../utility/dateService';
import AppText from './AppText';
import Icon from './Icon';

function WeekToDateHeatMap({ heatMapData }) {
  const [heatMap, setHeatMap] = useState({});
  const [daysOfYear, setDaysOfYear] = useState([]);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  const getHeatMapCellColorFromDuration = (duration) => {
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

  useEffect(() => {
    const today = new Date();
    const dayOfYear = dateService.getDayOfYear(today);
    const daysArr = [];

    for (let i = 6; i >= 0; i--) {
      const currentDayOfYear = dayOfYear - i;
      heatMap[currentDayOfYear] = {};
      if (i % 2 === 0) {
        heatMap[currentDayOfYear].day =
          days[
            new Date(
              dateService.getDateFromDayOfYear(currentDayOfYear)
            ).getDay()
          ];
      }
      if (i === 0) heatMap[currentDayOfYear].day = 'Today';
      daysArr.push(currentDayOfYear);
    }
    setDaysOfYear(daysArr);

    Object.keys(heatMapData).forEach((key) => {
      const heatMapElement = heatMapData[key];
      if (heatMapElement.goal) {
        heatMap[key].hasGoal = true;
        heatMap[key].goalAchieved = heatMapElement.goal.achieved;
      }
      if (heatMapElement.logs) {
        heatMap[key].color = getHeatMapCellColorFromDuration(
          heatMapElement.logs.totalDurationOfWork
        );
      }
    });
    setHeatMap(heatMap);
  }, []);

  return (
    <View style={styles.container}>
      {daysOfYear.map((day) => (
        <View style={styles.heatMapContainer} key={day}>
          {!heatMap[day].hasGoal && (
            <View
              style={[
                styles.heatMapCell,
                {
                  backgroundColor: heatMap[day].color
                    ? heatMap[day].color
                    : colors.borderGray,
                },
              ]}
            />
          )}
          {heatMap[day].hasGoal && (
            <View style={styles.heatMapCell}>
              <Icon
                size={25}
                name="trophy-sharp"
                color={
                  heatMap[day].goalAchieved ? colors.gold : colors.trophyGray
                }
              />
            </View>
          )}
          <AppText style={styles.day}>{heatMap[day].day}</AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  heatMapCell: {
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
  heatMapContainer: {
    alignItems: 'center',
  },
});

export default WeekToDateHeatMap;
