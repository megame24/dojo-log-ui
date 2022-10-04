import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFormikContext } from 'formik';

import AppText from '../AppText';
import ErrorMessage from './ErrorMessage';
import colors from '../../config/colors';
import InfoModalContext from '../../context/infoModalContext';
import Icon from '../Icon';
import Dropdown from '../Dropdown';

function DropdownFormField({
  label,
  name,
  style,
  inputContainerStyle,
  inputStyle,
  infoIcon = false,
  infoIconContent,
  placeholder,
  options,
  ...otherProps
}) {
  const { setFieldTouched, setFieldValue, values, errors, touched } =
    useFormikContext();
  const { setInfoModalVisible, setInfoModalContent } =
    useContext(InfoModalContext);

  const infoIconPress = (content) => {
    setInfoModalContent(content);
    setInfoModalVisible(true);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.labelContainer}>
        <AppText style={styles.label}>{label}</AppText>
        {infoIcon && (
          <TouchableOpacity onPress={() => infoIconPress(infoIconContent)}>
            <Icon
              name="help-circle-outline"
              size={16}
              color={colors.lightGray}
            />
          </TouchableOpacity>
        )}
      </View>
      <Dropdown
        onBlur={() => setFieldTouched(name)}
        onSelectItem={(item) => setFieldValue(name, item)}
        value={values[name]}
        inputContainerStyle={inputContainerStyle}
        inputStyle={inputStyle}
        placeholder={placeholder}
        options={options}
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
});

export default DropdownFormField;
