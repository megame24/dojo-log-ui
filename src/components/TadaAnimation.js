import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
const TadaAnimation = ({ play, setPlay }) => {
  useEffect(() => {
    if (play) {
      setTimeout(() => {
        setPlay(false);
      }, 7800);
    }
  }, [play]);

  return (
    play && (
      <LottieView
        autoPlay={play}
        source={require('../assets/animations/tada.json')}
        resizeMode="cover"
      />
    )
  );
};

export default TadaAnimation;
