import React from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';

function Screen({
  style,
  children,
  scrollable = false,
  screenHeaderPresent = false,
  floatingButtonRoom = 0,
}) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {scrollable && (
        <ScrollView style={[styles.view, style]}>
          {children}
          <View style={{ marginTop: floatingButtonRoom }} />
        </ScrollView>
      )}
      {!scrollable && (
        <View style={[styles.view, style]}>
          {children}
          <View style={{ marginTop: floatingButtonRoom }} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  view: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});

export default Screen;
