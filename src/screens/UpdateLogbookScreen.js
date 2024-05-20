import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import useApi from '../hooks/useApi';
import logbookApi from '../api/logbook';
import constants from '../config/constants';
import ScreenHeader from '../components/ScreenHeader';
import BackButton from '../components/BackButton';
import ActivityIndicator from '../components/ActivityIndicator';
import Screen from '../components/Screen';
import Form from '../components/forms/Form';
import ErrorMessage from '../components/forms/ErrorMessage';
import FormField from '../components/forms/FormField';
import PickerFormField from '../components/forms/PickerFormField';
import SubmitButton from '../components/forms/SubmitButton';
import categoryApi from '../api/category';
import CategoryPickerItem from '../components/CategoryPickerItem';
import { validationSchema } from './CreateLogbookScreen';
import storageService from '../utility/storageService';
import Icon from '../components/Icon';
import colors from '../config/colors';
import AppText from '../components/AppText';
import CustomModal from '../components/CustomModal';
import Button from '../components/Button';

function UpdateLogbookScreen({ navigation, route }) {
  const updateLogbookApi = useApi(logbookApi.update);
  const deleteLogbookApi = useApi(logbookApi.deleteLogbook);
  const { logbook: outdatedLogbook } = route.params;
  const [categories, setCategories] = useState([]);
  const getCategoriesApi = useApi(categoryApi.getAll);
  const [modalVisible, setModalVisible] = useState(false);

  const getCategoriesAsync = async () => {
    const { data, ok } = await getCategoriesApi.request();
    if (ok) setCategories(data);
  };

  useEffect(() => {
    getCategoriesAsync();
  }, []);

  const handleSubmit = async (logbookDetails) => {
    const logbook = {
      id: outdatedLogbook.id,
      categoryId: logbookDetails.category.id,
      description: logbookDetails.description,
      name: logbookDetails.name,
    };
    const { ok } = await updateLogbookApi.request(logbook);

    if (!ok) return;

    await storageService.clearCache();
    navigation.navigate(constants.LOGBOOK_SCREEN, {
      logbookId: logbook.id,
    });
  };

  const handleDeletePress = async () => {
    const { ok } = await deleteLogbookApi.request(outdatedLogbook.id);

    if (!ok) return;

    await storageService.clearCache();
    navigation.navigate(constants.LOGBOOKS_SCREEN);
  };

  return (
    <>
      <ScreenHeader
        header={constants.UPDATE_LOGBOOK_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator
        visible={
          updateLogbookApi.loading ||
          getCategoriesApi.loading ||
          deleteLogbookApi.loading
        }
      />
      <Screen scrollable>
        <Form
          initialValues={{
            name: outdatedLogbook.name,
            category: outdatedLogbook.category,
            description: outdatedLogbook.description,
          }}
          values
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error={
              getCategoriesApi.error ||
              updateLogbookApi.error ||
              deleteLogbookApi.error
            }
            visible={
              !!(
                getCategoriesApi.error ||
                updateLogbookApi.error ||
                deleteLogbookApi.error
              )
            }
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
            inputContainerStyle={styles.descriptionInputContainerStyle} // refactor
            multiline
            autoCorrect
          />
          <SubmitButton title="Save" />
        </Form>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => setModalVisible(true)}
        >
          <Icon color={colors.red} name="trash-outline" />
          <AppText style={{ marginLeft: 5, color: colors.red }}>Delete</AppText>
        </TouchableOpacity>
      </Screen>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <AppText style={styles.modalHeader}>
          Delete {outdatedLogbook.name}
        </AppText>
        <AppText>
          Deleting this Logbook is a permanent action, do you wish to continue?
        </AppText>
        <View style={styles.buttonContainer}>
          <Button onPress={() => setModalVisible(false)} style={styles.button}>
            No
          </Button>
          <Button
            onPress={handleDeletePress}
            style={styles.button}
            color={colors.red}
            outline
          >
            Yes
          </Button>
        </View>
      </CustomModal>
    </>
  );
}

const styles = StyleSheet.create({
  descriptionInputContainerStyle: { minHeight: 100 },
  delete: {
    marginTop: 30,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
  button: {
    width: '40%',
    height: 34,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default UpdateLogbookScreen;
