import React, { useRef, useState } from 'react';
import { StyleSheet, Animated, View, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../config/colors';
import useFadeAnimation from '../hooks/useFadeAnimation';
import AppText from './AppText';
import Button from './Button';
import storageService from '../utility/storageService';

// this will contain the next, skip and do not show agin buttons
// will also contain the texts and the coordinates of the pulse and text box.

function TutorialOverlay({
  showTutorial,
  setShowTutorial,
  content,
  skipTutorialKey,
  showCallToAction,
  setShowCallToAction,
  callToActionContent,
}) {
  const { fadeAnim, showElement } = useFadeAnimation(showTutorial);
  const {
    fadeAnim: fadeAnimCallToAction,
    showElement: showElementCallToAction,
  } = useFadeAnimation(showCallToAction && !showElement);

  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const currentContent = content[currentContentIndex];
  const tooltipPosition = useRef(
    new Animated.ValueXY(content[0].tooltipContainerPosition)
  ).current;
  const pulsePosition = useRef(
    new Animated.ValueXY(content[0].pulsePosition)
  ).current;

  const handleNextPress = () => {
    const nextIndex = (currentContentIndex + 1) % content.length;
    setCurrentContentIndex(nextIndex);

    const newTooltipPosition = content[nextIndex].tooltipContainerPosition;
    const newPulsePosition = content[nextIndex].pulsePosition;

    Animated.spring(pulsePosition, {
      toValue: newPulsePosition,
      useNativeDriver: false,
    }).start();

    Animated.spring(tooltipPosition, {
      toValue: newTooltipPosition,
      useNativeDriver: false,
    }).start();
  };

  const handleDonePress = () => {
    setShowTutorial(false);
    setTimeout(() => {
      setShowCallToAction(false);
    }, 5000);
  };

  const handleDontShowAgain = async () => {
    await storageService.storeItem({ key: skipTutorialKey, value: 'true' });
    handleDonePress();
  };

  if (showElement)
    return (
      <Animated.View
        style={[styles.fullscreen, styles.container, { opacity: fadeAnim }]}
      >
        <Animated.View
          style={[
            styles.pulseContainer,
            pulsePosition.getLayout(),
            !currentContent.pulseVisible && { display: 'none' },
          ]}
        >
          <LottieView
            autoPlay
            loop
            source={require('../assets/animations/pulse.json')}
            style={styles.pulse}
          />
        </Animated.View>
        <Animated.View
          style={[styles.tooltipContainer, tooltipPosition.getLayout()]}
        >
          <View style={styles.tooltipHeaderContainer}>
            <AppText style={[styles.tooltipHeader, { width: '85%' }]}>
              {currentContent.tooltipHeader}
            </AppText>
            <AppText
              style={styles.tooltipHeader}
            >{`${currentContent.position}/${content.length}`}</AppText>
          </View>
          <AppText style={styles.tooltipText}>
            {currentContent.tooltipText}
          </AppText>
          <View style={styles.controlsContainer}>
            <View style={styles.navControlsContainer}>
              <View>
                <TouchableOpacity onPress={handleDonePress}>
                  <AppText style={[styles.tooltipText, styles.skipButton]}>
                    Skip
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDontShowAgain}>
                  <AppText
                    style={[
                      styles.tooltipText,
                      styles.skipButton,
                      { marginTop: 7 },
                    ]}
                  >
                    Don't show again
                  </AppText>
                </TouchableOpacity>
              </View>
              {currentContent.position === content.length ? (
                <Button
                  onPress={handleDonePress}
                  style={styles.button}
                  color="#174869"
                  textStyle={styles.buttonText}
                >
                  Done
                </Button>
              ) : (
                <Button
                  onPress={handleNextPress}
                  style={styles.button}
                  color="#174869"
                  textStyle={styles.buttonText}
                >
                  Next
                </Button>
              )}
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    );
  if (showElementCallToAction)
    return (
      <Animated.View
        style={[
          styles.callToActionContainer,
          callToActionContent.position,
          { opacity: fadeAnimCallToAction },
        ]}
      >
        <View style={styles.infoBox}>
          <AppText style={styles.tooltipText}>
            {callToActionContent.text}
          </AppText>
        </View>
        <View style={styles.pointerContainer}>
          <View style={styles.pointer} />
        </View>
      </Animated.View>
    );
}

const styles = StyleSheet.create({
  callToActionContainer: {
    position: 'absolute',
  },
  infoBox: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  pointerContainer: {
    position: 'absolute',
    top: '50%',
    right: -10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    transform: [{ translateY: -10 }],
  },
  pointer: {
    width: 14,
    height: 14,
    backgroundColor: colors.primary,
    transform: [{ rotate: '45deg' }],
  },

  container: {
    backgroundColor: colors.nearTransparent,
    position: 'absolute',
  },
  fullscreen: {
    width: '100%',
    height: '100%',
  },
  pulseContainer: {
    position: 'absolute',
  },
  pulse: {
    width: 60,
    height: 60,
  },
  controlsContainer: {
    marginTop: 20,
  },
  navControlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  button: {
    width: '25%',
    height: 25,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '400',
  },
  skipButton: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    width: '65%',
    height: 'auto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tooltipHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  tooltipHeader: {
    color: colors.white,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  tooltipText: {
    color: colors.white,
    fontSize: 14,
  },
});

export default TutorialOverlay;
