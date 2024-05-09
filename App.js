// TODO: remove this once LottieView is updated and the warning is gone
import './ignoreWarnings';

import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { MenuProvider } from 'react-native-popup-menu';

import AuthNavigator from './src/navigation/AuthNavigator';
import navigationTheme from './src/navigation/navigationTheme';
import AuthContext from './src/context/authContext';
import InfoModalContext from './src/context/infoModalContext';
import ExpiredSessionContext from './src/context/expiredSessionContext';
import authStorage from './src/utility/authStorage';
import AppNavigator from './src/navigation/AppNavigator';
import InfoModal from './src/components/InfoModal';
import constants from './src/config/constants';

// Import the background task setup
import './src/utility/backgroundTasks';

const navigationRef = createNavigationContainerRef();
function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState({});

  const restoreUser = async () => {
    const user = await authStorage.getUser();

    if (user && Date.now() < user.exp * 1000) setUser(user);
    else {
      setUser(null);
      authStorage.removeToken();
    }
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

    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        const { view, payload } = data;
        navigate(constants[view], {
          ...payload,
        });
      }
    );

    return () => subscription.remove();
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
        <ExpiredSessionContext.Provider
          value={{ sessionExpired, setSessionExpired }}
        >
          <InfoModalContext.Provider
            value={{
              infoModalVisible,
              setInfoModalVisible,
              infoModalContent,
              setInfoModalContent,
            }}
          >
            <MenuProvider>
              <NavigationContainer ref={navigationRef} theme={navigationTheme}>
                {user ? <AppNavigator /> : <AuthNavigator />}
              </NavigationContainer>
            </MenuProvider>
            <InfoModal />
          </InfoModalContext.Provider>
        </ExpiredSessionContext.Provider>
      </AuthContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
