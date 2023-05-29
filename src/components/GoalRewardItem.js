import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Icon from './Icon';
import AppText from './AppText';
import colors from '../config/colors';

function GoalRewardItem({ item }) {
  return (
    <View style={styles.rewardContainer}>
      {item.image ? (
        <Image style={styles.image} source={{ uri: item.image.url }} />
      ) : (
        <View style={styles.iconContainer}>
          <Icon
            size={25}
            style={styles.icon}
            color={colors.primary}
            name="gift-sharp"
          />
        </View>
      )}
      <AppText style={styles.name}>{item.name}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  iconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.primary50Per,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    marginLeft: 10,
  },
});

export default GoalRewardItem;
