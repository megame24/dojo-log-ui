import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import ScreenHeader from '../components/ScreenHeader';
import BackButton from '../components/BackButton';
import ActivityIndicator from '../components/ActivityIndicator';
import ErrorMessage from '../components/forms/ErrorMessage';
import Screen from '../components/Screen';
import FloatingButton from '../components/FloatingButton';
import colors from '../config/colors';
import Icon from '../components/Icon';
import useApi from '../hooks/useApi';
import logbookApi from '../api/logbook';
import AppText from '../components/AppText';
import LabelAndContent from '../components/LabelAndContent';
import dateService from '../utility/dateService';
import GoalRewardItem from '../components/GoalRewardItem';
import constants from '../config/constants';

function GoalScreen({ route, navigation }) {
  const getGoalApi = useApi(logbookApi.getGoal);
  const [goal, setGoal] = useState({});
  const { goalId, logbookId } = route.params;
  const isFocused = useIsFocused();

  const getGoalAsync = async () => {
    const { data, ok } = await getGoalApi.request(logbookId, goalId);
    if (ok) setGoal(data);
  };

  useEffect(() => {
    if (isFocused) getGoalAsync();
  }, [isFocused]);

  return (
    <>
      <ScreenHeader
        header="Goal"
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator visible={getGoalApi.loading} />
      <Screen screenHeaderPresent floatingButtonRoom={60}>
        <ErrorMessage error={getGoalApi.error} visible={!!getGoalApi.error} />
        <LabelAndContent
          label="Name"
          Content={() => <AppText>{goal.name}</AppText>}
        />
        <LabelAndContent
          label="Due date"
          Content={() => (
            <AppText>
              {dateService.formatDate(goal.date, 'dddd, MMMM D, YYYY')}
            </AppText>
          )}
        />
        <LabelAndContent
          label="Achievement criteria"
          Content={() => <AppText>{goal.achievementCriteria || '--'}</AppText>}
        />
        <LabelAndContent
          label="Achieved"
          Content={() => <AppText>{goal.achieved ? 'Yes' : 'No'}</AppText>}
        />
        <LabelAndContent
          label="Reward(s)"
          Content={
            goal.rewards?.length
              ? () => (
                  <FlatList
                    data={goal.rewards}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <GoalRewardItem item={item} />}
                  />
                )
              : () => <AppText>--</AppText>
          }
        />
      </Screen>
      <FloatingButton
        size={35}
        color={colors.floatingButtonGray}
        onPress={() =>
          navigation.navigate(constants.UPDATE_GOAL_SCREEN, { goal })
        }
        Icon={() => (
          <Icon name="pen" isFontAwesome size={15} color={colors.white} />
        )}
      />
    </>
  );
}

export default GoalScreen;
