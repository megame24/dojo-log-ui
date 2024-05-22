import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import Menu, {
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import colors from '../config/colors';

import AppText from './AppText';
import Icon from './Icon';
import ConnectionContext from '../context/connectionContext';

function DeleteAndEditSideMenu({ onEdit, onDelete }) {
  const { isNotConnected } = useContext(ConnectionContext);
  return (
    <Menu>
      {/* consider refactoring out!!!!! */}
      <MenuTrigger>
        <Icon name="ellipsis-vertical" />
      </MenuTrigger>
      <MenuOptions customStyles={{ optionsContainer: styles.popupMenuOptions }}>
        <MenuOption onSelect={onEdit} style={styles.popupMenuOption}>
          <AppText>Edit</AppText>
        </MenuOption>
        <MenuOption
          disabled={isNotConnected}
          onSelect={isNotConnected ? () => {} : onDelete}
          style={styles.popupMenuOption}
        >
          <AppText
            style={{
              color: isNotConnected ? colors.lightGray : colors.darkGray,
            }}
          >
            Delete
          </AppText>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
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

export default DeleteAndEditSideMenu;
