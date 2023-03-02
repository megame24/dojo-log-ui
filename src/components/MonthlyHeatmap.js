import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import constants from '../config/constants';
import dateService from '../utility/dateService';
import { getHeatmapCellColorFromDuration } from './WeekToDateHeatmap';
import HeatmapGridItem from './HeatmapGridItem';

function MonthToDateHeatmap({
  heatmapData,
  month,
  year,
  setHeatmapReady,
  navigation,
  logbookId,
}) {
  const [heatmap, setHeatmap] = useState({});
  const [daysOfYear, setDaysOfYear] = useState([]);

  useEffect(() => {
    const startOfMonth = dateService.getStartOfMonth(year, month);
    const startOfMonthDayValue = new Date(startOfMonth).getDay();
    const startOfMonthDayOfYear = dateService.getDayOfYear(startOfMonth);
    const startOfCalendarMonthDayOfYear =
      startOfMonthDayOfYear - startOfMonthDayValue; // offset the days that comes before the start of month to get the month calendar visual

    const endOfMonth = dateService.getEndOfMonth(year, month);
    const endOfMonthDayOfYear = dateService.getDayOfYear(endOfMonth);

    const today = new Date();
    const todayDayOfYear = dateService.getDayOfYear(today);

    const daysArr = [];
    let weekTracker = 0;
    let monthTracker = 0;
    const heatmapTemp = {};
    for (let i = startOfCalendarMonthDayOfYear; i <= endOfMonthDayOfYear; i++) {
      daysArr.push(i);
      heatmapTemp[i] = {};
      const day =
        constants.days[
          new Date(dateService.getDateFromDayOfYear(year, i)).getDay()
        ];
      if (day === constants.days[0]) {
        heatmapTemp[i].month = constants.months[month];
        if (monthTracker === 2) heatmapTemp[i].monthVisible = true;
        monthTracker++;
      }
      if (weekTracker < 7) {
        heatmapTemp[i].day = ' ';
        if (weekTracker % 2 === 0) heatmapTemp[i].day = day;
      }
      if (i === todayDayOfYear) heatmapTemp[i].isToday = true;
      if (i < startOfMonthDayOfYear) heatmapTemp[i].inactive = true;
      weekTracker++;
    }
    setDaysOfYear(daysArr);

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
        heatmapTemp[key].date = heatmapElement.logs.date;
      }
    });
    setHeatmap(heatmapTemp);
    setHeatmapReady(true);
  }, [month, year]);

  return (
    <FlatList
      style={{ flexGrow: 0 }}
      data={daysOfYear}
      numColumns={7}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <HeatmapGridItem
          navigation={navigation}
          heatmapItemData={heatmap[item]}
          allowMenu
          logbookId={logbookId}
        />
      )}
    />
  );
}

export default MonthToDateHeatmap;
