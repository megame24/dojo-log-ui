import React from 'react';
import { StyleSheet } from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator';
import FloatingButton from '../components/FloatingButton';
import ErrorMessage from '../components/forms/ErrorMessage';
import HeaderMenu from '../components/HeaderMenu';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import constants from '../config/constants';

function RewardsScreen({ navigation }) {
  return (
    <>
      <ScreenHeader
        header="Rewards"
        LeftIcon={() => (
          <HeaderMenu onPress={() => navigation.toggleDrawer()} />
        )}
      />
      <ActivityIndicator visible={false} />
      <Screen style={styles.screen} screenHeaderPresent>
        <ErrorMessage error={{}} visible={!!false} />
      </Screen>
      <FloatingButton
        onPress={() => navigation.navigate(constants.CREATE_REWARD_SCREEN)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default RewardsScreen;
