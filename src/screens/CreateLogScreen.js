import React, { useState } from 'react';
import * as Yup from 'yup';

import ActivityIndicator from '../components/ActivityIndicator';
import BackButton from '../components/BackButton';
import Form from '../components/forms/Form';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import constants from '../config/constants';
import ErrorMessage from '../components/forms/ErrorMessage';
import FormField from '../components/forms/FormField';
import SubmitButton from '../components/forms/SubmitButton';
import DurationOfWorkFormField from '../components/forms/DurationOfWorkFormField';
import logbookApi from '../api/logbook';
import useApi from '../hooks/useApi';
import ProofOfWorkFormField from '../components/forms/ProofOfWorkFormField';
import storageService from '../utility/storageService';

const validationSchema = Yup.object().shape({
  message: Yup.string().max(500).required().label('Message'),
  durationOfWork: Yup.string()
    .required()
    .test(
      'validDurationOfWork',
      'Invalid duration of work, must be in format "(0 - 23)h (0 - 59)m", e.g: 3h 55m',
      (value) => {
        return /^(2[0-3][h]|[0-1]?[0-9][h])$|^((([0]?|[1-5]{1})[0-9])[m])$|^((2[0-3][h]|[0-1]?[0-9][h])\s((([0]?|[1-5]{1})[0-9])[m]))$/.test(
          value
        );
      }
    )
    .label('Duration of work'),
});

function CreateLogScreen({ route, navigation }) {
  const [file, setFile] = useState(null);
  const createLogApi = useApi(logbookApi.createLog);

  const { logbookId } = route.params;

  const handleSubmit = async (logDetails) => {
    const logFormData = new FormData();
    logFormData.append('message', logDetails.message);
    logFormData.append('durationOfWork', logDetails.durationOfWork);
    if (file)
      logFormData.append(
        'file',
        {
          uri: file.uri,
          name: file.name,
          type: file.mimeType,
        },
        file.name
      );

    const { ok } = await createLogApi.request(logbookId, logFormData);

    if (!ok) return;
    await storageService.multiRemove([
      constants.LOGBOOKS_DATA_CACHE,
      `${
        constants.LOGBOOK_DATA_CACHE
      }_${logbookId}_${new Date().getFullYear()}`,
    ]);
    navigation.navigate(constants.LOGBOOK_SCREEN, { logbookId });
  };

  const deleteFile = () => {
    setFile(null);
  };

  return (
    <>
      <ScreenHeader
        header={constants.CREATE_LOG_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator visible={createLogApi.loading} />
      <Screen screenHeaderPresent scrollable>
        <Form
          initialValues={{
            message: '',
            hours: '',
            minutes: '',
            durationOfWork: '',
          }}
          values
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error={createLogApi.error}
            visible={!!createLogApi.error}
          />
          <FormField name="message" label="Message" autoCorrect />
          <DurationOfWorkFormField />
          <ProofOfWorkFormField
            file={file}
            setFile={setFile}
            deleteFile={deleteFile}
          />
          <SubmitButton title="Create" />
        </Form>
      </Screen>
    </>
  );
}

export default CreateLogScreen;
