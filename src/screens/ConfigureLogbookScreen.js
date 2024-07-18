import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import BackButton from '../components/BackButton';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import SuccessToast from '../components/SuccessToast';
import DurationOfWorkFormField from '../components/forms/DurationOfWorkFormField';
import Form from '../components/forms/Form';
import FormField from '../components/forms/FormField';
import SubmitButton from '../components/forms/SubmitButton';
import constants from '../config/constants';
import { useIsFocused } from '@react-navigation/native';
import storageService from '../utility/storageService';
import ActivityIndicator from '../components/ActivityIndicator';
import { StyleSheet, View } from 'react-native';
import FormSubHeader from '../components/forms/FormSubHeader';
import useApi from '../hooks/useApi';
import logbookApi from '../api/logbook';
import MultiPickerFormField from '../components/forms/MultiPickerFormField';
import LogbookNotificationDaysPickerItem from '../components/LogbookNotificationDaysPickerItem';
import DropdownFormField from '../components/forms/DropdownFormField';
import ErrorMessage from '../components/forms/ErrorMessage';

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(2).label('Quick log message'),
  durationOfWork: Yup.number()
    .min(1, 'Duration of work must be greater than or equal to 1 minute')
    .required()
    .label('Quick log duration of work'),
  notificationTitle: Yup.string()
    .required()
    .min(2)
    .max(255)
    .label('Reminder title'),
  notificationBody: Yup.string().required().min(2).label('Reminder message'),
  notificationDays: Yup.object().required().nullable().label('Reminder day(s)'),
  notificationHour: Yup.object().required().nullable().label('Reminder hour'),
});

const validationSchemaWithoutReminder = Yup.object().shape({
  message: Yup.string().required().min(2).label('Quick log message'),
  durationOfWork: Yup.number()
    .min(1, 'Duration of work must be greater than or equal to 1 minute')
    .required()
    .label('Quick log duration of work'),
});

const ConfigureLogbookScreen = ({ route, navigation }) => {
  const { logbookId } = route.params;
  const [initialMessage, setInitialMessage] = useState('');
  const [initialDurationOfWork, setInitialDurationOfWork] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [logbookNotification, setLogbookNotification] = useState({});
  const isFocused = useIsFocused();
  const getLogbookNotificationApi = useApi(logbookApi.getLogbookNotification);
  const saveLogbookNotificationApi = useApi(
    logbookApi.saveLogbookNotifications
  );
  const deleteLogbookNotificationsApi = useApi(
    logbookApi.deleteLogbookNotifications
  );
  const [defaultLogbookNotificationHour, setDefaultLogbookNotificationHour] =
    useState(16);

  const defaultEnableReminderOption = {
    label: 'Yes',
    value: true,
  };
  const disableReminderOption = {
    label: 'No',
    value: false,
  };
  const [enableReminderValue, setEnableReminderValue] = useState(
    defaultEnableReminderOption
  );

  const handleSaveLogbookNotification = async (body, days, hour, title) => {
    const formattedDays = {};
    days.forEach((day) => {
      formattedDays[day.id] = {
        label: day.label,
        id: day.id,
      };
    });

    const date = new Date();
    date.setHours(hour, 0, 0, 0);
    const utcHour = date.getUTCHours();

    const notifications = [
      {
        id: logbookNotification.id,
        logbookId,
        body,
        title,
        days: formattedDays,
        hour: utcHour,
      },
    ];

    const { ok } = await saveLogbookNotificationApi.request(
      logbookId,
      notifications
    );

    if (!ok) return;

    setToastVisible(true);
  };

  const handleSubmit = async (data) => {
    const {
      message,
      durationOfWork,
      notificationBody,
      notificationDays,
      notificationHour,
      notificationTitle,
    } = data;
    await storageService.storeItem({
      key: `${constants.QUICK_LOG_DATA}${logbookId}`,
      value: JSON.stringify({ message, durationOfWork }),
    });

    if (!enableReminderValue.value) {
      const { ok } = await deleteLogbookNotificationsApi.request(logbookId);
      if (!ok) return;

      setToastVisible(true);
      return;
    }
    await handleSaveLogbookNotification(
      notificationBody,
      notificationDays.value,
      notificationHour.value,
      notificationTitle
    );
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
  };

  const formatLogbookNotificationDays = (selectedDaysObj) => {
    const formattedDays = JSON.parse(
      JSON.stringify(constants.LOGBOOK_NOTIFICATION_DAYS_MULTISELECT_OPTIONS)
    );

    if (!selectedDaysObj) return { defaultValue: { value: [] }, formattedDays };
    const selectedDays = Object.values(selectedDaysObj);

    const defaultValue = {
      label: '',
      value: selectedDays,
    };

    const selectedDaysIdMap = {};

    selectedDays.forEach((selectedDay, i) => {
      selectedDaysIdMap[selectedDay.id] = true;
      defaultValue.label += selectedDay.label;
      if (i !== selectedDays.length - 1) defaultValue.label += ', ';
    });

    formattedDays.forEach((day) => {
      if (selectedDaysIdMap[day.id]) day.isSelected = true;
    });

    return {
      defaultValue,
      formattedDays,
    };
  };

  const getLogbookNotificationAsync = async () => {
    const { data, ok } = await getLogbookNotificationApi.request(logbookId);

    if (!ok) {
      setEnableReminderValue(disableReminderOption);
      setReady(true);
      return;
    }

    setLogbookNotification(data);

    const date = new Date();
    date.setUTCHours(data.hour, 0, 0, 0);
    const localHour = date.getHours();
    setDefaultLogbookNotificationHour(localHour);

    setReady(true);
  };

  useEffect(() => {
    if (isFocused) {
      setInitialQuickLogValues();
      getLogbookNotificationAsync();
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
              notificationTitle: logbookNotification.title,
              notificationBody: logbookNotification.body,
              notificationDays: enableReminderValue.value
                ? formatLogbookNotificationDays(logbookNotification.days)
                    .defaultValue
                : null,
              notificationHour: {
                label:
                  constants.HOURS_VALUE_TO_LABEL_MAP[
                    defaultLogbookNotificationHour
                  ],
                value: defaultLogbookNotificationHour,
              },
              enableReminder: enableReminderValue,
            }}
            values
            onSubmit={handleSubmit}
            validationSchema={
              enableReminderValue.value
                ? validationSchema
                : validationSchemaWithoutReminder
            }
          >
            <ErrorMessage
              error={
                saveLogbookNotificationApi.error ||
                deleteLogbookNotificationsApi.error
              }
              visible={
                !!(
                  saveLogbookNotificationApi.error ||
                  deleteLogbookNotificationsApi.error
                )
              }
            />
            <FormSubHeader style={styles.formSubHeader}>
              Logbook reminder
            </FormSubHeader>
            <DropdownFormField
              name="enableReminder"
              label="Get daily reminders"
              placeholder="Enable daily reminders"
              onItemChange={(item) => setEnableReminderValue(item)}
              options={[defaultEnableReminderOption, disableReminderOption]}
            />
            {enableReminderValue.value ? (
              <>
                <FormField
                  name="notificationTitle"
                  placeholder="Reminder title"
                  label="Reminder title"
                  autoCorrect
                />
                <FormField
                  name="notificationBody"
                  placeholder="Reminder message"
                  label="Reminder message"
                  autoCorrect
                  textArea
                />
                <MultiPickerFormField
                  name="notificationDays"
                  label="Reminder day(s)"
                  placeholder="Select days"
                  pickerItemLabelName="label"
                  maxSelection="7"
                  options={
                    formatLogbookNotificationDays(logbookNotification.days)
                      .formattedDays
                  }
                  PickerItem={LogbookNotificationDaysPickerItem}
                  numberOfColumns={3}
                />
                <DropdownFormField
                  name="notificationHour"
                  label="Reminder hour"
                  placeholder="Select hour"
                  options={[
                    { label: 'Midnight (12 AM)', value: 0 },
                    { label: '1 AM', value: 1 },
                    { label: '2 AM', value: 2 },
                    { label: '3 AM', value: 3 },
                    { label: '4 AM', value: 4 },
                    { label: '5 AM', value: 5 },
                    { label: '6 AM', value: 6 },
                    { label: '7 AM', value: 7 },
                    { label: '8 AM', value: 8 },
                    { label: '9 AM', value: 9 },
                    { label: '10 AM', value: 10 },
                    { label: '11 AM', value: 11 },
                    { label: 'Noon (12 PM)', value: 12 },
                    { label: '1 PM', value: 13 },
                    { label: '2 PM', value: 14 },
                    { label: '3 PM', value: 15 },
                    { label: '4 PM', value: 16 },
                    { label: '5 PM', value: 17 },
                    { label: '6 PM', value: 18 },
                    { label: '7 PM', value: 19 },
                    { label: '8 PM', value: 20 },
                    { label: '9 PM', value: 21 },
                    { label: '10 PM', value: 22 },
                    { label: '11 PM', value: 23 },
                  ]}
                />
              </>
            ) : null}

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
