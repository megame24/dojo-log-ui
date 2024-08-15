import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import constants from '../config/constants';
import AppText from './AppText';
import Icon from './Icon';
import WeekToDateHeatmap from './WeekToDateHeatmap';
import storageService from '../utility/storageService';
import useApi from '../hooks/useApi';
import logbookApi from '../api/logbook';
import useQuickLog from '../hooks/userQuickLog';

function LogbookListItem({
  item,
  navigation,
  reload,
  setPlayTadaAnimation,
  setQuickLogError,
  setQuickLogToastVisible,
}) {
  const logbookId = item.id;
  const updateGoalApi = useApi(logbookApi.updateGoal);

  const { quickLogError, quickLogSuccess, quickLog } = useQuickLog(logbookId);

  const clearLogbooksCacheAndGetLogbooksAsync = async (
    shouldSetQuickLogToastVisible = false
  ) => {
    await storageService.multiRemove([
      constants.LOGBOOKS_DATA_CACHE,
      `${
        constants.LOGBOOK_DATA_CACHE
      }_${logbookId}_${new Date().getFullYear()}`,
    ]);
    await reload();
    if (shouldSetQuickLogToastVisible) setQuickLogToastVisible(true);
  };

  const updateGoal = async (goalDetails, goalId) => {
    const { ok } = await updateGoalApi.request(logbookId, goalId, goalDetails);

    if (!ok) return;
    await clearLogbooksCacheAndGetLogbooksAsync();
    setPlayTadaAnimation(true);
  };

  useEffect(() => {
    if (quickLogError) setQuickLogError(quickLogError);
  }, [quickLogError]);

  useEffect(() => {
    if (quickLogSuccess) {
      clearLogbooksCacheAndGetLogbooksAsync(true);
    }
  }, [quickLogSuccess]);

  return (
    <View style={styles.logbookContainer}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(constants.LOGBOOK_SCREEN, { logbookId })
        }
      >
        <AppText style={styles.logbookName}>{item.name}</AppText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(constants.LOGBOOK_SCREEN, { logbookId })
        }
      >
        <AppText style={styles.logbookDesc} numberOfLines={1}>
          {item.description}
        </AppText>
      </TouchableOpacity>
      <View style={styles.heatmapIconContainer}>
        <WeekToDateHeatmap
          heatmapData={item.heatmap}
          navigation={navigation}
          logbookId={logbookId}
          updateGoal={updateGoal}
          quickLog={quickLog}
        />
        <Icon
          size={25}
          name={item.category?.iconName}
          color={item.category?.color}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logbookContainer: {
    borderWidth: 1,
    borderColor: colors.borderPrimary,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  logbookName: {
    color: colors.primary,
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 5,
  },
  logbookDesc: {
    marginBottom: 15,
  },
  heatmapIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LogbookListItem;
