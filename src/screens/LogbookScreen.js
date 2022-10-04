import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BackButton from '../components/BackButton';
import FloatingButton from '../components/FloatingButton';
import HeaderMenu from '../components/HeaderMenu';
import Icon from '../components/Icon';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import constants from '../config/constants';
import useApi from '../hooks/useApi';
import logbookApi from '../api/logbook';
import { useIsFocused } from '@react-navigation/native';
import ErrorMessage from '../components/forms/ErrorMessage';
import ActivityIndicator from '../components/ActivityIndicator';
import AppText from '../components/AppText';
import DropdownFormField from '../components/forms/DropdownFormField';
import Dropdown from '../components/Dropdown';

function LogbookScreen({ navigation, route }) {
  const defaultDuration = { label: 'Yearly', value: 'Yearly' };
  const { logbookId } = route.params;
  const getLogbookApi = useApi(logbookApi.getLogbook);
  const [logbook, setLogbook] = useState({});
  const [duration, setDuration] = useState(defaultDuration);
  const isFocused = useIsFocused();

  const getLogbookAsync = async () => {
    const { data, ok } = await getLogbookApi.request(logbookId);
    if (ok) setLogbook(data);
    // console.log(data);
  };

  useEffect(() => {
    if (isFocused) getLogbookAsync();
  }, [isFocused]);

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
      <ActivityIndicator visible={getLogbookApi.loading} />
      <Screen style={styles.screen} screenHeaderPresent>
        <ErrorMessage
          error={getLogbookApi.error}
          visible={!!getLogbookApi.error}
        />
        <AppText>{logbook.description}</AppText>
        <Dropdown
          onSelectItem={(option) => setDuration(option)}
          options={[defaultDuration, { label: 'Monthly', value: 'Monthly' }]}
          placeholder="Duration"
          value={duration}
          inputContainerStyle={{ width: 100, padding: 5 }}
          inputContentStyle={{ fontSize: 14 }}
        />
        <AppText>hola</AppText>
        {/* <Dropdown
          onSelectItem={(option) => setDuration(option)}
          options={[defaultDuration, { label: 'Monthly', value: 'Monthly' }]}
          placeholder="Duration"
          value={duration}
          inputContainerStyle={{ width: 100, padding: 5 }}
          inputContentStyle={{ fontSize: 14 }}
        /> */}
      </Screen>
      <FloatingButton
        onPress={() => navigation.navigate(constants.CREATE_LOGBOOK_SCREEN)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 15,
  },
});

export default LogbookScreen;
