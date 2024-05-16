import React from 'react';
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
import glossary from '../config/glossary';

const validationSchema = Yup.object().shape({
  name: validationSchemaObject.name,
  color: Yup.string()
    .required()
    .test('validColor', 'Color must be valid', validateColor)
    .label('Color'),
  iconName: Yup.string().required().max(255).label('Icon Name'),
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
        header={constants.CREATE_CATEGORY_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator visible={createCategoryApi.loading} />
      <Screen scrollable>
        <Form
          initialValues={{
            name: '',
            color: '',
            iconName: '',
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
          <FormField
            name="iconName"
            label="Icon name"
            autoCapitalize="none"
            autoCorrect={false}
            infoIcon
            infoIconContent={glossary.CATEGORY_ICON_NAME}
          />
          <SubmitButton title="Create" />
        </Form>
      </Screen>
    </>
  );
}

export default CreateCategoryScreen;
