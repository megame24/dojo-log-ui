import { useFormikContext } from 'formik';
import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import InfoModalContext from '../../context/infoModalContext';
import AppMultiPicker from '../AppMultiPicker';
import AppText from '../AppText';
import Icon from '../Icon';
import ErrorMessage from './ErrorMessage';

function MultiPickerFormField({
  label,
  name,
  style,
  inputContainerStyle,
  inputStyle,
  infoIcon = false,
  infoIconContent,
  placeholder,
  options,
  PickerItem,
  numberOfColumns,
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
      <AppMultiPicker
        onBlur={() => setFieldTouched(name)}
        onSelectItem={(item) => setFieldValue(name, item)}
        value={values[name]}
        inputContainerStyle={inputContainerStyle}
        inputStyle={inputStyle}
        placeholder={placeholder}
        options={options}
        PickerItem={PickerItem}
        numberOfColumns={numberOfColumns}
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

export default MultiPickerFormField;
