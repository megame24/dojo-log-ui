import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppText from '../components/AppText';

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <AppText>Settings</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SettingsScreen;
