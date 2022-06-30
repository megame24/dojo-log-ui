import React from 'react';
import { useFormikContext } from 'formik';
import Button from '../Button';
import { StyleSheet } from 'react-native';

function SubmitButton({ title, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button onPress={handleSubmit} {...otherProps} style={styles.button}>
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: { marginTop: 30 },
});

export default SubmitButton;
