/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import ActivityIndicator from '../components/ActivityIndicator';
import BackButton from '../components/BackButton';
import ErrorMessage from '../components/forms/ErrorMessage';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import useApi from '../hooks/useApi';
import logbookApi from '../api/logbook';
import fileApi from '../api/file';
import { FlatList } from 'react-native-gesture-handler';
import LogListItem from '../components/LogListItem';
import storageService from '../utility/storageService';
import constants from '../config/constants';
import Icon from '../components/Icon';
import colors from '../config/colors';

function LogsScreen({ route, navigation }) {
  const getLogsApi = useApi(logbookApi.getLogs);
  const deleteLogApi = useApi(logbookApi.deleteLog);
  const downloadFileApi = useApi(fileApi.downloadFile);
  const [presignedUrl, setPresignedUrl] = useState('');
  const [fullScreenImgUrl, setFullScreenImgUrl] = useState('');
  const [logs, setLogs] = useState([]);
  const isFocused = useIsFocused();

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
    if (isFocused) getLogsAsync();
  }, [isFocused]);

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

  const downloadFile = async (file) => {
    if (presignedUrl) {
      setFullScreenImgUrl(presignedUrl);
      return;
    }
    const { ok, data } = await downloadFileApi.request(file.id);

    if (!ok) return;
    setPresignedUrl(data.presignedUrl);
    setFullScreenImgUrl(data.presignedUrl);
  };

  const closeImage = () => {
    setFullScreenImgUrl('');
  };

  return (
    <>
      <ScreenHeader
        header={`${new Date(startDate).toDateString()} logs`}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator
        visible={
          getLogsApi.loading || deleteLogApi.loading || downloadFileApi.loading
        }
      />
      <Screen screenHeaderPresent>
        <ErrorMessage
          error={
            getLogsApi.error || deleteLogApi.error || downloadFileApi.error
          }
          visible={
            !!(getLogsApi.error || deleteLogApi.error || downloadFileApi.error)
          }
        />
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LogListItem
              item={item}
              navigation={navigation}
              deleteLog={deleteLog}
              downloadFile={downloadFile}
            />
          )}
        />
        {fullScreenImgUrl && (
          <>
            <Image
              style={styles.image}
              source={{ uri: fullScreenImgUrl }}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.close} onPress={closeImage}>
              <View style={styles.iconContainer}>
                <Icon size={20} name="close-outline" />
              </View>
            </TouchableOpacity>
          </>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  close: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 2,
    alignItems: 'center',
  },
  iconContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
});

export default LogsScreen;
