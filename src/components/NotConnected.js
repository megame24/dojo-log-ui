import { SafeAreaView, Animated, StyleSheet } from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';
import { useContext } from 'react';
import ConnectionContext from '../context/connectionContext';
import useFadeAnimation from '../hooks/useFadeAnimation';

const NotConnected = () => {
  const { isNotConnected } = useContext(ConnectionContext);
  const { fadeAnim, showElement } = useFadeAnimation(isNotConnected);
  return showElement ? (
    <SafeAreaView>
      <Animated.View style={{ opacity: fadeAnim }}>
        <AppText style={styles.text}>No Internet Connection</AppText>
      </Animated.View>
    </SafeAreaView>
  ) : null;
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: colors.red,
    padding: 5,
    color: colors.white,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default NotConnected;
