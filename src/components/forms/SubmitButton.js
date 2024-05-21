import React from 'react';
import { useFormikContext } from 'formik';
import Button from '../Button';
import { StyleSheet } from 'react-native';

function SubmitButton({ title, disabled, ...otherProps }) {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      disabled={disabled}
      onPress={handleSubmit}
      {...otherProps}
      style={styles.button}
    >
      {title}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: { marginTop: 30 },
});

export default SubmitButton;
