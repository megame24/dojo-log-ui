import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';

function LogbookNotificationDaysPickerItem({ item, onPress }) {
  const [isSelected, setIsSelected] = useState(item.isSelected);

  const onItemPress = () => {
    setIsSelected(!isSelected);
    onPress();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={onItemPress}>
        <View
          style={[
            styles.iconContainer,
            {
              borderWidth: isSelected ? 2 : 0,
              borderColor: isSelected ? colors.primary50Per : 'transparent',
            },
          ]}
        >
          <AppText numberOfLines={1} style={styles.text}>
            {item.label}
          </AppText>
        </View>
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
    textAlign: 'center',
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  iconContainer: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
});

export default LogbookNotificationDaysPickerItem;
