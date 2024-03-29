import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import BackButton from '../components/BackButton';
import FloatingButton from '../components/FloatingButton';
import Icon from '../components/Icon';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import constants from '../config/constants';
import useApi from '../hooks/useApi';
import logbookApi from '../api/logbook';
import ErrorMessage from '../components/forms/ErrorMessage';
import ActivityIndicator from '../components/ActivityIndicator';
import AppText from '../components/AppText';
import Dropdown from '../components/Dropdown';
import storageService from '../utility/storageService';
import MonthlyHeatmap from '../components/MonthlyHeatmap';
import dateService from '../utility/dateService';
import colors from '../config/colors';
import HeatmapIntensitySample from '../components/HeatmapIntensitySample';
import YearlyHeatmap from '../components/YearlyHeatmap';
import LogbookAddOptionsOverlay from '../components/LogbookAddOptionsOverlay';

// TODO: ADD AN INFO ICON TO THE OPTIONS ROW DETAILING ALL THE CLICKS AND STUFF
// TODO: Implement pull down to refresh

function LogbookScreen({ navigation, route }) {
  const defaultDuration = { label: 'Monthly', value: 'Monthly' };
  const months = constants.months;
  const monthsOptions = [];
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const defaultYearOption = { label: currentYear, value: currentYear };
  const defaultMonthOption = {
    label: months[currentMonth],
    value: currentMonth,
  };
  const { logbookId } = route.params;
  const getLogbookApi = useApi(logbookApi.getLogbook);
  const updateGoalApi = useApi(logbookApi.updateGoal);
  const getEarliestLogbookYearApi = useApi(logbookApi.getEarliestLogbookYear);
  const [yearOptions, setYearOptions] = useState([]);
  const [logbook, setLogbook] = useState({});
  const [duration, setDuration] = useState(defaultDuration);
  const [yearOption, setYearOption] = useState(defaultYearOption);
  const [monthOption, setMonthOption] = useState(defaultMonthOption);
  const [monthOptionDisabled, setMonthOptionDisabled] = useState(false);
  const [heatmapReady, setHeatmapReady] = useState(false);
  const [showAddOptions, setShowAddOptions] = useState(false);
  const isFocused = useIsFocused();

  months.forEach((month, i) => {
    monthsOptions.push({
      label: month,
      value: i,
    });
  });

  const getLogbookAsync = async (startDate, endDate, year) => {
    const todaysDateInUTC = dateService.getTimelessTimestamp(new Date());
    const cacheKey = `${constants.LOGBOOK_DATA_CACHE}_${logbookId}_${yearOption.value}`;
    let cachedLogbookData = await storageService.getItem(cacheKey);
    let cachedLogbookDataValid = false;
    if (cachedLogbookData) {
      cachedLogbookData = JSON.parse(cachedLogbookData);
      if (cachedLogbookData.date === todaysDateInUTC)
        cachedLogbookDataValid = true;
    }
    if (cachedLogbookDataValid) {
      const cachedLogbooks = cachedLogbookData.logbook;
      setLogbook({});
      setLogbook(cachedLogbooks);
    } else {
      setLogbook({});
      const { data, ok } = await getLogbookApi.request(
        logbookId,
        startDate,
        endDate,
        yearOption.value
      );
      if (!ok) return;

      setLogbook(data);

      // only cache current year logbook data
      if (yearOption.value === currentYear) {
        const cacheData = {
          logbook: data,
          date: todaysDateInUTC,
        };
        await storageService.storeItem({
          key: cacheKey,
          value: JSON.stringify(cacheData),
        });
      }
    }
  };

  const generateYearOptions = async (earliestLogbookYear) => {
    let yearOptionsTemp = [];
    const finalYear = currentYear + 5;
    for (let i = earliestLogbookYear; i <= finalYear; i++) {
      yearOptionsTemp.push({
        label: i,
        value: i,
      });
    }
    setYearOptions(yearOptionsTemp);
    yearOptionsTemp = JSON.stringify(yearOptionsTemp);
    await storageService.storeItem({
      key: constants.YEAR_OPTIONS_CACHE,
      value: yearOptionsTemp,
    });
  };

  const getEarliestLogbookYearAsync = async () => {
    let yearOptionsTemp = await storageService.getItem(
      constants.YEAR_OPTIONS_CACHE
    );
    if (yearOptionsTemp) {
      yearOptionsTemp = JSON.parse(yearOptionsTemp);
      setYearOptions(yearOptionsTemp);
    } else {
      const { data, ok } = await getEarliestLogbookYearApi.request();
      if (ok) await generateYearOptions(data);
    }
  };

  useEffect(() => {
    if (isFocused) {
      const startDate = dateService.getStartOfYear(yearOption.value);
      const endDate = dateService.getEndOfYear(yearOption.value);
      getLogbookAsync(startDate, endDate);
      getEarliestLogbookYearAsync();
    }
  }, [yearOption.value, isFocused]);

  const selectDuration = (durationOption) => {
    setDuration(durationOption);
    if (durationOption.value === defaultDuration.value)
      setMonthOptionDisabled(false);
    else setMonthOptionDisabled(true);
  };

  const selectYear = (option) => {
    setYearOption(option);
  };

  const updateGoal = async (goalDetails, goalId) => {
    const { ok } = await updateGoalApi.request(logbookId, goalId, goalDetails);

    if (!ok) return;
    await storageService.multiRemove([
      constants.LOGBOOKS_DATA_CACHE,
      `${
        constants.LOGBOOK_DATA_CACHE
      }_${logbookId}_${new Date().getFullYear()}`,
    ]);
    const startDate = dateService.getStartOfYear(yearOption.value);
    const endDate = dateService.getEndOfYear(yearOption.value);
    getLogbookAsync(startDate, endDate);
  };

  return (
    <>
      <ScreenHeader
        header={logbook.name}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
        RightIcon={() => (
          <Icon
            name={logbook?.category?.iconName}
            color={logbook?.category?.color}
          />
        )}
      />
      <ActivityIndicator
        visible={
          getLogbookApi.loading || !heatmapReady || updateGoalApi.loading
        }
      />
      {/*when loading show nothing here */}
      <FlatList
        style={{ flexGrow: 1 }}
        nestedScrollEnabled
        data={[{ key: 1 }]}
        keyExtractor={(item) => item.key}
        renderItem={() => (
          <Screen
            style={styles.screen}
            screenHeaderPresent
            floatingButtonRoom={120}
          >
            <ErrorMessage
              error={getLogbookApi.error || updateGoalApi.error}
              visible={!!(getLogbookApi.error || updateGoalApi.error)}
            />
            <AppText>{logbook.description}</AppText>
            <View style={styles.container}>
              <View style={styles.optionsHeatmapContainer}>
                <View style={styles.optionsContainer}>
                  <Dropdown
                    onSelectItem={(option) => selectDuration(option)}
                    options={[
                      defaultDuration,
                      { label: 'Yearly', value: 'Yearly' },
                    ]}
                    placeholder="Duration"
                    value={duration}
                    topLevelContainerStyle={{ marginRight: 8 }}
                    inputContainerStyle={{ width: 80, padding: 5 }}
                    inputContentStyle={styles.optionInputContentStyle}
                  />
                  <Dropdown
                    disabled={monthOptionDisabled}
                    onSelectItem={(option) => setMonthOption(option)}
                    options={monthsOptions}
                    placeholder="Month"
                    value={monthOption}
                    topLevelContainerStyle={{ marginRight: 8 }}
                    inputContainerStyle={{ width: 60, padding: 5 }}
                    inputContentStyle={styles.optionInputContentStyle}
                  />
                  <Dropdown
                    onSelectItem={(option) => selectYear(option)}
                    options={yearOptions}
                    placeholder="Year"
                    value={yearOption}
                    topLevelContainerStyle={{ marginRight: 4 }}
                    inputContainerStyle={{ width: 65, padding: 5 }}
                    inputContentStyle={styles.optionInputContentStyle}
                  />
                </View>
                {logbook?.heatmap &&
                  duration.value === defaultDuration.value && (
                    // use factory[strategy not factory] pattern here!!! for week, month and year
                    <MonthlyHeatmap
                      heatmapData={logbook.heatmap}
                      month={monthOption.value}
                      year={yearOption.value}
                      setHeatmapReady={setHeatmapReady}
                      navigation={navigation}
                      logbookId={logbookId}
                      updateGoal={updateGoal}
                    />
                  )}
                {logbook?.heatmap &&
                  duration.value !== defaultDuration.value && (
                    <YearlyHeatmap
                      heatmapData={logbook.yearHeatmapDisplay}
                      year={yearOption.value}
                      setHeatmapReady={setHeatmapReady}
                    />
                  )}
                <HeatmapIntensitySample style={styles.heatmapIntensitySample} />
              </View>
            </View>
          </Screen>
        )}
      />
      {!showAddOptions && (
        <>
          <FloatingButton
            style={styles.editButton}
            size={35}
            color={colors.floatingButtonGray}
            onPress={() =>
              navigation.navigate(constants.UPDATE_LOGBOOK_SCREEN, {
                logbook: {
                  id: logbook.id,
                  name: logbook.name,
                  category: logbook.category,
                  description: logbook.description,
                },
              })
            }
            Icon={() => (
              <Icon name="pen" isFontAwesome size={15} color={colors.white} />
            )}
          />
          <FloatingButton onPress={() => setShowAddOptions(true)} />
        </>
      )}
      <LogbookAddOptionsOverlay
        showAddOptions={showAddOptions}
        setShowAddOptions={setShowAddOptions}
        navigation={navigation}
        logbookId={logbookId}
      />
    </>
  );
}

const styles = StyleSheet.create({
  heatmapIntensitySample: {
    alignSelf: 'flex-start',
    marginLeft: 35,
  },
  editButton: {
    bottom: 95,
    right: 40,
  },
  optionInputContentStyle: {
    fontSize: 12,
  },
  container: {
    alignItems: 'center',
  },
  screen: {
    paddingTop: 15,
  },
  optionsHeatmapContainer: {
    alignItems: 'flex-end',
    marginRight: 22,
  },
  optionsContainer: {
    flexDirection: 'row',
    marginTop: 20,
    zIndex: 2,
    marginBottom: 15,
  },
});

export default LogbookScreen;
