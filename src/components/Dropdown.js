import React, { useState } from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import colors from '../config/colors';

import AppText from './AppText';
import Icon from './Icon';
import { FlatList } from 'react-native-gesture-handler';

const Dropdown = ({
  topLevelContainerStyle,
  inputContainerStyle,
  inputContentStyle,
  optionsContainerStyle,
  onSelectItem,
  placeholder,
  options,
  value,
  disabled,
  useScrollView = false,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <View
      style={[
        topLevelContainerStyle,
        inputContainerStyle,
        { alignItems: 'center' },
      ]}
    >
      <Pressable
        style={[styles.container, inputContainerStyle]}
        onPress={!disabled ? () => setShowOptions(!showOptions) : null}
      >
        {value?.label ? (
          <AppText
            style={[
              inputContentStyle,
              { color: disabled ? colors.lightGray : colors.black },
            ]}
          >
            {value.label}
          </AppText>
        ) : (
          <AppText style={[styles.placeholder, inputContentStyle]}>
            {placeholder}
          </AppText>
        )}
        <Icon
          style={{ color: disabled ? colors.lightGray : colors.black }}
          name="caret-down"
        />
      </Pressable>
      {showOptions &&
        (useScrollView ? (
          <ScrollView
            style={[
              inputContainerStyle,
              styles.optionsContainer,
              optionsContainerStyle,
            ]}
          >
            {options.map((item, i) => (
              <TouchableHighlight
                underlayColor={colors.borderGray}
                style={styles.option}
                key={i}
                onPress={() => {
                  setShowOptions(false);
                  onSelectItem(item);
                }}
              >
                <AppText style={inputContentStyle}>{item.label}</AppText>
              </TouchableHighlight>
            ))}
          </ScrollView>
        ) : (
          <FlatList
            data={options}
            style={[inputContainerStyle, styles.optionsContainer]}
            listKey={(item, index) => `_key${index.toString()}`}
            keyExtractor={(item, index) => `_key${index.toString()}`}
            renderItem={({ item }) => (
              <TouchableHighlight
                underlayColor={colors.borderGray}
                style={styles.option}
                key={item.value}
                onPress={() => {
                  setShowOptions(false);
                  onSelectItem(item);
                }}
              >
                <AppText style={inputContentStyle}>{item.label}</AppText>
              </TouchableHighlight>
            )}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 5,
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
    maxHeight: 150,
    padding: 0,
    paddingVertical: 5,
  },
  option: {
    padding: 5,
  },
});

export default Dropdown;
