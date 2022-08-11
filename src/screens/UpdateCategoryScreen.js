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
import useApi from '../hooks/useApi';
import ColorFormField from '../components/forms/ColorFormField';
import categoryApi from '../api/category';
import glossary from '../config/glossary';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(2).max(255).label('Name'),
  color: Yup.string()
    .test('validColor', 'Color must be valid', validateColor)
    .label('Color'),
  iconName: Yup.string().max(255).label('Icon Name'),
});

function UpdateCategoryScreen({ navigation, route }) {
  const updateCategoryApi = useApi(categoryApi.update);
  const { category: outdatedCategory } = route.params;

  const handleSubmit = async (category) => {
    const { ok } = await updateCategoryApi.request(
      category,
      outdatedCategory.id
    );

    if (!ok) return;

    navigation.navigate(constants.CATEGORIES_SCREEN);
  };

  return (
    <>
      <ScreenHeader
        header={constants.UPDATE_CATEGORIES_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator visible={updateCategoryApi.loading} />
      <Screen screenHeaderPresent scrollable>
        <Form
          initialValues={{
            name: outdatedCategory.name,
            color: outdatedCategory.color,
            iconName: outdatedCategory.iconName,
          }}
          values
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error={updateCategoryApi.error}
            visible={!!updateCategoryApi.error}
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
          <SubmitButton title="Save" />
        </Form>
      </Screen>
    </>
  );
}

export default UpdateCategoryScreen;
