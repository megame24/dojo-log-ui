import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import FloatingButton from '../components/FloatingButton';
import HeaderMenu from '../components/HeaderMenu';
import constants from '../config/constants';
import categoryApi from '../api/category';
import useApi from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';
import ErrorMessage from '../components/forms/ErrorMessage';
import CategoryItem from '../components/CategoryItem';

function CategoriesScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const getCategoriesApi = useApi(categoryApi.getAll);
  const deleteCategoryApi = useApi(categoryApi.deleteCategory);
  const isFocused = useIsFocused();

  const getCategoriesAsync = async () => {
    const { data, ok } = await getCategoriesApi.request();
    if (ok) setCategories(data);
  };

  useEffect(() => {
    if (isFocused) getCategoriesAsync();
  }, [isFocused]);

  const deleteCategory = async (categoryId) => {
    const { ok } = await deleteCategoryApi.request(categoryId);

    if (ok) {
      const latestCategories = categories.filter(
        (category) => category.id !== categoryId
      );
      setCategories(latestCategories);
    }
  };

  return (
    <>
      <ScreenHeader
        header="Categories"
        LeftIcon={() => (
          <HeaderMenu onPress={() => navigation.toggleDrawer()} />
        )}
      />
      <ActivityIndicator
        visible={getCategoriesApi.loading || deleteCategoryApi.loading}
      />
      <Screen style={styles.screen}>
        <ErrorMessage
          error={getCategoriesApi.error || deleteCategoryApi.error}
          visible={!!(getCategoriesApi.error || deleteCategoryApi.error)}
        />
        <FlatList
          data={categories}
          contentContainerStyle={styles.flatListContentContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryItem
              item={item}
              navigation={navigation}
              deleteCategory={deleteCategory}
            />
          )}
        />
      </Screen>
      <FloatingButton
        onPress={() => navigation.navigate(constants.CREATE_CATEGORY_SCREEN)}
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

export default CategoriesScreen;
