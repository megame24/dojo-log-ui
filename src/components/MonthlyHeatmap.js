import React, { forwardRef, useEffect, useMemo } from 'react';
import { FlatList, View } from 'react-native';
import constants from '../config/constants';
import dateService from '../utility/dateService';
import { getHeatmapCellColorFromDuration } from './WeekToDateHeatmap';
import HeatmapGridItem from './HeatmapGridItem';

const MonthlyDateHeatmap = forwardRef(
  (
    {
      heatmapData,
      month,
      year,
      setHeatmapReady,
      navigation,
      logbookId,
      updateGoal,
      quickLog,
    },
    ref
  ) => {
    const { daysOfYear, heatmap } = useMemo(() => {
      const startOfMonth = dateService.getStartOfMonth(year, month);
      const startOfMonthDayValue = new Date(startOfMonth).getDay();
      const startOfMonthDayOfYear = dateService.getDayOfYear(startOfMonth);
      const startOfCalendarMonthDayOfYear =
        startOfMonthDayOfYear - startOfMonthDayValue; // NOTE: offset the days that comes before the start of month to get the month calendar visual

      const endOfMonth = dateService.getEndOfMonth(year, month);
      const endOfMonthDayOfYear = dateService.getDayOfYear(endOfMonth);

      const today = new Date();
      const todayDayOfYear = dateService.getDayOfYear(today);

      const daysArr = [];
      let weekTracker = 0;
      let monthTracker = 0;
      const heatmapTemp = {};
      for (
        let i = startOfCalendarMonthDayOfYear;
        i <= endOfMonthDayOfYear;
        i++
      ) {
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
        if (i === todayDayOfYear) {
          heatmapTemp[i].isToday = true;
        }
        if (i < startOfMonthDayOfYear) heatmapTemp[i].inactive = true;
        weekTracker++;
      }

      Object.keys(heatmapTemp).forEach((key) => {
        const heatmapElement = heatmapData[key];
        if (!heatmapElement) return;
        const goal = heatmapElement.goal;
        const logs = heatmapElement.logs;
        if (heatmapElement.goal) {
          heatmapTemp[key].goalId = goal.id;
          heatmapTemp[key].goalName = goal.name;
          heatmapTemp[key].hasGoal = true;
          heatmapTemp[key].goalAchieved = goal.achieved;
        }
        if (logs) {
          heatmapTemp[key].color = getHeatmapCellColorFromDuration(
            logs.totalDurationOfWorkInMinutes
          );
          heatmapTemp[key].startDate = logs.startDate;
          heatmapTemp[key].endDate = logs.endDate;
        }
      });

      return { daysOfYear: daysArr, heatmap: heatmapTemp };
    }, [month, year]);

    useEffect(() => {
      setHeatmapReady(true);
    }, [heatmap]);

    return (
      <View ref={ref} collapsable={false}>
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
              updateGoal={updateGoal}
              quickLog={quickLog}
            />
          )}
        />
      </View>
    );
  }
);

export default MonthlyDateHeatmap;
