import React, { useState } from 'react';
import { StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import Icon from './Icon';
import Screen from './Screen';
import Button from './Button';

function AppMultiPicker({
  inputContainerStyle,
  onBlur,
  onSelectItem,
  placeholder,
  options,
  PickerItem,
  numberOfColumns = 1,
  value,
  minSelection = 0,
  maxSelection = 5,
}) {
  const [showOptions, setShowOptions] = useState(false);
  let [selectedItems, setSelectedItems] = useState(value?.value || []);
  const [selectionLimitReached, setSelectionLimitReached] = useState(false);
  let pickerLabel = '';

  const onItemClick = (item) => {
    item.isSelected = !item.isSelected;
    if (item.isSelected) {
      selectedItems.push(item);
      setSelectedItems(selectedItems);
    } else {
      selectedItems = selectedItems.filter((el) => el.id !== item.id);
      setSelectedItems(selectedItems);
    }
    setSelectionLimitReached(selectedItems.length === maxSelection);
    selectedItems.forEach((el, i) => {
      pickerLabel += el.name;
      if (i !== selectedItems.length - 1) pickerLabel += ', ';
    });
    onSelectItem({
      label: pickerLabel,
      value: selectedItems,
    });
  };

  const closeModal = () => {
    setShowOptions(false);
    onBlur();
  };

  return (
    <>
      <Pressable
        style={[styles.container, inputContainerStyle]}
        onPress={() => setShowOptions(!showOptions)}
        on
      >
        {value?.label ? (
          <AppText style={{ maxWidth: 300 }} numberOfLines={1}>
            {value.label}
          </AppText>
        ) : (
          <AppText style={styles.placeholder}>{placeholder}</AppText>
        )}
        <Icon name="caret-down" />
      </Pressable>
      <Modal visible={showOptions} animationType="slide">
        <Screen>
          <AppText style={styles.description}>
            Select a minimum of {minSelection} and a maximum of {maxSelection}{' '}
            from the options
          </AppText>
          <FlatList
            data={options}
            numColumns={numberOfColumns}
            contentContainerStyle={styles.flatListContentContainer}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PickerItem
                item={item}
                selectionLimitReached={selectionLimitReached}
                onPress={() => {
                  onItemClick(item);
                }}
              />
            )}
          />
          <Button onPress={closeModal} style={styles.button}>
            Done
          </Button>
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 5,
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
    height: 100,
  },
  button: {
    height: 40,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  description: {
    marginTop: 10,
    marginLeft: 10,
  },
});

export default AppMultiPicker;
