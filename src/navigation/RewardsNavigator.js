import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import constants from '../config/constants';
import RewardsScreen from '../screens/RewardsScreen';
import CreateRewardScreen from '../screens/CreateRewardScreen';

const Stack = createNativeStackNavigator();

function RewardsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={constants.REWARDS_SCREEN} component={RewardsScreen} />
      <Stack.Screen
        name={constants.CREATE_REWARD_SCREEN}
        component={CreateRewardScreen}
      />
    </Stack.Navigator>
  );
}

export default RewardsNavigator;
