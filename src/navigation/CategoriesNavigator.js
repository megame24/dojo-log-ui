import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import constants from '../config/constants';
import CategoriesScreen from '../screens/CategoriesScreen';
import CreateCategoryScreen from '../screens/CreateCategoryScreen';

const Stack = createNativeStackNavigator();

function CategoriesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={constants.CATEGORIES_SCREEN}
        component={CategoriesScreen}
      />
      <Stack.Screen
        name={constants.CREATE_CATEGORIES_SCREEN}
        component={CreateCategoryScreen}
      />
    </Stack.Navigator>
  );
}

export default CategoriesNavigator;
