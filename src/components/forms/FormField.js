import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

import AppText from '../AppText';
import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';

function FormField({
  label,
  name,
  style,
  inputContainerStyle,
  inputStyle,
  ...otherProps
}) {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext();

  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.label}>{label}</AppText>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        inputContainerStyle={inputContainerStyle}
        inputStyle={inputStyle}
        {...otherProps}
      />
      <ErrorMessage
        style={styles.error}
        error={errors[name]}
        visible={touched[name]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    fontWeight: '600',
  },
  error: {
    textAlign: 'left',
  },
});

export default FormField;
