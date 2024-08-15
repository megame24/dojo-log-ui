import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import colors from '../config/colors';

import defaultStyle from '../config/styles';

const AppTextInput = React.forwardRef(
  ({ inputContainerStyle, inputStyle, placeholder, ...otherProps }, ref) => (
    <View style={[styles.container, inputContainerStyle]}>
      <TextInput
        ref={ref}
        {...otherProps}
        placeholder={placeholder}
        placeholderTextColor={colors.lightGray}
        style={[defaultStyle.text, inputStyle, { padding: 10 }]}
        underlineColorAndroid="transparent"
      />
    </View>
  )
);

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },
});

export default AppTextInput;
