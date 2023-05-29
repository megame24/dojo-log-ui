import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import constants from '../config/constants';
import LogbooksScreen from '../screens/LogbooksScreen';
import CreateLogbookScreen from '../screens/CreateLogbookScreen';
import LogbookScreen from '../screens/LogbookScreen';
import UpdateLogbookScreen from '../screens/UpdateLogbookScreen';
import CreateLogScreen from '../screens/CreateLogScreen';
import CreateGoalScreen from '../screens/CreateGoalScreen';
import LogsScreen from '../screens/LogsScreen';
import UpdateLogScreen from '../screens/UpdateLogScreen';
import GoalScreen from '../screens/GoalScreen';

const Stack = createNativeStackNavigator();

function LogbooksNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={constants.LOGBOOKS_SCREEN}
        component={LogbooksScreen}
      />
      <Stack.Screen
        name={constants.CREATE_LOGBOOK_SCREEN}
        component={CreateLogbookScreen}
      />
      <Stack.Screen
        name={constants.UPDATE_LOGBOOK_SCREEN}
        component={UpdateLogbookScreen}
      />
      <Stack.Screen
        name={constants.CREATE_LOG_SCREEN}
        component={CreateLogScreen}
      />
      <Stack.Screen
        name={constants.CREATE_GOAL_SCREEN}
        component={CreateGoalScreen}
      />
      <Stack.Screen name={constants.LOGBOOK_SCREEN} component={LogbookScreen} />
      <Stack.Screen name={constants.LOGS_SCREEN} component={LogsScreen} />
      <Stack.Screen
        name={constants.UPDATE_LOG_SCREEN}
        component={UpdateLogScreen}
      />
      <Stack.Screen name={constants.GOAL_SCREEN} component={GoalScreen} />
    </Stack.Navigator>
  );
}

export default LogbooksNavigator;
