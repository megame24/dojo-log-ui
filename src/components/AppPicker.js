import React, { useState } from 'react';
import {
  StyleSheet,
  Pressable,
  Modal,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import colors from '../config/colors';

import AppText from './AppText';
import Icon from './Icon';
import Screen from './Screen';

const AppPicker = ({
  inputContainerStyle,
  onBlur,
  onSelectItem,
  placeholder,
  options,
  PickerItem,
  numberOfColumns = 1,
  value,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <>
      <Pressable
        style={[styles.container, inputContainerStyle]}
        onPress={() => setShowOptions(!showOptions)}
        on
      >
        {value?.name ? (
          <AppText>{value.name}</AppText>
        ) : (
          <AppText style={styles.placeholder}>{placeholder}</AppText>
        )}
        <Icon name="caret-down" />
      </Pressable>
      <Modal visible={showOptions} animationType="slide">
        <Screen>
          <TouchableOpacity
            style={styles.pickerClose}
            onPress={() => {
              setShowOptions(false);
              onBlur();
            }}
          >
            <Icon name="close" />
          </TouchableOpacity>
          <FlatList
            data={options}
            numColumns={numberOfColumns}
            contentContainerStyle={styles.flatListContentContainer}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PickerItem
                item={item}
                onPress={() => {
                  setShowOptions(false);
                  onSelectItem(item);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  placeholder: {
    color: colors.lightGray,
  },
  optionsContainer: {
    height: 100,
  },
  pickerClose: {
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 2,
  },
  flatListContentContainer: {
    paddingTop: 20,
  },
});

export default AppPicker;
