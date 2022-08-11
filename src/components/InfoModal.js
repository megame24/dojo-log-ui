import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import AppText from './AppText';
import InfoModalContext from '../context/infoModalContext';

function InfoModal() {
  const {
    infoModalVisible,
    setInfoModalVisible,
    infoModalContent,
    setInfoModalContent,
  } = useContext(InfoModalContext);

  const closeModal = () => {
    setInfoModalVisible(false);
    setInfoModalContent({});
  };

  return (
    <>
      {infoModalVisible ? (
        <>
          <Pressable style={styles.modalUnderlay} onPress={closeModal} />
          <View style={styles.modal}>
            <TouchableOpacity onPress={closeModal}>
              <MaterialCommunityIcons
                style={styles.close}
                name="close"
                size={20}
                color={colors.lightGray}
              />
            </TouchableOpacity>
            <AppText style={styles.modalHeader}>
              {infoModalContent.header}
            </AppText>
            <AppText>{infoModalContent.text}</AppText>
          </View>
        </>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: -10,
    right: -10,
  },
  modal: {
    position: 'absolute',
    display: 'flex',
    alignSelf: 'center',
    top: 150,
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    paddingBottom: 40,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  modalUnderlay: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.borderGray,
    position: 'absolute',
  },
  modalHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
});

export default InfoModal;
