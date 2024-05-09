import React, { useState } from 'react';
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
import rewardApi from '../api/reward';
import ImageUploadFormField from '../components/forms/ImageUploadFormField';
import storageService from '../utility/storageService';

export const validationSchema = Yup.object().shape({
  name: validationSchemaObject.name,
  description: Yup.string().max(500).label('Description'),
});

function CreateRewardScreen({ navigation }) {
  const [imageData, setImageData] = useState(null);
  const createRewardApi = useApi(rewardApi.create);

  const handleSubmit = async (rewardDetails) => {
    const rewardFormData = new FormData();
    rewardFormData.append('name', rewardDetails.name);
    rewardFormData.append('description', rewardDetails.description);
    if (imageData) {
      rewardFormData.append(
        'image',
        {
          uri: imageData.uri,
          name: imageData.fileName,
          type: `image/${imageData.mimeType}`,
        },
        imageData.filename
      );
    }

    const { ok } = await createRewardApi.request(rewardFormData);

    if (!ok) return;
    storageService.removeItem(constants.REWARDS_DATA_CACHE);

    navigation.navigate(constants.REWARDS_SCREEN);
  };

  const deleteImage = () => {
    setImageData(null);
  };

  return (
    <>
      <ScreenHeader
        header={constants.CREATE_REWARD_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator visible={createRewardApi.loading} />
      <Screen screenHeaderPresent scrollable>
        <Form
          initialValues={{
            name: '',
            description: '',
          }}
          values
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error={createRewardApi.error}
            visible={!!createRewardApi.error}
          />
          <FormField name="name" label="Name" autoCorrect={false} />
          <FormField
            name="description"
            label="Description"
            inputContainerStyle={styles.descriptionInputContainerStyle}
            multiline
            autoCorrect
          />
          <ImageUploadFormField
            imageData={imageData}
            setImageData={setImageData}
            deleteImage={deleteImage}
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

export default CreateRewardScreen;
