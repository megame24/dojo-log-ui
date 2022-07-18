import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // switch all icons to font-awesome
import Constants from 'expo-constants';

import Screen from '../components/Screen';
import colors from '../config/colors';
import AppText from '../components/AppText';
import ScreenHeader from '../components/ScreenHeader';

function CategoriesScreen({ navigation }) {
  return (
    <>
      <ScreenHeader
        header="Categories"
        LeftIcon={() => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <FontAwesome name="bars" size={25} color={colors.darkGray} />
          </TouchableOpacity>
        )}
      />
      <Screen scrollable>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
        <AppText>holla</AppText>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 15,
    paddingRight: 20,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
    alignItems: 'center',
  },
  topNavItem: {
    width: '33.33%',
    flexDirection: 'row',
  },
  leftIconContainer: {
    justifyContent: 'flex-start',
  },
  rightIconContainer: {
    justifyContent: 'flex-end',
  },
  headerContainer: {
    justifyContent: 'center',
  },
  header: {
    fontWeight: '600',
    fontSize: 18,
  },
});

export default CategoriesScreen;
