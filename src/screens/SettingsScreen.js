import React from 'react';
import ScreenHeader from '../components/ScreenHeader';
import HeaderMenu from '../components/HeaderMenu';
import Screen from '../components/Screen';
import SideNavItem from '../components/SideNavItem';
import constants from '../config/constants';

function SettingsScreen({ navigation }) {
  return (
    <>
      <ScreenHeader
        header="Settings"
        LeftIcon={() => (
          <HeaderMenu onPress={() => navigation.toggleDrawer()} />
        )}
      />
      <Screen screenHeaderPresent style={{ marginTop: 10 }}>
        <SideNavItem
          text="Account"
          iconName="person-circle-outline"
          onPress={() => navigation.navigate(constants.ACCOUNT_SETTINGS_SCREEN)}
        />
        <SideNavItem
          text="Password and authentication"
          iconName="lock-closed-outline"
          onPress={() =>
            navigation.navigate(constants.PASSWORD_SETTINGS_SCREEN)
          }
        />
      </Screen>
    </>
  );
}

export default SettingsScreen;
