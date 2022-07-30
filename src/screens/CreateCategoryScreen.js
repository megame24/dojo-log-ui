import React from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';
import validateColor from 'validate-color';

import ActivityIndicator from '../components/ActivityIndicator';
import BackButton from '../components/BackButton';
import ErrorMessage from '../components/forms/ErrorMessage';
import Form from '../components/forms/Form';
import FormField from '../components/forms/FormField';
import SubmitButton from '../components/forms/SubmitButton';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import constants from '../config/constants';
import validationSchemaObject from '../config/validationSchemaObject';
import useApi from '../hooks/useApi';
import ColorFormField from '../components/forms/ColorFormField';
import categoryApi from '../api/category';

const validationSchema = Yup.object().shape({
  name: validationSchemaObject.name,
  color: Yup.string()
    .required()
    .test('validColor', 'Color must be valid', validateColor)
    .label('Color'),
});

function CreateCategoryScreen({ navigation }) {
  const createCategoryApi = useApi(categoryApi.create);

  const handleSubmit = async (category) => {
    const { ok } = await createCategoryApi.request(category);

    if (!ok) return;

    navigation.navigate(constants.CATEGORIES_SCREEN);
  };

  return (
    <>
      <ScreenHeader
        header={constants.CREATE_CATEGORIES_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator visible={createCategoryApi.loading} />
      <Screen screenHeaderPresent style={styles.screen} scrollable>
        <Form
          initialValues={{
            name: '',
            color: '',
          }}
          values
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error={createCategoryApi.error}
            visible={!!createCategoryApi.error}
          />
          <FormField name="name" label="Name" autoCorrect={false} />
          <ColorFormField
            name="color"
            label="Color"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <SubmitButton title="Create" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  screen: { paddingTop: 10 },
});

export default CreateCategoryScreen;
