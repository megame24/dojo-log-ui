import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

import AppText from '../AppText';
import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';

function DurationOfWorkFormField({
  style,
  name = 'durationOfWork',
  label = 'Duration of work',
  inputContainerStyle,
  inputStyle,
  infoIcon = false,
  infoIconContent,
  ...otherProps
}) {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext();
  const [hours, setHours] = useState(values.hours);
  const [minutes, setMinutes] = useState(values.minutes);

  useEffect(() => {
    let value = 0;
    if (hours) value += +hours * 60;
    if (minutes) value += +minutes;
    setFieldValue(name, value);
  }, [hours, minutes]);

  const onTextChange = (text, fieldName, setFunction) => {
    if (/^(0|[1-9]\d*)$/.test(text) || !text) {
      setFieldValue(fieldName, text);
      setFunction(text);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>{label}</AppText>
      </View>
      <View style={styles.durationContainer}>
        <View style={styles.inputContainer}>
          <AppTextInput
            onBlur={() => setFieldTouched('hours')}
            keyboardType="numeric"
            onChangeText={(text) => onTextChange(text, 'hours', setHours)}
            value={values.hours}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={inputStyle}
            {...otherProps}
          />
          <AppText>hours</AppText>
        </View>
        <View style={styles.inputContainer}>
          <AppTextInput
            onBlur={() => setFieldTouched('minutes')}
            keyboardType="numeric"
            onChangeText={(text) => onTextChange(text, 'minutes', setMinutes)}
            value={values.minutes}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={inputStyle}
            {...otherProps}
          />
          <AppText>minutes</AppText>
        </View>
      </View>
      <ErrorMessage
        style={styles.error}
        error={errors[name]}
        visible={touched.hours && touched.minutes}
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
    marginRight: 5,
  },
  error: {
    textAlign: 'left',
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationContainer: { flexDirection: 'row' },
  inputContainer: { width: '50%', flexDirection: 'row', alignItems: 'center' },
  inputContainerStyle: { width: '50%', marginRight: 10 },
});

export default DurationOfWorkFormField;
