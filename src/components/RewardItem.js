import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import colors from '../config/colors';
import constants from '../config/constants';
import AppText from './AppText';
import DeleteAndEditSideMenu from './DeleteAndEditSideMenu';
import Icon from './Icon';

function RewardItem({ item, index, deleteReward, navigation }) {
  return (
    <View style={[styles.container, { marginTop: index === 0 ? 10 : 20 }]}>
      <View style={styles.imageText}>
        {item.imageUrl ? (
          <Image style={styles.image} source={{ uri: item.imageUrl }} />
        ) : (
          <Icon size={70} color={colors.primary} name="gift-sharp" />
        )}
        <View style={{ marginLeft: 15 }}>
          <AppText style={{ fontWeight: 'bold' }}>{item.name}</AppText>
          {!!item.description && (
            <AppText style={{ marginTop: 5 }}>{item.description}</AppText>
          )}
        </View>
      </View>
      <DeleteAndEditSideMenu
        onDelete={() => deleteReward(item.id)}
        onEdit={() =>
          navigation.navigate(constants.UPDATE_REWARD_SCREEN, { reward: item })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
});

export default RewardItem;
