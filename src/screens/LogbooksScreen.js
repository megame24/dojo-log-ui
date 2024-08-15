import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator';
import FloatingButton from '../components/FloatingButton';
import HeaderMenu from '../components/HeaderMenu';
import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import constants from '../config/constants';
import AuthContext from '../context/authContext';
import useApi from '../hooks/useApi';
import logbookApi from '../api/logbook';
import { useIsFocused } from '@react-navigation/native';
import ErrorMessage from '../components/forms/ErrorMessage';
import LogbookListItem from '../components/LogbookListItem';
import CategoryListItem from '../components/CategoryListItem';
import storageService from '../utility/storageService';
import dateService from '../utility/dateService';
import EmptyLogbooksSvg from '../assets/empty-logbooks.svg';
import EmptyStateView from '../components/EmptyStateView';
import TutorialOverlay from '../components/TutorialOverlay';
import useLogbooksScreenTutorial from '../hooks/useLogbooksScreenTutorial';
import useSkipTutorial from '../hooks/useSkipTutorial';
import TadaAnimation from '../components/TadaAnimation';
import ConnectionContext from '../context/connectionContext';
import SuccessToast from '../components/SuccessToast';

// const favouritesCategory = {
//   name: 'favourites',
//   color: colors.gold,
//   iconName: 'star',
//   id: '1',
//   active: true,
// };

function LogbooksScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const userFirstName = user.name.split(' ')[0];
  const getLogbooksApi = useApi(logbookApi.getLogbooks);
  const isFocused = useIsFocused();
  const [logbooks, setLogbooks] = useState([]);
  const [filteredLogbooks, setFilteredLogbooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [logbooksReady, setLogbooksReady] = useState(false);
  const [playTadaAnimation, setPlayTadaAnimation] = useState(false);
  const { isNotConnected } = useContext(ConnectionContext);

  const [showTutorial, setShowTutorial] = useState(true);
  const [showCallToAction, setShowCallToAction] = useState(true);

  const floatingButtonRef = useRef(null);
  const screenRef = useRef(null);

  const [quickLogToastVisible, setQuickLogToastVisible] = useState(false);
  const [quickLogError, setQuickLogError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [toggleReload, setToggleReload] = useState(false);

  const {
    tutorialOverlayContent,
    tutorialOverlayContentReady,
    callToActionContent,
  } = useLogbooksScreenTutorial(userFirstName, floatingButtonRef, screenRef);

  const { skipTutorial } = useSkipTutorial(
    constants.SKIP_LOGBOOKS_SCREEN_TUTORIAL
  );

  const extractCategories = (logbooks = []) => {
    const categoriesTracker = {};
    // const categoriesTemp = [favouritesCategory];
    const categoriesTemp = [];
    logbooks.forEach((logbook) => {
      const category = logbook.category;
      if (category && !categoriesTracker[category.name]) {
        category.active = true;
        categoriesTemp.push(category);
        categoriesTracker[category.name] = 1;
      }
    });
    setCategories(categoriesTemp);
  };

  const getLogbooksAsync = async (startDate, endDate) => {
    const ONE_HOURS_IN_MILLISECONDS = 60 * 60 * 1000;
    const currentTimeInUTC = Date.now();

    let cachedLogbooksData = await storageService.getItem(
      constants.LOGBOOKS_DATA_CACHE
    );
    let cachedLogbooksDataValid = false;

    if (cachedLogbooksData) {
      cachedLogbooksData = JSON.parse(cachedLogbooksData);
      const cachedTime = cachedLogbooksData.timestamp;

      if (currentTimeInUTC - cachedTime <= ONE_HOURS_IN_MILLISECONDS) {
        cachedLogbooksDataValid = true;
      }
    }

    if (cachedLogbooksDataValid) {
      const cachedLogbooks = cachedLogbooksData.logbooks;
      setLogbooks(cachedLogbooks);
      setLogbooksReady(true);
      setFilteredLogbooks(cachedLogbooks);
      extractCategories(cachedLogbooks);
    } else {
      setFilteredLogbooks([]);
      setCategories([]);
      const { data, ok } = await getLogbooksApi.request(
        user.id,
        startDate,
        endDate
      );

      if (ok) {
        setLogbooks(data);
        setLogbooksReady(true);
        setFilteredLogbooks(data);
        extractCategories(data);

        if (!isNotConnected) {
          const cacheData = {
            logbooks: data,
            timestamp: currentTimeInUTC,
          };
          await storageService.storeItem({
            key: constants.LOGBOOKS_DATA_CACHE,
            value: JSON.stringify(cacheData),
          });
        }
      }
    }
  };

  useEffect(() => {
    if (isFocused) {
      const endDateValue = dateService.getEndOfDay(dateService.now());
      const startDateValue = dateService.getStartOfDay(
        dateService.subtractTimeFromDate(endDateValue, 6, 'd')
      );
      getLogbooksAsync(startDateValue, endDateValue);
      setRefreshing(false);
    }
  }, [isFocused, toggleReload]);

  const filterLogbooks = (category) => {
    category.active = !category.active; // treat favourites filter differently
    let filteredLogbooksTemp = logbooks.filter((logbook) => {
      let include = true;
      for (let i = 0; i < categories.length; i++) {
        if (logbook.category.id === categories[i].id && !categories[i].active) {
          include = false;
          return;
        }
      }
      return include;
    });
    if (!filteredLogbooksTemp.length) filteredLogbooksTemp = [...logbooks];
    setFilteredLogbooks(filteredLogbooksTemp);
  };

  return (
    <>
      <ScreenHeader
        header={`Hello ${userFirstName}!`}
        LeftIcon={() => (
          <HeaderMenu onPress={() => navigation.toggleDrawer()} />
        )}
      />
      <ActivityIndicator visible={getLogbooksApi.loading} />
      <Screen style={styles.screen}>
        <ErrorMessage
          error={getLogbooksApi.error || quickLogError}
          visible={!!(getLogbooksApi.error || quickLogError)}
        />
        <View
          ref={screenRef}
          collapsable={false}
          style={{
            ...((getLogbooksApi.loading || getLogbooksApi.error) && {
              display: 'none',
            }),
          }}
        >
          {!logbooks.length && logbooksReady ? (
            <EmptyStateView
              EmptyStateSvg={EmptyLogbooksSvg}
              emptyStateTexts={[
                'Tap the button to create a logbook.',
                'Your logbook will help you organize progress logs and set goals towards a specific cause.',
              ]}
            />
          ) : null}
          <View style={styles.filterListContainer}>
            <FlatList
              data={categories}
              contentContainerStyle={styles.categoriesFlatListContentContainer}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              horizontal
              renderItem={({ item }) => (
                <CategoryListItem item={item} filterLogbooks={filterLogbooks} />
              )}
            />
          </View>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  setToggleReload(!toggleReload);
                  // getLogbooksAsync(startDate, endDate);
                }}
              />
            }
            contentContainerStyle={styles.logbooksFlatListContentContainer}
          >
            {filteredLogbooks.map((item) => (
              <LogbookListItem
                key={item.id}
                item={item}
                navigation={navigation}
                reload={() => setToggleReload(!toggleReload)}
                setPlayTadaAnimation={setPlayTadaAnimation}
                setQuickLogError={setQuickLogError}
                setQuickLogToastVisible={setQuickLogToastVisible}
              />
            ))}
          </ScrollView>
        </View>
        <SuccessToast
          message="Progress logged successfully"
          duration={800}
          visible={quickLogToastVisible}
          onClose={() => {
            setQuickLogToastVisible(false);
          }}
        />
      </Screen>
      <FloatingButton
        ref={floatingButtonRef}
        onPress={() => navigation.navigate(constants.CREATE_LOGBOOK_SCREEN)}
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
      <TadaAnimation play={playTadaAnimation} setPlay={setPlayTadaAnimation} />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 0,
    paddingTop: 15,
  },
  logbooksFlatListContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  categoriesFlatListContentContainer: {
    paddingHorizontal: 20,
  },
  filterListContainer: { paddingBottom: 15 },
});

export default LogbooksScreen;
