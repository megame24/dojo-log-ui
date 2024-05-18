import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import Screen from '../components/Screen';
import colors from '../config/colors';
import useOnboardingScreen from '../hooks/useOnboardingScreen';
import AppText from '../components/AppText';
import OnboardingScreenPage from '../components/OnboardingScreenPage';

const OnboardingScreen = () => {
  const { windowWidth, setCurrentPageHandler, currentPage } =
    useOnboardingScreen();

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
          header="Why Dojologs"
          text="Dojologs help you achieve your goals through the power of consistency, consistency, consistency, consistency, consistency...."
        />
        {/* <View
          style={[{ width: windowWidth }, styles.OnboardingScreenContainer]}
        >
          <Image
            source={require('../assets/icon.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <AppText style={styles.header}>Accumulate Reps</AppText>
          <AppText>
            Donec vitae orci sed dolor Fusce neque.m ult. Aliquam erat volutpat.
            orci sed dolor.
          </AppText>
        </View> */}
        <View
          style={[{ width: windowWidth }, styles.OnboardingScreenContainer]}
        >
          <Image
            source={require('../assets/icon.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <AppText style={styles.header}>Compete</AppText>
          <AppText>
            Donec vitae orci sed dolor Fusce neque.m ult. Aliquam erat volutpat.
            orci sed dolor. vitae orci sed dolor.
          </AppText>
        </View>
        <View
          style={[{ width: windowWidth }, styles.OnboardingScreenContainer]}
        >
          <Image
            source={require('../assets/icon.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <AppText style={styles.header}>Earn Real Rewards</AppText>
          <AppText>
            Donec vitae orci neque.m ult. Aliquam erat volutpat. orci sed dolor.
          </AppText>
        </View>
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
      <Button onPress={() => console.log('navigating...')}>Get started</Button>
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
    borderColor: colors.darkGray,
    borderWidth: 2,
  },
  currentPaginationDot: {
    backgroundColor: colors.darkGray,
  },
  OnboardingScreenContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 200,
    // width: '100%',
  },
  header: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 35,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default OnboardingScreen;
