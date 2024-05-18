import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import AppText from './AppText';
import colors from '../config/colors';

const OnboardingScreenPage = ({ windowWidth, header, text }) => {
  return (
    <View style={[{ width: windowWidth }, styles.OnboardingScreenContainer]}>
      <LottieView
        autoPlay
        loop
        source={require('../assets/animations/aaa.json')}
        style={{
          width: 300,
          height: 300,
          // backgroundColor: 'red'
        }}
      />
      <AppText style={styles.header}>{header}</AppText>
      <AppText>{text}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  OnboardingScreenContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 20,
  },
});

export default OnboardingScreenPage;
