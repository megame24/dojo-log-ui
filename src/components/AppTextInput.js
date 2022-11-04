import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import colors from '../config/colors';

import defaultStyle from '../config/styles';

const AppTextInput = React.forwardRef(
  ({ inputContainerStyle, inputStyle, ...otherProps }, ref) => (
    <View style={[styles.container, inputContainerStyle]}>
      <TextInput
        ref={ref}
        {...otherProps}
        style={[defaultStyle.text, inputStyle]}
        underlineColorAndroid="transparent"
      />
    </View>
  )
);

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
