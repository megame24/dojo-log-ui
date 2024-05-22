import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import constants from '../config/constants';
import BackButton from '../components/BackButton';
import ActivityIndicator from '../components/ActivityIndicator';
import Screen from '../components/Screen';
import Form from '../components/forms/Form';
import ErrorMessage from '../components/forms/ErrorMessage';
import FormField from '../components/forms/FormField';
import DatePickerFormField from '../components/forms/DatePickerFormField';
import MultiPickerFormField from '../components/forms/MultiPickerFormField';
import SubmitButton from '../components/forms/SubmitButton';
import useApi from '../hooks/useApi';
import rewardApi from '../api/reward';
import logbookApi from '../api/logbook';
import RewardPickerItem from '../components/RewardPickerItem';
import { emptyRewardViewText, validationSchema } from './CreateGoalScreen';
import DropdownFormField from '../components/forms/DropdownFormField';
import storageService from '../utility/storageService';
import EmptyStateView from '../components/EmptyStateView';
import EmptyRewardOptionsSvg from '../assets/empty-reward-options.svg';
import SuccessToast from '../components/SuccessToast';

function UpdateGoalScreen({ route, navigation }) {
  const { goal: outdatedGoal } = route.params;
  const [rewards, setRewards] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [goalAchieved, setGoalAchieved] = useState(false);
  const getRewardsApi = useApi(rewardApi.getRewards);
  const updateGoalApi = useApi(logbookApi.updateGoal);

  const formatRewardsAndRewardsDefaultValue = (selectedRewards, rewards) => {
    const formattedRewards = rewards;

    const defaultValue = {
      label: '',
      value: selectedRewards,
    };

    const selectedRewardIdMap = {};

    selectedRewards.forEach((selectedReward, i) => {
      selectedRewardIdMap[selectedReward.id] = true;
      defaultValue.label += selectedReward.name;
      if (i !== selectedRewards.length - 1) defaultValue.label += ', ';
    });

    formattedRewards.forEach((reward) => {
      if (selectedRewardIdMap[reward.id]) reward.isSelected = true;
    });

    return {
      defaultValue,
      formattedRewards,
    };
  };

  const getRewardsAsync = async () => {
    const { data, ok } = await getRewardsApi.request();
    if (ok) setRewards(data);
  };

  useEffect(() => {
    getRewardsAsync();
  }, []);

  const handleSubmit = async (goalDetails) => {
    const goal = {
      name: goalDetails.name,
      achievementCriteria: goalDetails.achievementCriteria,
      rewardIds: JSON.stringify(
        goalDetails?.rewards?.value.map((reward) => reward.id)
      ),
      achieved: JSON.stringify(goalDetails.achieved.value),
    };
    const { ok } = await updateGoalApi.request(
      outdatedGoal.logbookId,
      outdatedGoal.id,
      goal
    );

    if (!ok) return;
    await storageService.multiRemove([
      constants.LOGBOOKS_DATA_CACHE,
      `${constants.LOGBOOK_DATA_CACHE}_${
        outdatedGoal.logbookId
      }_${new Date().getFullYear()}`,
    ]);
    if (goalDetails.achieved.value) setGoalAchieved(true);
    setToastVisible(true);
  };

  const handleRedirect = () => {
    navigation.navigate(constants.GOAL_SCREEN, {
      goalId: outdatedGoal.id,
      logbookId: outdatedGoal.logbookId,
      ...(goalAchieved && { goalAchieved: true }),
    });
  };

  return (
    <>
      <ScreenHeader
        header={constants.UPDATE_GOAL_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator
        visible={updateGoalApi.loading || getRewardsApi.loading}
      />
      <Screen scrollable>
        <Form
          initialValues={{
            name: outdatedGoal.name,
            dueDate: outdatedGoal.date,
            achievementCriteria: outdatedGoal.achievementCriteria,
            rewards: formatRewardsAndRewardsDefaultValue(
              outdatedGoal.rewards,
              rewards
            ).defaultValue,
            achieved: {
              label: outdatedGoal.achieved ? 'Yes' : 'No',
              value: outdatedGoal.achieved,
            },
          }}
          values
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage
            error={updateGoalApi.error || getRewardsApi.error}
            visible={!!(updateGoalApi.error || getRewardsApi.error)}
          />
          <FormField name="name" label="Name" autoCorrect />
          <DatePickerFormField
            name="dueDate"
            label="Due date"
            placeholder="Select a date"
            disabled
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
            options={
              formatRewardsAndRewardsDefaultValue(outdatedGoal.rewards, rewards)
                .formattedRewards
            }
            PickerItem={RewardPickerItem}
            numberOfColumns={3}
            EmptyState={() => (
              <EmptyStateView
                EmptyStateSvg={EmptyRewardOptionsSvg}
                emptyStateTexts={emptyRewardViewText}
              />
            )}
          />
          <DropdownFormField
            name="achieved"
            label="Achieved"
            options={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]}
          />
          <SubmitButton disabled={toastVisible} title="Save" />
        </Form>
        <SuccessToast
          message="Goal updated successfully"
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

const styles = StyleSheet.create({
  descriptionInputContainerStyle: { minHeight: 100 },
});

export default UpdateGoalScreen;
