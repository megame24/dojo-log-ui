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
import dateService from '../utility/dateService';
import EmptyStateView from '../components/EmptyStateView';
import EmptyRewardOptionsSvg from '../assets/empty-reward-options.svg';
import CreateRewardsPrompt from '../components/CreateRewardsPrompt';
import { useIsFocused } from '@react-navigation/native';
import SuccessToast from '../components/SuccessToast';

// TODO: move all validations into the validationSchemaObject!!

export const validationSchema = Yup.object().shape({
  name: validationSchemaObject.name,
  dueDate: Yup.date()
    .required()
    .label('Due date')
    .typeError('Due date is a required field'),
  achievementCriteria: Yup.string().max(500).label('Achievement criteria'),
});

export const emptyRewardViewText = [
  'You currently have no rewards.',
  'Create your personalized rewards to link with your goals.',
];

function CreateGoalScreen({ route, navigation }) {
  const [rewards, setRewards] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const getRewardsApi = useApi(rewardApi.getRewards);
  const createGoalApi = useApi(logbookApi.createGoal);
  const isFocused = useIsFocused();

  const [showCreateRewardsPrompt, setShowCreateRewardsPrompt] = useState(false);

  const { logbookId } = route.params;

  const getRewardsAsync = async () => {
    const { data, ok } = await getRewardsApi.request();
    if (ok) {
      setRewards(data);
      setShowCreateRewardsPrompt(data.length === 0);
    }
  };

  const handleSubmit = async (goalDetails) => {
    const goal = {
      name: goalDetails.name,
      achievementCriteria: goalDetails.achievementCriteria,
      dueDate: dateService.getEndOfDay(goalDetails.dueDate), // NOTE: set to end of day for easy comparison
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
    setToastVisible(true);
  };

  const handleRedirect = () => {
    navigation.navigate(constants.LOGBOOK_SCREEN, { logbookId });
  };

  useEffect(() => {
    getRewardsAsync();
  }, [isFocused]);

  return (
    <>
      <ScreenHeader
        header="Set a goal"
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator
        visible={createGoalApi.loading || getRewardsApi.loading}
      />
      <Screen scrollable>
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
          <FormField
            placeholder="Name your goal"
            name="name"
            label="Name"
            autoCorrect
          />
          <DatePickerFormField
            name="dueDate"
            label="Due date"
            placeholder="Pick a due date"
          />
          <FormField
            name="achievementCriteria"
            label="Achievement criteria"
            placeholder="What needs to be done for this goal to be achieved? (optional)"
            inputContainerStyle={styles.descriptionInputContainerStyle}
            multiline
            autoCorrect
          />
          <MultiPickerFormField
            name="rewards"
            label="Reward(s)"
            placeholder="Choose associated rewards"
            options={rewards}
            PickerItem={RewardPickerItem}
            numberOfColumns={3}
            EmptyState={() => (
              <EmptyStateView
                EmptyStateSvg={EmptyRewardOptionsSvg}
                emptyStateTexts={emptyRewardViewText}
              />
            )}
          />
          <SubmitButton disabled={toastVisible} title="Set goal" />
        </Form>
        <SuccessToast
          message="Goal created successfully"
          visible={toastVisible}
          onClose={() => {
            setToastVisible(false);
            handleRedirect();
          }}
        />
      </Screen>
      <CreateRewardsPrompt
        showCreateRewardsPrompt={showCreateRewardsPrompt}
        setShowCreateRewardsPrompt={setShowCreateRewardsPrompt}
        navigation={navigation}
        logbookId={logbookId}
      />
    </>
  );
}

const styles = StyleSheet.create({
  descriptionInputContainerStyle: { minHeight: 100 },
});

export default CreateGoalScreen;
