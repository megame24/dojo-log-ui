import React from 'react';
import { Formik } from 'formik';
import { View } from 'react-native';

function Form({ style, children, initialValues, onSubmit, validationSchema }) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <View style={style}>{children}</View>}
    </Formik>
  );
}

export default Form;
