import React, { useEffect, useState } from 'react';
import ActivityIndicator from '../components/ActivityIndicator';
import BackButton from '../components/BackButton';
import ErrorMessage from '../components/forms/ErrorMessage';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import useApi from '../hooks/useApi';
import logbookApi from '../api/logbook';
import { FlatList } from 'react-native-gesture-handler';
import LogListItem from '../components/LogListItem';
import storageService from '../utility/storageService';
import constants from '../config/constants';

function LogsScreen({ route, navigation }) {
  const getLogsApi = useApi(logbookApi.getLogs);
  const deleteLogApi = useApi(logbookApi.deleteLog);
  const [logs, setLogs] = useState([]);

  const { startDate, endDate, logbookId } = route.params;

  const getLogsAsync = async () => {
    const { data, ok } = await getLogsApi.request(
      logbookId,
      startDate,
      endDate
    );
    if (ok) setLogs(data);
  };

  useEffect(() => {
    getLogsAsync();
  }, []);

  const deleteLog = async (logId) => {
    const { ok } = await deleteLogApi.request(logbookId, logId);

    if (!ok) return;
    const tempLogs = logs.filter((log) => log.id !== logId);
    setLogs(tempLogs);
    storageService.multiRemove([
      constants.LOGBOOKS_DATA_CACHE,
      `${
        constants.LOGBOOK_DATA_CACHE
      }_${logbookId}_${new Date().getFullYear()}`,
    ]);
  };

  return (
    <>
      <ScreenHeader
        header={`${new Date(startDate).toDateString()} logs`}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator visible={getLogsApi.loading || deleteLogApi.loading} />
      <Screen screenHeaderPresent>
        <ErrorMessage
          error={getLogsApi.error || deleteLogApi.error}
          visible={!!(getLogsApi.error || deleteLogApi.error)}
        />
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LogListItem
              item={item}
              navigation={navigation}
              deleteLog={deleteLog}
            />
          )}
        />
      </Screen>
    </>
  );
}

export default LogsScreen;
