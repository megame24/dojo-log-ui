import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../config/colors';
import constants from '../config/constants';
import dateService from '../utility/dateService';
import AppText from './AppText';
import DeleteAndEditSideMenu from './DeleteAndEditSideMenu';
import Icon from './Icon';

function LogListItem({ item, navigation, deleteLog }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.message}>{item.message}</AppText>
        {dateService.getDateInUTC(item.date) ===
          dateService.getDateInUTC(new Date()) && (
          <DeleteAndEditSideMenu
            onEdit={() =>
              navigation.navigate(constants.UPDATE_LOG_SCREEN, {
                log: item,
              })
            }
            onDelete={() => deleteLog(item.id)}
          />
        )}
      </View>
      <AppText style={[styles.marginTopTen, { fontSize: 14 }]}>
        Duration: {item.durationOfWorkInMinutes}
      </AppText>
      {item?.proofOfWork && (
        <TouchableOpacity
          onPress={() => console.log('Implement me when cloud storage is up')}
          style={[styles.fileNameIcon, styles.marginTopTen]}
        >
          <Icon name="document" color={colors.primary} />
          <AppText style={styles.fileName} numberOfLines={1}>
            {item.proofOfWork.name}
          </AppText>
        </TouchableOpacity>
      )}
      <AppText style={styles.date}>
        {new Date(item.date).toTimeString()}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    borderColor: colors.borderPrimary,
    borderWidth: 1,
    flexDirection: 'column',
  },
  message: {
    fontWeight: '500',
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marginTopTen: {
    marginTop: 10,
  },
  fileNameIcon: {
    flexDirection: 'row',
  },
  fileName: {
    marginLeft: 10,
    color: colors.primary,
  },
  date: {
    marginTop: 15,
    textAlign: 'right',
    fontSize: 12,
  },
});

export default LogListItem;
