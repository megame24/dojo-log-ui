import React, { useState } from 'react';
import { StyleSheet, Pressable, TouchableOpacity, View } from 'react-native';
import Menu, {
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import colors from '../config/colors';

import AppText from './AppText';
import Icon from './Icon';

const Dropdown = ({
  inputContainerStyle,
  inputContentStyle,
  onBlur,
  onSelectItem,
  placeholder,
  options,
  value,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  console.log(value);
  return (
    <View style={[inputContainerStyle, { alignItems: 'center' }]}>
      {/* <Menu>
        <MenuTrigger>
          <View
            style={[styles.container, inputContainerStyle]}
            // onPress={() => setShowOptions(!showOptions)}
          >
            {value?.label ? (
              <AppText>{value.label}</AppText>
            ) : (
              <AppText style={styles.placeholder}>{placeholder}</AppText>
            )}
            <Icon name="caret-down" />
          </View>
        </MenuTrigger>
        <MenuOptions
          // customStyles={{ optionsContainer: styles.popupMenuOptions }}
        >
          {options.map((option) => (
            <MenuOption
              key={option.value}
              onSelect={() => onSelectItem(option)}
            >
              <AppText>{option.label}</AppText>
            </MenuOption>
          ))}
        </MenuOptions>
      </Menu> */}

      <Pressable
        style={[styles.container, inputContainerStyle]}
        onPress={() => setShowOptions(!showOptions)}
      >
        {value?.label ? (
          <AppText style={inputContentStyle}>{value.label}</AppText>
        ) : (
          <AppText style={[styles.placeholder, inputContentStyle]}>
            {placeholder}
          </AppText>
        )}
        <Icon name="caret-down" />
      </Pressable>
      {showOptions && (
        <View style={[inputContainerStyle, styles.optionsContainer]}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => {
                setShowOptions(false);
                onSelectItem(option);
              }}
            >
              <AppText style={inputContentStyle}>{option.label}</AppText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // marginTop: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholder: {
    color: colors.lightGray,
  },
  optionsContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderGray,
    position: 'absolute',
    top: 39,
    // right: 0,
    zIndex: 2,
  },
});

export default Dropdown;
