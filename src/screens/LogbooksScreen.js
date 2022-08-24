import React from 'react';
import { StyleSheet } from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator';
import FloatingButton from '../components/FloatingButton';
import HeaderMenu from '../components/HeaderMenu';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import constants from '../config/constants';

function LogbooksScreen({ navigation }) {
  return (
    <>
      <ScreenHeader
        header="Logbooks"
        LeftIcon={() => (
          <HeaderMenu onPress={() => navigation.toggleDrawer()} />
        )}
      />
      <Screen screenHeaderPresent scrollable floatingButtonRoom={80} />
      <FloatingButton
        onPress={() => navigation.navigate(constants.CREATE_LOGBOOK_SCREEN)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default LogbooksScreen;
