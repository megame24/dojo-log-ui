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
import colors from '../config/colors';
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
      <Screen style={styles.screen} scrollable>
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
            style={styles.colorField}
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
    width: '30%',
    height: 40,
    marginBottom: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderGray,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateCategoryScreen;
