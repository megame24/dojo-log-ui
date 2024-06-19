import { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import SuccessToast from '../components/SuccessToast';
import DurationOfWorkFormField from '../components/forms/DurationOfWorkFormField';
import Form from '../components/forms/Form';
import FormField from '../components/forms/FormField';
import SubmitButton from '../components/forms/SubmitButton';
import constants from '../config/constants';
import { validationSchema } from './CreateLogScreen';
import { useIsFocused } from '@react-navigation/native';
import storageService from '../utility/storageService';
import ActivityIndicator from '../components/ActivityIndicator';
import { StyleSheet, View } from 'react-native';
import FormSubHeader from '../components/forms/FormSubHeader';

const ConfigureLogbookScreen = ({ route, navigation }) => {
  const { logbookId } = route.params;
  const [initialMessage, setInitialMessage] = useState('');
  const [initialDurationOfWork, setInitialDurationOfWork] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const isFocused = useIsFocused();

  const handleSubmit = async (logDetails) => {
    const { message, durationOfWork } = logDetails;
    await storageService.storeItem({
      key: `${constants.QUICK_LOG_DATA}${logbookId}`,
      value: JSON.stringify({ message, durationOfWork }),
    });

    setToastVisible(true);
  };

  const setInitialQuickLogValues = async () => {
    let quickLogDataJSON;
    quickLogDataJSON = await storageService.getItem(
      `${constants.QUICK_LOG_DATA}${logbookId}`
    );
    if (!quickLogDataJSON) {
      quickLogDataJSON = await storageService.getItem(constants.QUICK_LOG_DATA);
    }
    const quickLogData = JSON.parse(quickLogDataJSON);
    setInitialMessage(quickLogData.message);
    setInitialDurationOfWork(quickLogData.durationOfWork);
    setReady(true);
  };

  useEffect(() => {
    if (isFocused) {
      setInitialQuickLogValues();
    }
  }, [isFocused]);

  return (
    <>
      <ScreenHeader
        header={constants.LOGBOOK_PREFERENCES_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator visible={!ready} />
      {ready && (
        <Screen scrollable>
          <Form
            initialValues={{
              message: initialMessage,
              hours: Math.floor(initialDurationOfWork / 60) + '',
              minutes: (initialDurationOfWork % 60) + '',
              durationOfWork: initialDurationOfWork,
            }}
            values
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <FormSubHeader style={styles.formSubHeader}>
              Quick log
            </FormSubHeader>
            <FormField
              name="message"
              placeholder="Note progress or work done"
              label="Quick progress log message"
              autoCorrect
            />
            <DurationOfWorkFormField label="Quick progress log duration of work" />

            <FormSubHeader style={styles.formSubHeader}>
              Logbook notifications
            </FormSubHeader>
            <FormField
              name="title"
              placeholder="Title"
              label="Notification title"
              autoCorrect
            />
            <FormField
              name="body"
              placeholder="Message"
              label="Notification message"
              autoCorrect
            />

            <SubmitButton disabled={toastVisible} title="Save preferences" />
          </Form>
          <SuccessToast
            message="Preferences saved successfully"
            visible={toastVisible}
            onClose={() => {
              setToastVisible(false);
              navigation.goBack();
            }}
          />
        </Screen>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  formSubHeader: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ConfigureLogbookScreen;
