import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import AppText from './AppText';
import InfoModalContext from '../context/infoModalContext';
import CustomModal from './CustomModal';

function InfoModal() {
  const {
    infoModalVisible,
    setInfoModalVisible,
    infoModalContent,
    setInfoModalContent,
  } = useContext(InfoModalContext);

  return (
    <CustomModal
      modalVisible={infoModalVisible}
      setModalVisible={setInfoModalVisible}
      setInfoModalContent={setInfoModalContent}
    >
      <AppText style={styles.modalHeader}>{infoModalContent?.header}</AppText>
      <AppText>{infoModalContent?.text}</AppText>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
});

export default InfoModal;
