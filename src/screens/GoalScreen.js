import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
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

function GoalScreen({ route, navigation }) {
  const getGoalApi = useApi(logbookApi.getGoal);
  const [goal, setGoal] = useState({});
  const { goalId, logbookId } = route.params;

  const getGoalAsync = async () => {
    const { data, ok } = await getGoalApi.request(logbookId, goalId);
    if (ok) setGoal(data);
  };

  useEffect(() => {
    getGoalAsync();
  }, []);

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
        onPress={() => console.log('lol2')}
        Icon={() => (
          <Icon name="pen" isFontAwesome size={15} color={colors.white} />
        )}
      />
    </>
  );
}

export default GoalScreen;
