import { useEffect, useState } from 'react';
import storageService from '../utility/storageService';

const useSkipTutorial = (skipTutorialKey) => {
  const [skipTutorial, setSkipTutorial] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const setSkipTutorialAsync = async () => {
    const skipTutorialConfigJSON = await storageService.getItem(
      skipTutorialKey
    );
    if (!skipTutorialConfigJSON) {
      setSkipTutorial(false);
      setIsReady(true);
    } else {
      const skipTutorialConfig = JSON.parse(skipTutorialConfigJSON);
      setSkipTutorial(skipTutorialConfig);
      setIsReady(true);
    }
  };

  useEffect(() => {
    setSkipTutorialAsync();
  }, []);

  return { skipTutorial, isReady };
};

export default useSkipTutorial;
