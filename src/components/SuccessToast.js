import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';

const SuccessToast = ({ visible, message, onClose }) => {
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  }, [visible]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.toast}>
          <Text style={styles.textStyle}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
  },
  toast: {
    backgroundColor: '#27ae60',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SuccessToast;
