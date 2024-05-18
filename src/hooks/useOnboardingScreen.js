import { useState } from 'react';
import { Dimensions } from 'react-native';

export default function useOnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const { width } = Dimensions.get('window');

  const setCurrentPageHandler = (event) => {
    const { x } = event.nativeEvent.contentOffset;
    const nextPage = Math.round(x / width);
    setCurrentPage(nextPage);
  };

  return {
    currentPage,
    windowWidth: width,
    setCurrentPageHandler,
  };
}
