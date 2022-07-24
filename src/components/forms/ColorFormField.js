import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import validateColor from 'validate-color'; // abstract this to a service!!!

import colors from '../../config/colors';
import FormField from './FormField';

function ColorFormField({ name, ...otherProps }) {
  const [color, setColor] = useState('');
  const { values, errors, touched } = useFormikContext();

  useEffect(() => {
    if (validateColor(values[name])) setColor(values[name].toLowerCase());
    else setColor(colors.white);
  }, [values]);

  return (
    <View style={styles.colorContainer}>
      <FormField style={styles.colorField} name={name} {...otherProps} />
      <FormField
        style={styles.colorView}
        inputContainerStyle={[
          {
            backgroundColor: color,
            marginBottom: touched[name] && errors[name] ? 28 : 0,
          },
        ]}
        editable={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  colorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  colorField: {
    width: '60%',
  },
  colorView: {
    width: '37%',
  },
});

export default ColorFormField;
