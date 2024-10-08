import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

import AppText from '../AppText';
import ErrorMessage from './ErrorMessage';
import InfoModalContext from '../../context/infoModalContext';
import Dropdown from '../Dropdown';
import InfoIcon from '../InfoIcon';

function DropdownFormField({
  label,
  name,
  style,
  inputContainerStyle,
  inputStyle,
  infoIcon = false,
  infoIconContent,
  placeholder,
  useScrollView = true,
  options,
  onItemChange = () => {},
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
          <InfoIcon infoIconPress={() => infoIconPress(infoIconContent)} />
        )}
      </View>
      <Dropdown
        onBlur={() => setFieldTouched(name)}
        onSelectItem={(item) => {
          setFieldValue(name, item);
          onItemChange(item);
        }}
        value={values[name]}
        topLevelContainerStyle={{ marginTop: 5 }}
        inputContainerStyle={[
          { width: '100%', borderRadius: 10 },
          inputContainerStyle,
        ]}
        // optionsContainerStyle={{ top: 43 }}
        inputStyle={inputStyle}
        placeholder={placeholder}
        options={options}
        useScrollView
        {...otherProps}
      />
      <View style={{ zIndex: -1 }}>
        <ErrorMessage
          style={styles.error}
          error={errors[name]}
          visible={touched[name]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    zIndex: 2,
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
