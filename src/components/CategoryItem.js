import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../config/colors';
import constants from '../config/constants';
import { capitalize } from '../utility/utilityFunctions';
import AppText from './AppText';
import DeleteAndEditSideMenu from './DeleteAndEditSideMenu';
import Icon from './Icon';

function CategoryItem({ item, navigation, deleteCategory }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <AppText style={styles.text}>{capitalize(item.name)}</AppText>
        <Icon name={item.iconName} color={item.color} />
      </View>
      <DeleteAndEditSideMenu
        onEdit={() =>
          navigation.navigate(constants.UPDATE_CATEGORY_SCREEN, {
            category: item,
          })
        }
        onDelete={() => deleteCategory(item.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    borderColor: colors.borderPrimary,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '500',
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CategoryItem;
