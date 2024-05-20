import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Button from '../components/Button';
import Screen from '../components/Screen';
import colors from '../config/colors';
import useOnboardingScreen from '../hooks/useOnboardingScreen';
import OnboardingScreenPage from '../components/OnboardingScreenPage';
import LottieView from 'lottie-react-native';
import constants from '../config/constants';
import AppText from '../components/AppText';
import storageService from '../utility/storageService';
import useSkipTutorial from '../hooks/useSkipTutorial';

const OnboardingScreen = ({ navigation }) => {
  const { windowWidth, setCurrentPageHandler, currentPage } =
    useOnboardingScreen();

  const handleGetStartedPress = () => {
    navigation.navigate(constants.LOGIN_SCREEN);
  };

  const handleDontShowAgain = async () => {
    await storageService.storeItem({
      key: constants.SKIP_ONBOARDING_SCREENS,
      value: 'true',
    });
    handleGetStartedPress();
  };

  const { skipTutorial, isReady: skipTutorialStateIsReady } = useSkipTutorial(
    constants.SKIP_ONBOARDING_SCREENS
  );

  useEffect(() => {
    if (skipTutorial && skipTutorialStateIsReady) {
      handleGetStartedPress();
    }
  }, [skipTutorialStateIsReady]);

  return (
    <Screen style={{ marginBottom: 0, paddingHorizontal: 0 }}>
      <ScrollView
        style={{ flex: 1 }}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={setCurrentPageHandler}
      >
        <OnboardingScreenPage
          windowWidth={windowWidth}
          OnboardingAnimation={() => (
            <LottieView
              autoPlay
              loop={false}
              source={require('../assets/animations/target.json')}
              style={{
                width: 300,
                height: 300,
              }}
            />
          )}
          header="Why Choose Dojologs?"
          text="Simply put: Consistency, consistency, and even more consistency."
        />
        <OnboardingScreenPage
          windowWidth={windowWidth}
          OnboardingAnimation={() => (
            <LottieView
              autoPlay
              source={require('../assets/animations/calendar.json')}
              style={{
                width: 300,
                height: 300,
              }}
            />
          )}
          header="Why is Consistency important?"
          text={`"It's not what we do once in a while that shapes our lives, but what we do consistently." - Tony Robbins`}
        />
        <OnboardingScreenPage
          windowWidth={windowWidth}
          OnboardingAnimation={() => (
            <LottieView
              autoPlay
              source={require('../assets/animations/rocket.json')}
              style={{
                width: 300,
                height: 300,
              }}
            />
          )}
          header="Boost Consistency with Dojologs!"
          text="Set goals, track your progress, and visualize achievements to stay motivated and keep the momentum going."
        />
      </ScrollView>
      <View style={styles.paginationWrapper}>
        <View style={styles.paginationContainer}>
          {Array.from(Array(3).keys()).map((key, i) => (
            <View
              style={[
                styles.paginationDot,
                currentPage === i ? styles.currentPaginationDot : null,
              ]}
              key={i}
            />
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={handleDontShowAgain}>
        <AppText style={[styles.tooltipText, styles.skipButton]}>
          Don't show again
        </AppText>
      </TouchableOpacity>
      <Button style={styles.button} onPress={handleGetStartedPress}>
        Get started
      </Button>
    </Screen>
  );
};

const styles = StyleSheet.create({
  paginationWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  paginationContainer: {
    width: '25%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
  },
  paginationDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  currentPaginationDot: {
    backgroundColor: colors.primary,
  },
  button: {
    borderRadius: 0,
    height: 50,
  },
  skipButton: {
    fontSize: 12,
    textDecorationLine: 'underline',
    color: colors.primary,
    marginBottom: 10,
    marginLeft: 15,
  },
});

export default OnboardingScreen;
