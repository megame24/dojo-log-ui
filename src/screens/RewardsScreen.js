import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
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
import RewardItem from '../components/RewardItem';
import EmptyStateView from '../components/EmptyStateView';
import EmptyRewardsSvg from '../assets/empty-rewards.svg';
import dateService from '../utility/dateService';
import storageService from '../utility/storageService';

function RewardsScreen({ navigation }) {
  const [rewards, setRewards] = useState([]);
  const getRewardsApi = useApi(rewardApi.getRewards);
  const isFocused = useIsFocused();
  const deleteRewardApi = useApi(rewardApi.deleteReward);

  const getRewards = async () => {
    const todaysDateInUTC = dateService.getTimelessTimestamp(new Date());
    let cacheRewardsData = await storageService.getItem(
      constants.REWARDS_DATA_CACHE
    );
    let cacheRewardsDataValid = false;
    if (cacheRewardsData) {
      cacheRewardsData = JSON.parse(cacheRewardsData);
      if (cacheRewardsData.date === todaysDateInUTC)
        cacheRewardsDataValid = true;
    }
    if (cacheRewardsDataValid) {
      const cachedRewards = cacheRewardsData.rewards;
      setRewards(cachedRewards);
    } else {
      const { ok, data } = await getRewardsApi.request();
      if (ok) {
        setRewards(data);
        const cacheData = {
          rewards: data,
          date: todaysDateInUTC,
        };
        await storageService.storeItem({
          key: constants.REWARDS_DATA_CACHE,
          value: JSON.stringify(cacheData),
        });
      }
    }
  };

  useEffect(() => {
    if (isFocused) {
      getRewards();
    }
  }, [isFocused]);

  const deleteReward = async (rewardId) => {
    storageService.removeItem(constants.REWARDS_DATA_CACHE);
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
        <View style={{ ...(getRewardsApi.loading && { display: 'none' }) }}>
          {rewards.length ? (
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
          ) : (
            <EmptyStateView
              EmptyStateSvg={EmptyRewardsSvg}
              emptyStateTexts={[
                'Tap the button to create a reward.',
                'Celebrate your achievements with personalized rewards when you reach your goals.',
              ]}
            />
          )}
        </View>
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
