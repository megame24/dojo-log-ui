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
import dateService from '../utility/dateService';
import SuccessToast from '../components/SuccessToast';

export const validationSchema = Yup.object().shape({
  message: Yup.string().max(500).required().label('Message'),
  durationOfWork: Yup.number()
    .min(1, 'Duration of work must be greater than or equal to 1 minute')
    .required()
    .label('Duration of work'),
});

function CreateLogScreen({ route, navigation }) {
  const [file, setFile] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  const createLogApi = useApi(logbookApi.createLog);

  const { logbookId } = route.params;

  const handleSubmit = async (logDetails) => {
    const logFormData = new FormData();
    logFormData.append('message', logDetails.message);
    logFormData.append('durationOfWorkInMinutes', logDetails.durationOfWork);
    logFormData.append('date', dateService.now());
    if (file)
      logFormData.append(
        'file',
        {
          uri: file.uri,
          name: file.fileName,
          type: `image/${file.mimeType}`,
        },
        file.fileName
      );

    const { ok } = await createLogApi.request(logbookId, logFormData);

    if (!ok) return;
    await storageService.multiRemove([
      constants.LOGBOOKS_DATA_CACHE,
      `${
        constants.LOGBOOK_DATA_CACHE
      }_${logbookId}_${new Date().getFullYear()}`,
    ]);

    setToastVisible(true);
  };

  const handleRedirect = async () => {
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
      <Screen scrollable>
        <Form
          initialValues={{
            message: '',
            hours: null,
            minutes: null,
            durationOfWork: 0,
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
          <SubmitButton disabled={toastVisible} title="Create" />
        </Form>
        <SuccessToast
          message="Progress logged successfully"
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

export default CreateLogScreen;
