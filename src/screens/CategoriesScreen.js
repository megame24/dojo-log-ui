import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Menu, {
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

import Screen from '../components/Screen';
import ScreenHeader from '../components/ScreenHeader';
import FloatingButton from '../components/FloatingButton';
import HeaderMenu from '../components/HeaderMenu';
import constants from '../config/constants';
import categoryApi from '../api/category';
import useApi from '../hooks/useApi';
import AppText from '../components/AppText';
import { capitalize } from '../utility/utilityFunctions';
import ActivityIndicator from '../components/ActivityIndicator';
import ErrorMessage from '../components/forms/ErrorMessage';
import colors from '../config/colors';

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
    getCategoriesAsync();
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
      <Screen screenHeaderPresent scrollable floatingButtonRoom={80}>
        <ErrorMessage
          error={getCategoriesApi.error || deleteCategoryApi.error}
          visible={!!getCategoriesApi.error || deleteCategoryApi.error}
        />
        {categories.map((category, index) => (
          <View style={styles.categoryContainer} key={index}>
            <View style={styles.categoryTextColor}>
              <AppText style={styles.categoryText}>
                {capitalize(category.name)}
              </AppText>
              <Ionicons
                name={category.iconName || 'shape'}
                size={20}
                color={category.color}
              />
            </View>
            <Menu>
              <MenuTrigger>
                <Ionicons
                  name="ellipsis-vertical"
                  size={20}
                  color={colors.darkGray}
                />
              </MenuTrigger>
              <MenuOptions
                customStyles={{ optionsContainer: styles.popupMenuOptions }}
              >
                <MenuOption
                  onSelect={() =>
                    navigation.navigate(constants.UPDATE_CATEGORIES_SCREEN, {
                      category,
                    })
                  }
                  style={styles.popupMenuOption}
                >
                  <AppText>Edit</AppText>
                </MenuOption>
                <MenuOption
                  onSelect={() => deleteCategory(category.id)}
                  style={styles.popupMenuOption}
                >
                  <AppText>Delete</AppText>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        ))}
      </Screen>
      <FloatingButton
        onPress={() => navigation.navigate(constants.CREATE_CATEGORIES_SCREEN)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    borderColor: colors.borderPrimary,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryText: {
    fontWeight: '500',
    marginRight: 10,
  },
  categoryColor: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
  },
  categoryTextColor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popupMenuOptions: {
    width: 120,
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  popupMenuOption: {
    padding: 8,
  },
});

export default CategoriesScreen;
