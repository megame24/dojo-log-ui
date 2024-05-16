import React from 'react';
import ScreenHeader from '../components/ScreenHeader';
import HeaderMenu from '../components/HeaderMenu';
import Screen from '../components/Screen';
import FloatingButton from '../components/FloatingButton';
import colors from '../config/colors';
import constants from '../config/constants';
import Icon from '../components/Icon';
import UserInitials from '../components/UserInitials';
import useAuth from '../hooks/useAuth';
import AppText from '../components/AppText';
import { StyleSheet, View } from 'react-native';
import LabelAndContent from '../components/LabelAndContent';

function ProfileScreen({ navigation }) {
  const { user } = useAuth();

  return (
    <>
      <ScreenHeader
        header="Profile"
        LeftIcon={() => (
          <HeaderMenu onPress={() => navigation.toggleDrawer()} />
        )}
      />
      <Screen floatingButtonRoom={60}>
        <View style={styles.initialsContainer}>
          <UserInitials name={user.name} size={100} fontSize={40} />
          <AppText style={styles.name}>{user.name}</AppText>
        </View>
        <View>
          <LabelAndContent
            label="Username"
            Content={() => <AppText>{user.username}</AppText>}
          />
          <LabelAndContent
            label="Email address"
            Content={() => <AppText>{user.email}</AppText>}
          />
        </View>
      </Screen>
      <FloatingButton
        size={35}
        color={colors.floatingButtonGray}
        onPress={() => navigation.navigate(constants.UPDATE_PROFILE_SCREEN)}
        Icon={() => (
          <Icon name="pen" isFontAwesome size={15} color={colors.white} />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  initialsContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 30,
  },
  name: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default ProfileScreen;
