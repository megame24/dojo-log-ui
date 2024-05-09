import React from 'react';
import { StyleSheet, Animated, Pressable } from 'react-native';
import colors from '../config/colors';
import constants from '../config/constants';
import useFadeAnimation from '../hooks/useFadeAnimation';
import FloatingButton from './FloatingButton';
import Icon from './Icon';

function LogbookAddOptionsOverlay({
  navigation,
  showAddOptions,
  setShowAddOptions,
  logbookId,
}) {
  const { fadeAnim, showElement } = useFadeAnimation(showAddOptions);

  return (
    showElement && (
      <>
        <Animated.View
          style={[
            styles.fullscreen,
            styles.createOptionsUnderlay,
            { opacity: fadeAnim },
          ]}
        >
          <Pressable
            onPress={() => setShowAddOptions(false)}
            style={[styles.fullscreen]}
          />
        </Animated.View>
        <Animated.View style={{ opacity: fadeAnim }}>
          <FloatingButton
            style={styles.editButton}
            size={35}
            color={colors.primary}
            onPress={() => {
              navigation.navigate(constants.CREATE_GOAL_SCREEN, {
                logbookId,
              });
              setShowAddOptions(false);
            }}
            Icon={() => (
              <Icon
                name="feather-alt"
                isFontAwesome
                size={15}
                color={colors.white}
              />
            )}
            label="Set a goal"
          />
          <FloatingButton
            onPress={() => {
              navigation.navigate(constants.CREATE_LOG_SCREEN, {
                logbookId,
              });
              setShowAddOptions(false);
            }}
            Icon={() => (
              <Icon name="pen-nib" isFontAwesome color={colors.white} />
            )}
            label="Log today's progress"
          />
        </Animated.View>
      </>
    )
  );
}

const styles = StyleSheet.create({
  editButton: {
    bottom: 95,
    right: 40,
  },
  createOptionsUnderlay: {
    backgroundColor: colors.lightGray,
    position: 'absolute',
  },
  fullscreen: {
    width: '100%',
    height: '100%',
  },
});

export default LogbookAddOptionsOverlay;
