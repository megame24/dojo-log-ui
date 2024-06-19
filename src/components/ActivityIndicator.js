import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <LottieView
          autoPlay
          loop
          source={require('../assets/animations/loader.json')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    width: 300,
    height: 300,
  },
});

export default ActivityIndicator;
