import { useEffect } from 'react';
import constants from '../config/constants';
import storageService from '../utility/storageService';

const setQuickLogDefault = async () => {
  const quickLogDataJSON = await storageService.getItem(
    constants.QUICK_LOG_DATA
  );
  if (quickLogDataJSON) return;
  await storageService.storeItem({
    key: constants.QUICK_LOG_DATA,
    value: JSON.stringify({
      message: 'Check in',
      durationOfWork: 30,
    }),
  });
};

const useSetAppDefaults = () => {
  useEffect(() => {
    setQuickLogDefault();
  }, []);
};

export default useSetAppDefaults;
