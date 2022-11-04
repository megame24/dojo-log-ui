import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import constants from '../config/constants';
import dateService from '../utility/dateService';
import HeatmapGridItem from './HeatmapGridItem';
import { getHeatmapCellColorFromDuration } from './WeekToDateHeatmap';

function YearlyHeatmap({ heatmapData, year, setHeatmapReady }) {
  const [heatmap, setHeatmap] = useState({});
  const [daysOfYear, setDaysOfYear] = useState([]);

  useEffect(() => {
    const startOfYear = dateService.getStartOfYear(year);
    const startOfYearDayValue = new Date(startOfYear).getDay();
    const startOfYearDayOfYear = dateService.getDayOfYear(startOfYear);
    const startOfCalendarYearDayOfYear =
      startOfYearDayOfYear - startOfYearDayValue;

    const endOfYear = dateService.getEndOfYear(year);
    const endOfYearDayOfYear = dateService.getDayOfYear(endOfYear);

    const today = new Date();
    const todayDayOfYear = dateService.getDayOfYear(today);

    const daysArr = [];
    let weekTracker = 0;
    let monthTracker = 2;
    let monthTrackingDone = false;
    const heatmapTemp = {};
    for (let i = startOfCalendarYearDayOfYear; i <= endOfYearDayOfYear; i++) {
      const dayOfYearDate = new Date(dateService.getDateFromDayOfYear(year, i));
      daysArr.push(i);
      heatmapTemp[i] = {};
      const day = constants.days[dayOfYearDate.getDay()];
      if (day === constants.days[0]) {
        const monthValue = dayOfYearDate.getMonth();
        if (monthTracker % 2 === 0)
          heatmapTemp[i].month = constants.months[monthValue];
        if (monthTracker === 4 && !monthTrackingDone) {
          if (i >= startOfYearDayOfYear && monthValue === 11)
            monthTrackingDone = true;
          heatmapTemp[i].monthVisible = true;
          monthTracker = 0;
        }
        monthTracker++;
      }
      if (weekTracker < 14) {
        heatmapTemp[i].day = ' ';
        heatmapTemp[i].inactiveDay = true;
        if (weekTracker % 2 === 0) {
          heatmapTemp[i].day = day;
          heatmapTemp[i].inactiveDay = false;
        }
      }
      if (i === todayDayOfYear) heatmapTemp[i].isToday = true;
      if (i < startOfYearDayOfYear) heatmapTemp[i].inactive = true;
      weekTracker++;
    }
    setDaysOfYear(daysArr);

    // break this up into arrays of array
    Object.keys(heatmapTemp).forEach((key) => {
      const heatmapElement = heatmapData[key];
      if (!heatmapElement) return;
      if (heatmapElement.goal) {
        heatmapTemp[key].goalId = heatmapElement.goal.id;
        heatmapTemp[key].hasGoal = true;
        heatmapTemp[key].goalAchieved = heatmapElement.goal.achieved;
      }
      if (heatmapElement.logs) {
        heatmapTemp[key].color = getHeatmapCellColorFromDuration(
          heatmapElement.logs.totalDurationOfWork
        );
      }
    });
    setHeatmap(heatmapTemp);
    setHeatmapReady(true);
  }, [year]);

  const renderItem = ({ item }) => (
    <HeatmapGridItem
      dayStyle={styles.day}
      monthStyle={styles.month}
      heatmapCellStyle={styles.heatmapCell}
      heatmapItemData={heatmap[item]}
      trophySize={15}
      todayMarkSize={20}
    />
  );

  return (
    <FlatList
      style={{ flexGrow: 0 }}
      nestedScrollEnabled
      data={daysOfYear}
      numColumns={14}
      initialNumToRender={380}
      keyExtractor={(item) => item}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  heatmapCell: {
    width: 15,
    height: 15,
    borderRadius: 3,
    margin: 2,
  },
  day: {
    marginHorizontal: 0,
    fontSize: 8,
  },
  month: {
    fontSize: 8,
    marginRight: 0,
  },
});

export default YearlyHeatmap;
