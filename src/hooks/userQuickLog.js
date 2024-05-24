import constants from '../config/constants';
import storageService from '../utility/storageService';
import useApi from './useApi';
import logbookApi from '../api/logbook';
import dateService from '../utility/dateService';
import { useState } from 'react';

const useQuickLog = (logbookId) => {
  const [success, setSuccess] = useState(false);
  const createLogApi = useApi(logbookApi.createLog);

  const quickLog = async () => {
    setSuccess(false);
    let quickLogDataJSON;
    quickLogDataJSON = await storageService.getItem(
      `${constants.QUICK_LOG_DATA}${logbookId}`
    );
    if (!quickLogDataJSON) {
      quickLogDataJSON = await storageService.getItem(constants.QUICK_LOG_DATA);
    }
    const quickLogData = JSON.parse(quickLogDataJSON);
    const logFormData = new FormData();
    logFormData.append('message', quickLogData.message);
    logFormData.append('durationOfWorkInMinutes', quickLogData.durationOfWork);
    logFormData.append('date', dateService.now());
    const { ok } = await createLogApi.request(logbookId, logFormData);

    if (ok) setSuccess(true);
    await storageService.multiRemove([
      constants.LOGBOOKS_DATA_CACHE,
      `${
        constants.LOGBOOK_DATA_CACHE
      }_${logbookId}_${new Date().getFullYear()}`,
    ]);
  };

  return {
    quickLogLoading: createLogApi.loading,
    quickLogError: createLogApi.error,
    quickLogSuccess: success,
    quickLog,
  };
};

export default useQuickLog;
