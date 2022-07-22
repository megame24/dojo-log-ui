import React from 'react';

import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import FloatingButton from '../components/FloatingButton';
import HeaderMenu from '../components/HeaderMenu';
import constants from '../config/constants';

function CategoriesScreen({ navigation }) {
  return (
    <>
      <ScreenHeader
        header="Categories"
        LeftIcon={() => (
          <HeaderMenu onPress={() => navigation.toggleDrawer()} />
        )}
      />
      <Screen scrollable />
      <FloatingButton
        onPress={() => navigation.navigate(constants.CREATE_CATEGORIES_SCREEN)}
      />
    </>
  );
}

export default CategoriesScreen;
