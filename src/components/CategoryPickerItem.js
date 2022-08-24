import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import Icon from './Icon';

function CategoryPickerItem({ item, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={onPress}>
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <Icon color={colors.white} name={item.iconName} />
        </View>
        <AppText style={styles.text}>{item.name}</AppText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '33%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
});

export default CategoryPickerItem;
