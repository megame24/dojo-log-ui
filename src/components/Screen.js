import React, { forwardRef } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';

const Screen = forwardRef(
  ({ style, children, scrollable = false, floatingButtonRoom = 0 }, ref) => {
    return (
      <SafeAreaView ref={ref} collapsable={false} style={[styles.screen]}>
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
);

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
