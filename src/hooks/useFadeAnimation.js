import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

function useFadeAnimation(elementVisible, finishCallback = () => {}) {
  const [showElement, setShowElement] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (elementVisible) {
      setShowElement(true);
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
        if (finished) {
          setShowElement(false);
          finishCallback();
        }
      });
    }
  }, [elementVisible]);

  return {
    fadeAnim,
    showElement,
  };
}

export default useFadeAnimation;
