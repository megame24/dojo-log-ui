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

function LogsScreen({ route, navigation }) {
  const getLogsApi = useApi(logbookApi.getLogs);
  const [logs, setLogs] = useState([]);

  const { date, logbookId } = route.params;

  const getLogsAsync = async () => {
    const { data, ok } = await getLogsApi.request(logbookId, date);
    if (ok) setLogs(data);
  };

  useEffect(() => {
    getLogsAsync();
  }, []);

  const deleteLog = (logId) => {
    console.log(logId);
  };

  return (
    <>
      <ScreenHeader
        header={`${new Date(date).toDateString()} logs`}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator visible={getLogsApi.loading} />
      <Screen screenHeaderPresent>
        <ErrorMessage error={getLogsApi.error} visible={!!getLogsApi.error} />
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
