import React, { useState } from 'react';

import ActivityIndicator from '../components/ActivityIndicator';
import ErrorMessage from '../components/forms/ErrorMessage';
import Screen from '../components/Screen';
import constants from '../config/constants';
import useApi from '../hooks/useApi';
import usersApi from '../api/users';
import BackButton from '../components/BackButton';
import ScreenHeader from '../components/ScreenHeader';
import useAuth from '../hooks/useAuth';
import AppText from '../components/AppText';
import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';
import Separator from '../components/Separator';
import Button from '../components/Button';
import CustomModal from '../components/CustomModal';

function AccountSettingsScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const deleteAccountApi = useApi(usersApi.deleteAccount);
  const {
    user: { id },
    logout,
  } = useAuth();

  const deleteAccount = async () => {
    const { ok } = await deleteAccountApi.request(id);

    if (!ok) return;
    logout();
  };

  return (
    <>
      <ScreenHeader
        header={constants.ACCOUNT_SETTINGS_SCREEN}
        LeftIcon={() => <BackButton onPress={() => navigation.goBack()} />}
      />
      <ActivityIndicator visible={deleteAccountApi.loading} />
      <Screen>
        <ErrorMessage
          error={deleteAccountApi.error}
          visible={!!deleteAccountApi.error}
        />
        <AppText style={styles.deleteHeader}>Delete account</AppText>
        <Separator />
        <AppText style={styles.deleteText}>
          Deleting your account is a permanent change. Please be certain!
        </AppText>
        <Button
          style={styles.button}
          color={colors.red}
          onPress={() => setModalVisible(true)}
        >
          Delete your account
        </Button>
      </Screen>
      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <AppText style={styles.modalHeader}>Delete account</AppText>
        <AppText>
          Your data will be permanently deleted, do you wish to continue?
        </AppText>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => setModalVisible(false)}
            style={styles.modalButton}
          >
            No
          </Button>
          <Button
            onPress={deleteAccount}
            style={styles.modalButton}
            color={colors.red}
            outline
          >
            Yes
          </Button>
        </View>
      </CustomModal>
    </>
  );
}

const styles = StyleSheet.create({
  deleteHeader: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 24,
    color: colors.red,
  },
  deleteText: {
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
  modalButton: {
    width: '40%',
    height: 34,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  modalHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
});

export default AccountSettingsScreen;
