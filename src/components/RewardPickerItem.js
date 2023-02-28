import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import Icon from './Icon';

function RewardPickerItem({ item, selectionLimitReached, onPress }) {
  const [isSelected, setIsSelected] = useState(item.isSelected);

  const onItemPress = () => {
    if (selectionLimitReached && !isSelected) return;
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
          {item.image ? (
            <Image style={styles.image} source={{ uri: item.image.url }} />
          ) : (
            <Icon
              size={40}
              style={styles.icon}
              color={colors.primary}
              name="gift-sharp"
            />
          )}
        </View>
        <AppText numberOfLines={1} style={styles.text}>
          {item.name}
        </AppText>
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

export default RewardPickerItem;
