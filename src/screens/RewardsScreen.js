import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
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
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import RewardItem from '../components/RewardItem';
import EmptyStateView from '../components/EmptyStateView';
import EmptyRewardsSvg from '../assets/empty-rewards.svg';
import dateService from '../utility/dateService';
import storageService from '../utility/storageService';
import useRewardsScreenTutorial from '../hooks/useRewardsScreenTutorial';
import useSkipTutorial from '../hooks/useSkipTutorial';
import TutorialOverlay from '../components/TutorialOverlay';
import BackButton from '../components/BackButton';
import SuccessToast from '../components/SuccessToast';
import ConnectionContext from '../context/connectionContext';

function RewardsScreen({ navigation, route }) {
  const showBackButton = route.params?.showBackButton;
  const redirectOption = route.params?.redirectOption;
  const [rewards, setRewards] = useState([]);
  const getRewardsApi = useApi(rewardApi.getRewards);
  const isFocused = useIsFocused();
  const deleteRewardApi = useApi(rewardApi.deleteReward);
  const [rewardsReady, setRewardsReady] = useState(false);
  const { isNotConnected } = useContext(ConnectionContext);

  const [showTutorial, setShowTutorial] = useState(true);
  const [showCallToAction, setShowCallToAction] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);
  const floatingButtonRef = useRef(null);
  const screenRef = useRef(null);

  const {
    tutorialOverlayContent,
    tutorialOverlayContentReady,
    callToActionContent,
  } = useRewardsScreenTutorial(floatingButtonRef, screenRef);

  const { skipTutorial } = useSkipTutorial(
    constants.SKIP_REWARDS_SCREEN_TUTORIAL
  );

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
      setRewardsReady(true);
    } else {
      const { ok, data } = await getRewardsApi.request();
      if (ok) {
        setRewards(data);
        setRewardsReady(true);

        if (!isNotConnected) {
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
    }
  };

  useEffect(() => {
    if (isFocused) {
      getRewards();
    }
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        navigation.setParams({ showBackButton: undefined });
      };
    }, [navigation])
  );

  const deleteReward = async (rewardId) => {
    storageService.removeItem(constants.REWARDS_DATA_CACHE);
    const { ok } = await deleteRewardApi.request(rewardId);

    if (ok) getRewards();
    setToastVisible(true);
  };

  return (
    <>
      <ScreenHeader
        header="Rewards"
        LeftIcon={() =>
          showBackButton ? (
            <BackButton onPress={() => navigation.goBack()} />
          ) : (
            <HeaderMenu onPress={() => navigation.toggleDrawer()} />
          )
        }
      />
      <ActivityIndicator
        visible={getRewardsApi.loading || deleteRewardApi.loading}
      />
      <Screen ref={screenRef} style={styles.screen}>
        <ErrorMessage
          error={getRewardsApi.error || deleteRewardApi.error}
          visible={!!(getRewardsApi.error || deleteRewardApi.error)}
        />
        <View style={{ ...(getRewardsApi.loading && { display: 'none' }) }}>
          {!rewards.length && rewardsReady ? (
            <EmptyStateView
              EmptyStateSvg={EmptyRewardsSvg}
              emptyStateTexts={[
                'Tap the button to create a reward.',
                'Celebrate your achievements with personalized rewards when you reach your goals.',
              ]}
            />
          ) : null}
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
        </View>
        <SuccessToast
          message="Reward deleted successfully"
          duration={2000}
          visible={toastVisible}
          onClose={() => {
            setToastVisible(false);
          }}
        />
      </Screen>
      <FloatingButton
        ref={floatingButtonRef}
        onPress={() =>
          navigation.navigate(constants.CREATE_REWARD_SCREEN, {
            redirectOption,
          })
        }
      />
      {tutorialOverlayContentReady && !skipTutorial ? (
        <TutorialOverlay
          showTutorial={showTutorial}
          setShowTutorial={setShowTutorial}
          content={tutorialOverlayContent}
          skipTutorialKey={constants.SKIP_LOGBOOKS_SCREEN_TUTORIAL}
          showCallToAction={showCallToAction}
          setShowCallToAction={setShowCallToAction}
          callToActionContent={callToActionContent}
        />
      ) : null}
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
