import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from './AppText';

function EmptyStateView({ EmptyStateSvg, emptyStateTexts }) {
  return (
    <View style={styles.emptyStateContainer}>
      <EmptyStateSvg style={styles.emptyLogbookSvg} width="200" height="200" />
      <View style={styles.emptyStateTextContainer}>
        {emptyStateTexts.map((text, i) => (
          <AppText key={i} style={styles.emptyStateText}>
            {text}
          </AppText>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyLogbookSvg: { opacity: 1 },
  emptyStateContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyStateTextContainer: {
    paddingHorizontal: 25,
    paddingTop: 10,
  },
  emptyStateText: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 10,
  },
});

export default EmptyStateView;
