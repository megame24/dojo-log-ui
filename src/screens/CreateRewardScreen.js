import React from 'react';
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
import ImageUpload from '../components/ImageUpload';

export const validationSchema = Yup.object().shape({
  name: validationSchemaObject.name,
  description: Yup.string().max(500).label('Description'),
});

function CreateRewardScreen({ navigation }) {
  const createRewardApi = useApi(rewardApi.create);

  const handleSubmit = async (rewardDetails) => {
    const logbook = {
      name: rewardDetails.name,
      description: rewardDetails.description,
    };
    const { ok } = await createRewardApi.request(logbook);

    if (!ok) return;

    navigation.navigate(constants.REWARDS_SCREEN);
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
          <ImageUpload />
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
