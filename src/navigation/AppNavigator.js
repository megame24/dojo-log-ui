import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import { Pressable } from 'react-native';
import useAuth from '../auth/useAuth';

const Stack = createNativeStackNavigator();

function HomeScreen() {
  const { logout } = useAuth();
  return (
    <Screen>
      <Pressable onPress={logout}>
        <AppText>Logout</AppText>
      </Pressable>
    </Screen>
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
