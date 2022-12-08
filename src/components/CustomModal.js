import React from 'react';
import {
  StyleSheet,
  Animated,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import colors from '../config/colors';
import useFadeAnimation from '../hooks/useFadeAnimation';
import Icon from './Icon';

function CustomModal({
  modalVisible,
  setModalVisible,
  setInfoModalContent = () => {},
  children,
}) {
  const closeModal = () => {
    setModalVisible(false);
    setInfoModalContent({});
  };

  const { fadeAnim, showElement } = useFadeAnimation(modalVisible, closeModal);

  return (
    <>
      {showElement ? (
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
              onPress={() => setModalVisible(false)}
            />
          </Animated.View>
          <Animated.View style={[styles.modal, { opacity: fadeAnim }]}>
            <TouchableOpacity
              style={styles.close}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close-outline" size={25} color={colors.lightGray} />
            </TouchableOpacity>
            {children}
          </Animated.View>
        </>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 5,
    right: 5,
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
    backgroundColor: colors.lightGray,
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

export default CustomModal;
