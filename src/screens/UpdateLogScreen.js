import React, { useState } from 'react';
import ActivityIndicator from '../components/ActivityIndicator';
import BackButton from '../components/BackButton';
import DurationOfWorkFormField from '../components/forms/DurationOfWorkFormField';
import ErrorMessage from '../components/forms/ErrorMessage';
import Form from '../components/forms/Form';
import FormField from '../components/forms/FormField';
import ProofOfWorkFormField from '../components/forms/ProofOfWorkFormField';
import SubmitButton from '../components/forms/SubmitButton';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import constants from '../config/constants';
import { validationSchema } from './CreateLogScreen';
import logbookApi from '../api/logbook';
import fileApi from '../api/file';
import useApi from '../hooks/useApi';
import storageService from '../utility/storageService';

function UpdateLogScreen({ route, navigation }) {
  const { log: outdatedLog } = route.params;
  const { durationOfWorkInMinutes } = outdatedLog;
  const defaultFile = outdatedLog.proofOfWork || null;

  const [file, setFile] = useState(defaultFile);
  const updateLogApi = useApi(logbookApi.updateLog);
  const deleteFileApi = useApi(fileApi.deleteFile);

  const handleSubmit = async (logDetails) => {
    const logFormData = new FormData();
    const logbookId = outdatedLog.logbookId;
    const logId = outdatedLog.id;
    logFormData.append('message', logDetails.message);
    logFormData.append('durationOfWorkInMinutes', logDetails.durationOfWork);
    if (file && !file.id)
      logFormData.append(
        'file',
        {
          uri: file.uri,
          name: file.fileName,
          type: `image/${file.mimeType}`,
        },
        file.name
      );

    const { ok } = await updateLogApi.request(logbookId, logId, logFormData);

    if (!ok) return;
    await storageService.multiRemove([
      constants.LOGBOOKS_DATA_CACHE,
      `${
        constants.LOGBOOK_DATA_CACHE
      }_${logbookId}_${new Date().getFullYear()}`,
    ]);
    navigation.goBack();
  };

  const deleteFile = async () => {
    setFile(null);
    if (file.id) await deleteFileApi.request(file.id);
  };

  return (
    <>
      <ScreenHeader
        header={constants.UPDATE_LOG_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator
        visible={updateLogApi.loading || deleteFileApi.loading}
      />
      <Screen scrollable>
        <Form
          initialValues={{
            message: outdatedLog.message,
            hours: Math.floor(durationOfWorkInMinutes / 60) + '',
            minutes: (durationOfWorkInMinutes % 60) + '',
            durationOfWork: durationOfWorkInMinutes,
          }}
          values
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error={updateLogApi.error || deleteFileApi.error}
            visible={!!(updateLogApi.error || deleteFileApi.error)}
          />
          <FormField name="message" label="Message" autoCorrect />
          <DurationOfWorkFormField />
          <ProofOfWorkFormField
            file={file}
            setFile={setFile}
            deleteFile={deleteFile}
          />
          <SubmitButton title="Save" />
        </Form>
      </Screen>
    </>
  );
}

export default UpdateLogScreen;
