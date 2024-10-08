import React, { useState } from 'react';
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
import SuccessToast from '../components/SuccessToast';

export const validationSchema = Yup.object().shape({
  name: validationSchemaObject.name,
  description: Yup.string().max(500).label('Description'),
});

function CreateRewardScreen({ navigation, route }) {
  const { redirectOption } = route.params;
  const [imageData, setImageData] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
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
    setToastVisible(true);
  };

  const handleRedirect = () => {
    let redirectScreen = constants.REWARDS_SCREEN;
    let params = {};
    if (redirectOption) {
      redirectScreen = redirectOption.screen;
      params = redirectOption.params;
    }

    navigation.navigate(redirectScreen, params);
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
      <Screen scrollable>
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
          <FormField
            placeholder="Name your reward"
            name="name"
            label="Name"
            autoCorrect={false}
          />
          <FormField
            name="description"
            label="Description"
            placeholder="Describe the reward, like what it includes (optional)"
            textArea
            autoCorrect
          />
          <ImageUploadFormField
            imageData={imageData}
            setImageData={setImageData}
            deleteImage={deleteImage}
          />
          <SubmitButton disabled={toastVisible} title="Create" />
        </Form>
        <SuccessToast
          message="Reward created successfully"
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

export default CreateRewardScreen;
