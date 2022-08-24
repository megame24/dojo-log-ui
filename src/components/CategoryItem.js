import React from 'react';
import { View, StyleSheet } from 'react-native';
import Menu, {
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

import colors from '../config/colors';
import constants from '../config/constants';
import { capitalize } from '../utility/utilityFunctions';
import AppText from './AppText';
import Icon from './Icon';

function CategoryItem({ item, navigation, deleteCategory }) {
  return (
    <View style={styles.container}>
      <View style={styles.textColor}>
        <AppText style={styles.text}>{capitalize(item.name)}</AppText>
        <Icon name={item.iconName || 'shape'} color={item.color} />
      </View>
      <Menu>
        {/* consider refactoring out!!!!! */}
        <MenuTrigger>
          <Icon name="ellipsis-vertical" />
        </MenuTrigger>
        <MenuOptions
          customStyles={{ optionsContainer: styles.popupMenuOptions }}
        >
          <MenuOption
            onSelect={() =>
              navigation.navigate(constants.UPDATE_CATEGORY_SCREEN, {
                category: item,
              })
            }
            style={styles.popupMenuOption}
          >
            <AppText>Edit</AppText>
          </MenuOption>
          <MenuOption
            onSelect={() => deleteCategory(item.id)}
            style={styles.popupMenuOption}
          >
            <AppText>Delete</AppText>
          </MenuOption>
        </MenuOptions>
      </Menu>
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
  textColor: {
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

export default CategoryItem;
