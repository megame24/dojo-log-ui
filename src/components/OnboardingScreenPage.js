import { StyleSheet, View } from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';

const OnboardingScreenPage = ({
  windowWidth,
  header,
  text,
  OnboardingAnimation,
}) => {
  return (
    <View style={[{ width: windowWidth }, styles.OnboardingScreenContainer]}>
      <OnboardingAnimation />
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
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default OnboardingScreenPage;
