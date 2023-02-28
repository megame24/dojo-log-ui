import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { StyleSheet } from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator';
import BackButton from '../components/BackButton';
import ErrorMessage from '../components/forms/ErrorMessage';
import Form from '../components/forms/Form';
import SubmitButton from '../components/forms/SubmitButton';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import constants from '../config/constants';
import validationSchemaObject from '../config/validationSchemaObject';
import FormField from '../components/forms/FormField';
import DatePickerFormField from '../components/forms/DatePickerFormField';
import useApi from '../hooks/useApi';
import rewardApi from '../api/reward';
import logbookApi from '../api/logbook';
import MultiPickerFormField from '../components/forms/MultiPickerFormField';
import RewardPickerItem from '../components/RewardPickerItem';
import storageService from '../utility/storageService';

const validationSchema = Yup.object().shape({
  name: validationSchemaObject.name,
  dueDate: Yup.date()
    .required()
    .label('Due date')
    .typeError('Due date is a required field'),
  achievementCriteria: Yup.string().max(500).label('Achievement criteria'),
});

function CreateGoalScreen({ route, navigation }) {
  const [rewards, setRewards] = useState([]);
  const getRewardsApi = useApi(rewardApi.getRewards);
  const createGoalApi = useApi(logbookApi.createGoal);

  const { logbookId } = route.params;

  const getRewardsAsync = async () => {
    const { data, ok } = await getRewardsApi.request();
    if (ok) setRewards(data);
  };

  const handleSubmit = async (goalDetails) => {
    const goal = {
      name: goalDetails.name,
      achievementCriteria: goalDetails.achievementCriteria,
      dueDate: goalDetails.dueDate,
      rewards: JSON.stringify(goalDetails?.rewards?.value),
    };
    const { ok } = await createGoalApi.request(logbookId, goal);

    if (!ok) return;
    await storageService.multiRemove([
      constants.LOGBOOKS_DATA_CACHE,
      `${
        constants.LOGBOOK_DATA_CACHE
      }_${logbookId}_${new Date().getFullYear()}`,
    ]);
    navigation.navigate(constants.LOGBOOK_SCREEN, { logbookId });
  };

  useEffect(() => {
    getRewardsAsync();
  }, []);

  return (
    <>
      <ScreenHeader
        header={constants.CREATE_GOAL_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator
        visible={createGoalApi.loading || getRewardsApi.loading}
      />
      <Screen screenHeaderPresent scrollable>
        <Form
          initialValues={{
            name: '',
            dueDate: null,
            achievementCriteria: '',
            rewards: {
              label: '',
              value: [],
            },
          }}
          values
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error={createGoalApi.error || getRewardsApi.error}
            visible={!!(createGoalApi.error || getRewardsApi.error)}
          />
          <FormField name="name" label="Name" autoCorrect />
          <DatePickerFormField
            name="dueDate"
            label="Due date"
            placeholder="Select a date"
          />
          <FormField
            name="achievementCriteria"
            label="Achievement criteria"
            inputContainerStyle={styles.descriptionInputContainerStyle}
            multiline
            autoCorrect
          />
          <MultiPickerFormField
            name="rewards"
            label="Reward(s)"
            placeholder="Select rewards"
            options={rewards}
            PickerItem={RewardPickerItem}
            numberOfColumns={3}
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

export default CreateGoalScreen;
