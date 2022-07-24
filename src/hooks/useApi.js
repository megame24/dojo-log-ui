import { useContext, useState } from 'react';

import useAuth from './useAuth';
import constants from '../config/constants';
import ExpiredSessionContext from '../context/expiredSessionContext';

function useApi(apiFunc) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const { setSessionExpired } = useContext(ExpiredSessionContext);

  async function request(...args) {
    setError('');
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      const errorMessage = response.data?.message || constants.UNEXPECTED_ERROR;
      if (errorMessage.toLowerCase() === 'invalid token') {
        setSessionExpired(true);
        logout();
      } else {
        setError(errorMessage);
      }
    }

    return response;
  }

  return {
    request,
    loading,
    error,
  };
}

export default useApi;
