import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator';
import FloatingButton from '../components/FloatingButton';
import ErrorMessage from '../components/forms/ErrorMessage';
import HeaderMenu from '../components/HeaderMenu';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import constants from '../config/constants';
import useApi from '../hooks/useApi';
import rewardApi from '../api/reward';
import { useIsFocused } from '@react-navigation/native';
import AppText from '../components/AppText';
import RewardItem from '../components/RewardItem';

function RewardsScreen({ navigation }) {
  const [rewards, setRewards] = useState([]);
  const getRewardsApi = useApi(rewardApi.getRewards);
  const isFocused = useIsFocused();
  const deleteRewardApi = useApi(rewardApi.deleteReward);

  const getRewards = async () => {
    const { ok, data } = await getRewardsApi.request();

    if (ok) {
      setRewards(data);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getRewards();
    }
  }, [isFocused]);

  const deleteReward = async (rewardId) => {
    const { ok } = await deleteRewardApi.request(rewardId);

    if (ok) getRewards();
  };

  return (
    <>
      <ScreenHeader
        header="Rewards"
        LeftIcon={() => (
          <HeaderMenu onPress={() => navigation.toggleDrawer()} />
        )}
      />
      <ActivityIndicator
        visible={getRewardsApi.loading || deleteRewardApi.loading}
      />
      <Screen style={styles.screen} screenHeaderPresent>
        <ErrorMessage
          error={getRewardsApi.error || deleteRewardApi.error}
          visible={!!(getRewardsApi.error || deleteRewardApi.error)}
        />
        <AppText>
          {/** Include an info icon to the header (right icon) explaining what the rewards are. Also have the empty state explain it */}
        </AppText>
        <FlatList
          data={rewards}
          contentContainerStyle={styles.flatListContentContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <RewardItem
              navigation={navigation}
              item={item}
              index={index}
              deleteReward={deleteReward}
            />
          )}
        />
      </Screen>
      <FloatingButton
        onPress={() => navigation.navigate(constants.CREATE_REWARD_SCREEN)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 0,
  },
  flatListContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
});

export default RewardsScreen;
