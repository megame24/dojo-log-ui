import React, { useEffect, useState } from 'react';
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
import storageService from '../utility/storageService';
import SuccessToast from '../components/SuccessToast';
import DropdownFormField from '../components/forms/DropdownFormField';

export const validationSchema = Yup.object().shape({
  name: validationSchemaObject.name,
  category: Yup.object().required().nullable().label('Category'),
  description: Yup.string().max(500).label('Description'),
});

function CreateLogbookScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [logbookId, setLogbookId] = useState(null);
  const getCategoriesApi = useApi(categoryApi.getAll);
  const createLogbookApi = useApi(logbookApi.create);

  const defaultEnableReminderOption = {
    label: 'Yes',
    value: true,
  };

  const getCategoriesAsync = async () => {
    const { data, ok } = await getCategoriesApi.request();
    if (ok) setCategories(data);
  };

  useEffect(() => {
    getCategoriesAsync();
  }, []);

  const handleSubmit = async (logbookDetails) => {
    const logbook = {
      name: logbookDetails.name,
      categoryId: logbookDetails.category.id,
      visibility: constants.VISIBILITY_PRIVATE, // default to private for now
      description: logbookDetails.description,
      enableReminder: logbookDetails.enableReminder.value,
    };
    const { ok, data } = await createLogbookApi.request(logbook);

    if (!ok) return;

    setLogbookId(data.logbookId);
    setToastVisible(true);
  };

  const handleRedirect = () => {
    storageService.removeItem(constants.LOGBOOKS_DATA_CACHE);
    navigation.navigate(constants.LOGBOOK_SCREEN, { logbookId });
  };

  return (
    <>
      <ScreenHeader
        header={constants.CREATE_LOGBOOK_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator
        visible={createLogbookApi.loading || getCategoriesApi.loading}
      />
      <Screen scrollable>
        <Form
          initialValues={{
            name: '',
            category: null,
            description: '',
            enableReminder: defaultEnableReminderOption,
          }}
          values
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error={getCategoriesApi.error || createLogbookApi.error}
            visible={!!(getCategoriesApi.error || createLogbookApi.error)}
          />
          <FormField
            placeholder="Name your logbook"
            name="name"
            label="Name"
            autoCorrect={false}
          />
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
            placeholder="Add details or inspiration here (optional)"
            textArea
            autoCorrect
          />
          <DropdownFormField
            name="enableReminder"
            label="Get daily reminders"
            placeholder="Enable daily reminders"
            options={[
              defaultEnableReminderOption,
              { label: 'No', value: false },
            ]}
          />
          <SubmitButton disabled={toastVisible} title="Create" />
        </Form>
        <SuccessToast
          message="Logbook created successfully"
          visible={toastVisible}
          onClose={() => {
            setToastVisible(false);
            handleRedirect();
          }}
        />
      </Screen>
    </>
  );
}

export default CreateLogbookScreen;
