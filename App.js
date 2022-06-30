// TODO: remove this once LottieView is updated and the warning is gone
import './ignoreWarnings';

import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import AuthNavigator from './src/navigation/AuthNavigator';
import navigationTheme from './src/navigation/navigationTheme';
import AuthContext from './src/auth/context';
import authStorage from './src/auth/storage';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        restoreUser();
      } catch (error) {
        console.log(error);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={styles.root} onLayout={onLayoutRootView}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer theme={navigationTheme}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
