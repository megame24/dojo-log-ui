import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';
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
import logbookApi from '../api/logbook';
import categoryApi from '../api/category';
import PickerFormField from '../components/forms/PickerFormField';
import CategoryPickerItem from '../components/CategoryPickerItem';

const validationSchema = Yup.object().shape({
  name: validationSchemaObject.name,
  category: Yup.object().required().nullable().label('Category'),
  description: Yup.string().max(500).label('Description'),
});

function CreateLogbookScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const getCategoriesApi = useApi(categoryApi.getAll);
  const createLogbookApi = useApi(logbookApi.create);

  const getCategoriesAsync = async () => {
    const { data, ok } = await getCategoriesApi.request();
    if (ok) setCategories(data);
  };

  useEffect(() => {
    getCategoriesAsync();
  }, []);

  const handleSubmit = async (categoryDetails) => {
    const category = {
      name: categoryDetails.name,
      categoryId: categoryDetails.category.id,
      visibility: constants.VISIBILITY_PUBLIC, // default to public for now
      description: categoryDetails.description,
    };
    const { ok } = await createLogbookApi.request(category);

    if (!ok) return;

    navigation.navigate(constants.LOGBOOKS_SCREEN);
  };
  return (
    <>
      <ScreenHeader
        header={constants.CREATE_LOGBOOK_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator visible={createLogbookApi.loading} />
      <Screen screenHeaderPresent scrollable>
        <Form
          initialValues={{
            name: '',
            category: null,
            description: '',
          }}
          values
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error={getCategoriesApi.error || createLogbookApi.error}
            visible={!!(getCategoriesApi.error || createLogbookApi.error)}
          />
          <FormField name="name" label="Name" autoCorrect={false} />
          <PickerFormField
            name="category"
            label="Category"
            placeholder="Select a category"
            options={categories}
            PickerItem={CategoryPickerItem}
            numberOfColumns={3}
          />
          <FormField
            name="description"
            label="Description"
            inputContainerStyle={styles.descriptionInputContainerStyle}
            multiline
            autoCorrect
          />
          <SubmitButton title="Create" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  descriptionInputContainerStyle: { minHeight: 100 },
});

export default CreateLogbookScreen;
