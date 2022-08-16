import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import colors from '../config/colors';
import AppText from './AppText';
import InfoModalContext from '../context/infoModalContext';
import Icon from './Icon';

function InfoModal() {
  const [showModal, setShowModal] = useState(false);
  const {
    infoModalVisible,
    setInfoModalVisible,
    infoModalContent,
    setInfoModalContent,
  } = useContext(InfoModalContext);

  const closeModal = () => {
    setShowModal(false);
    setInfoModalVisible(false);
    setInfoModalContent({});
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (infoModalVisible) {
      setShowModal(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        easing: Easing.ease,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        easing: Easing.ease,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) closeModal();
      });
    }
  }, [infoModalVisible]);

  return (
    <>
      {showModal ? (
        <>
          <Animated.View
            style={[
              styles.fullscreen,
              styles.modalUnderlay,
              { opacity: fadeAnim },
            ]}
          >
            <Pressable
              style={styles.fullscreen}
              onPress={() => setInfoModalVisible(false)}
            />
          </Animated.View>
          <Animated.View style={[styles.modal, { opacity: fadeAnim }]}>
            <TouchableOpacity
              style={styles.close}
              onPress={() => setInfoModalVisible(false)}
            >
              <Icon name="close-outline" size={25} color={colors.lightGray} />
            </TouchableOpacity>
            <AppText style={styles.modalHeader}>
              {infoModalContent.header}
            </AppText>
            <AppText>{infoModalContent.text}</AppText>
          </Animated.View>
        </>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
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
    backgroundColor: colors.borderGray,
    position: 'absolute',
  },
  fullscreen: {
    width: '100%',
    height: '100%',
  },
  modalHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
});

export default InfoModal;
