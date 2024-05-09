import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import ActivityIndicator from '../components/ActivityIndicator';
import BackButton from '../components/BackButton';
import ErrorMessage from '../components/forms/ErrorMessage';
import Form from '../components/forms/Form';
import FormField from '../components/forms/FormField';
import ImageUploadFormField from '../components/forms/ImageUploadFormField';
import SubmitButton from '../components/forms/SubmitButton';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import constants from '../config/constants';
import useApi from '../hooks/useApi';
import rewardApi from '../api/reward';
import fileApi from '../api/file';
import { validationSchema } from './CreateRewardScreen';
import storageService from '../utility/storageService';

function UpdateRewardScreen({ navigation, route }) {
  const { reward: outdatedReward } = route.params;
  let defaultImageData = null;
  if (outdatedReward.image) {
    defaultImageData = {
      uri: outdatedReward.image.url,
      fileName: outdatedReward.image.name,
    };
  }
  const [imageData, setImageData] = useState(defaultImageData);
  const [imageWasDeleted, setImageWasDeleted] = useState(false);
  const updateRewardApi = useApi(rewardApi.update);
  const deleteFileApi = useApi(fileApi.deleteFile);

  const handleSubmit = async (rewardDetails) => {
    const rewardFormData = new FormData();
    rewardFormData.append('name', rewardDetails.name);
    rewardFormData.append('description', rewardDetails.description);
    if (
      imageData &&
      (imageData.fileName !== defaultImageData?.fileName || imageWasDeleted)
    ) {
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

    const { ok } = await updateRewardApi.request(
      rewardFormData,
      outdatedReward.id
    );

    if (!ok) return;
    storageService.removeItem(constants.REWARDS_DATA_CACHE);

    navigation.navigate(constants.REWARDS_SCREEN);
  };

  const deleteImage = async () => {
    setImageData(null);
    setImageWasDeleted(true);

    if (outdatedReward.image) {
      await deleteFileApi.request(outdatedReward.image.id);
    }
  };

  return (
    <>
      <ScreenHeader
        header={constants.UPDATE_REWARD_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator
        visible={updateRewardApi.loading || deleteFileApi.loading}
      />
      <Screen screenHeaderPresent scrollable>
        <Form
          initialValues={{
            name: outdatedReward.name,
            description: outdatedReward.description,
          }}
          values
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error={updateRewardApi.error || deleteFileApi.error}
            visible={!!(updateRewardApi.error || deleteFileApi.error)}
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
          <SubmitButton title="Update" />
        </Form>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  descriptionInputContainerStyle: { minHeight: 100 },
});

export default UpdateRewardScreen;
