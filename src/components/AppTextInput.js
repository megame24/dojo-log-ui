import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import colors from '../config/colors';

import defaultStyle from '../config/styles';

function AppTextInput({ width = '100%', ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput {...otherProps} style={defaultStyle.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },
});

export default AppTextInput;
