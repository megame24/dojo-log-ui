import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import constants from '../config/constants';
import CategoriesScreen from '../screens/CategoriesScreen';
import CreateCategoryScreen from '../screens/CreateCategoryScreen';
import UpdateCategoryScreen from '../screens/UpdateCategoryScreen';

const Stack = createNativeStackNavigator();

function CategoriesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={constants.CATEGORIES_SCREEN}
        component={CategoriesScreen}
      />
      <Stack.Screen
        name={constants.CREATE_CATEGORY_SCREEN}
        component={CreateCategoryScreen}
      />
      <Stack.Screen
        name={constants.UPDATE_CATEGORY_SCREEN}
        component={UpdateCategoryScreen}
      />
    </Stack.Navigator>
  );
}

export default CategoriesNavigator;
