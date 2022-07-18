import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import constants from '../config/constants';
import CategoriesScreen from '../screens/CategoriesScreen';

const Stack = createNativeStackNavigator();

function CategoriesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={constants.CATEGORIES_SCREEN}
        component={CategoriesScreen}
      />
    </Stack.Navigator>
  );
}

export default CategoriesNavigator;
