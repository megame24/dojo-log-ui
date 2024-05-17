import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import CustomModal from './CustomModal';
import Icon from './Icon';
import Button from './Button';
import constants from '../config/constants';

const CreateRewardsPrompt = ({
  showCreateRewardsPrompt,
  setShowCreateRewardsPrompt,
  navigation,
  logbookId,
}) => {
  return (
    <CustomModal
      modalVisible={showCreateRewardsPrompt}
      setModalVisible={setShowCreateRewardsPrompt}
    >
      <View style={styles.headerContainer}>
        <AppText style={styles.headerText}>Create a reward first</AppText>
        <Icon size={25} color={colors.primary} name="alert-circle-outline" />
      </View>
      <AppText>
        Before setting your goal, I recommend creating a reward that can be
        linked to your goal.{'\n'}
        Linking a reward to your goal is a great way to boost motivation!{'\n'}
        {'\n'}
        Want to create a reward?
      </AppText>
      <Button
        onPress={() => {
          navigation.navigate(constants.REWARDS_TAB, {
            screen: constants.REWARDS_SCREEN,
            params: {
              showBackButton: true,
              redirectOption: {
                screen: constants.LOGBOOKS_TAB,
                params: {
                  screen: constants.CREATE_GOAL_SCREEN,
                  params: { logbookId },
                },
              },
            },
          });
          setShowCreateRewardsPrompt(false);
        }}
        style={styles.modalButton}
        color={colors.secondary}
        textStyle={{ fontSize: 16 }}
      >
        Yes, take me there
      </Button>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    marginRight: 8,
  },
  modalButton: {
    height: 34,
    marginTop: 20,
  },
});

export default CreateRewardsPrompt;
