import { useEffect, useState } from 'react';
import storageService from '../utility/storageService';

const useSkipTutorial = (skipTutorialKey) => {
  const [skipTutorial, setSkipTutorial] = useState(true);

  const setSkipTutorialAsync = async () => {
    const skipTutorialConfigJSON = await storageService.getItem(
      skipTutorialKey
    );
    if (!skipTutorialConfigJSON) setSkipTutorial(false);
    const skipTutorialConfig = JSON.parse(skipTutorialConfigJSON);
    setSkipTutorial(skipTutorialConfig);
  };

  useEffect(() => {
    setSkipTutorialAsync();
  }, []);

  return { skipTutorial };
};

export default useSkipTutorial;
