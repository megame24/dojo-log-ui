import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
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
import useApi from '../hooks/useApi';

function UpdateLogScreen({ route, navigation }) {
  const { log: outdatedLog } = route.params;
  const { durationOfWorkInMinutes } = outdatedLog;
  const defaultHours = Math.floor(durationOfWorkInMinutes / 60);
  const defaultMinutes = durationOfWorkInMinutes % 60;

  console.log(hours, minutes);

  const [file, setFile] = useState(null);
  const [hours] = useState(defaultHours);
  const [minutes] = useState(defaultMinutes);
  const updateLogApi = useApi(logbookApi.updateLog);

  useEffect(() => {}, []);

  const handleSubmit = () => {};

  const deleteFile = () => {
    setFile(null);
    // make call to delete on api
  };

  return (
    <>
      <ScreenHeader
        header={constants.UPDATE_LOG_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator visible={updateLogApi.loading} />
      <Screen screenHeaderPresent scrollable>
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
            error={updateLogApi.error}
            visible={!!updateLogApi.error}
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

const styles = StyleSheet.create({
  container: {},
});

export default UpdateLogScreen;
