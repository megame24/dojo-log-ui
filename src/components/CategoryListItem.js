import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import colors from '../config/colors';
import { capitalize } from '../utility/utilityFunctions';
import AppText from './AppText';
import Icon from './Icon';

function CategoryListItem({ filterLogbooks, item }) {
  return (
    <Pressable
      onPress={() => filterLogbooks(item)}
      style={[
        styles.category,
        {
          backgroundColor: item.color,
          opacity: item.active ? 1 : 0.5,
        },
      ]}
    >
      <Icon name={item.iconName} color={colors.white} />
      <AppText style={styles.categoryName}>{capitalize(item.name)}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  category: {
    flexDirection: 'row',
    marginRight: 10,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  categoryName: {
    color: colors.white,
    marginLeft: 5,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default CategoryListItem;
