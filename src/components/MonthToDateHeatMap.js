// get first day of current month
// If not Monday, add extra days to get it up to Monday
// set the data for days before the start of month to inactive

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import colors from '../config/colors';
import constants from '../config/constants';
import dateService from '../utility/dateService';
import AppText from './AppText';
import Icon from './Icon';
import Menu, {
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import { getHeatMapCellColorFromDuration } from './WeekToDateHeatMap';

function MonthToDateHeatMap({ heatMapData, month, year }) {
  const [heatMap, setHeatMap] = useState({});
  const [daysOfYear, setDaysOfYear] = useState([]);

  useEffect(() => {
    const startOfMonth = dateService.getStartOfMonth(month);
    const startOfMonthDayValue = new Date(startOfMonth).getDay();
    const startOfMonthDayOfYear = dateService.getDayOfYear(startOfMonth);
    const startOfCalendarMonthDayOfYear =
      startOfMonthDayOfYear - startOfMonthDayValue;

    const endOfMonth = dateService.getEndOfMonth(month);
    const endOfMonthDayOfYear = dateService.getDayOfYear(endOfMonth);

    const today = new Date();
    const todayDayOfYear = dateService.getDayOfYear(today);

    const daysArr = [];
    let weekTracker = 0;
    let monthTracker = 0;
    const heatMapTemp = {};
    for (let i = startOfCalendarMonthDayOfYear; i <= endOfMonthDayOfYear; i++) {
      daysArr.push(i);
      heatMapTemp[i] = {};
      const day =
        constants.days[new Date(dateService.getDateFromDayOfYear(i)).getDay()];
      if (day === constants.days[0]) {
        heatMapTemp[i].month = constants.months[month];
        if (monthTracker === 2) heatMapTemp[i].monthVisible = true;
        monthTracker++;
      }
      if (weekTracker < 7) {
        heatMapTemp[i].day = ' ';
        if (weekTracker % 2 === 0) heatMapTemp[i].day = day;
      }
      if (i === todayDayOfYear) heatMapTemp[i].isToday = true;
      if (i < startOfMonthDayOfYear) heatMapTemp[i].inactive = true;
      weekTracker++;
    }
    setDaysOfYear(daysArr);

    Object.keys(heatMapData).forEach((key) => {
      const heatMapElement = heatMapData[key];
      if (!heatMapTemp[key]) return; // Rewrite this!!!!
      if (heatMapElement.goal) {
        heatMapTemp[key].goalId = heatMapElement.goal.id;
        heatMapTemp[key].hasGoal = true;
        heatMapTemp[key].goalAchieved = heatMapElement.goal.achieved;
      }
      if (heatMapElement.logs) {
        heatMapTemp[key].color = getHeatMapCellColorFromDuration(
          heatMapElement.logs.totalDurationOfWork
        );
      }
    });
    setHeatMap(heatMapTemp);
  }, [month, year]);

  return (
    <FlatList
      style={{ flexGrow: 0 }}
      data={daysOfYear}
      numColumns={7}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <View style={styles.heatMapParentContainer}>
          {heatMap[item].month && (
            <AppText
              style={[
                styles.month,
                { opacity: heatMap[item].monthVisible ? 1 : 0 },
              ]}
            >
              {heatMap[item].month}
            </AppText>
          )}
          <View style={styles.heatMapContainer}>
            {heatMap[item].day && (
              <AppText style={styles.day}>{heatMap[item].day}</AppText>
            )}
            {heatMap[item].inactive && <View style={styles.heatMapCell} />}
            <Menu>
              {/* consider refactoring out!!!!! */}
              <MenuTrigger>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}
                >
                  {!heatMap[item].inactive && !heatMap[item].hasGoal && (
                    <View
                      style={[
                        styles.heatMapCell,
                        {
                          backgroundColor: heatMap[item].color
                            ? heatMap[item].color
                            : colors.borderGray,
                        },
                      ]}
                    />
                  )}
                  {!heatMap[item].inactive && heatMap[item].hasGoal && (
                    <View style={styles.heatMapCell}>
                      <Icon
                        size={25}
                        name="trophy-sharp"
                        color={
                          heatMap[item].goalAchieved
                            ? colors.gold
                            : colors.trophyGray
                        }
                      />
                    </View>
                  )}
                  {heatMap[item].isToday && (
                    <Icon
                      style={{ position: 'absolute' }}
                      size={35}
                      name="scan-outline"
                      color={colors.mediumGray}
                    />
                  )}
                </View>
              </MenuTrigger>
              <MenuOptions
                customStyles={{ optionsContainer: styles.popupMenuOptions }}
              >
                <MenuOption
                  disabled={!heatMap[item].color}
                  onSelect={() => console.log('hola')}
                  style={styles.popupMenuOption}
                >
                  <AppText
                    style={{
                      fontSize: 14,
                      color: heatMap[item].color
                        ? colors.darkGray
                        : colors.lightGray,
                    }}
                  >
                    View logs
                  </AppText>
                </MenuOption>
                {heatMap[item].hasGoal && (
                  <MenuOption
                    onSelect={() => console.log(heatMap[item].goalId)}
                    style={styles.popupMenuOption}
                  >
                    <AppText style={{ fontSize: 14 }}>View goal</AppText>
                  </MenuOption>
                )}
                {heatMap[item].hasGoal && !heatMap[item].goalAchieved && (
                  <MenuOption
                    onSelect={() => console.log(heatMap[item].goalId)}
                    style={styles.popupMenuOption}
                  >
                    <AppText style={{ fontSize: 14 }}>Set to achieved</AppText>
                  </MenuOption>
                )}
              </MenuOptions>
            </Menu>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  heatMapCell: {
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 5,
    margin: 4,
  },
  day: {
    fontSize: 12,
    marginBottom: 5,
    marginHorizontal: 4,
  },
  heatMapContainer: {
    alignItems: 'center',
  },
  heatMapParentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  month: {
    fontSize: 12,
    marginRight: 10,
  },
  popupMenuOptions: {
    width: 'auto',
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    paddingVertical: 5,
  },
  popupMenuOption: {
    paddingHorizontal: 10,
  },
});

export default MonthToDateHeatMap;
