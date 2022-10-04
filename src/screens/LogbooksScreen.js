import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
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
import colors from '../config/colors';
import LogbookListItem from '../components/LogbookListItem';
import CategoryListItem from '../components/CategoryListItem';

const favouritesCategory = {
  name: 'favourites',
  color: colors.gold,
  iconName: 'star',
  id: '1',
  active: true,
};

function LogbooksScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const getLogbooksApi = useApi(logbookApi.getLogbooks);
  const isFocused = useIsFocused();
  const [logbooks, setLogbooks] = useState([]);
  const [filteredLogbooks, setFilteredLogbooks] = useState([]);
  const [categories, setCategories] = useState([]);

  const extractCategories = (logbooks = []) => {
    const categoriesTracker = {};
    const categoriesTemp = [favouritesCategory];
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

  const getLogbooksAsync = async () => {
    setFilteredLogbooks([]);
    setCategories([]);
    const { data, ok } = await getLogbooksApi.request(user.id);
    if (ok) {
      setLogbooks(data);
      setFilteredLogbooks(data);
      extractCategories(data);
    }
  };

  useEffect(() => {
    if (isFocused) getLogbooksAsync();
  }, [isFocused]);

  // update logbook anytime a log is created!!!!

  const filterLogbooks = (category) => {
    category.active = !category.active; // treat favourites filter differently
    let filteredLogbooksTemp = logbooks.filter((logbook) => {
      let include = true;
      for (let i = 1; i < categories.length; i++) {
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
        header={`What's good, ${user.name.split(' ')[0]}!`}
        LeftIcon={() => (
          <HeaderMenu onPress={() => navigation.toggleDrawer()} />
        )}
      />
      <ActivityIndicator visible={getLogbooksApi.loading} />
      <Screen style={styles.screen} screenHeaderPresent>
        <ErrorMessage
          error={getLogbooksApi.error}
          visible={!!getLogbooksApi.error}
        />
        <View>
          <View style={{ paddingBottom: 15 }}>
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
          <FlatList
            data={filteredLogbooks}
            contentContainerStyle={styles.logbooksFlatListContentContainer}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <LogbookListItem item={item} navigation={navigation} />
            )}
          />
        </View>
      </Screen>
      <FloatingButton
        onPress={() => navigation.navigate(constants.CREATE_LOGBOOK_SCREEN)}
      />
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
});

export default LogbooksScreen;
