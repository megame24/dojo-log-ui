import React from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import Constants from 'expo-constants';

function Screen({ style, children, scrollable = false }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {scrollable && (
        <ScrollView style={[styles.view, style]}>{children}</ScrollView>
      )}
      {!scrollable && <View style={[styles.view, style]}>{children}</View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom: 20,
  },
});

export default Screen;