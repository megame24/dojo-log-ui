import { useContext, useState } from 'react';

import useAuth from './useAuth';
import constants from '../config/constants';
import AuthContext from '../context/authContext';
import ConnectionContext from '../context/connectionContext';

function useApi(apiFunc, defaultResponse = []) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const { setSessionExpired } = useContext(AuthContext);
  const { isNotConnected } = useContext(ConnectionContext);

  async function request(...args) {
    if (isNotConnected) return { data: defaultResponse, ok: true };

    setError('');
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      const errorMessage = response.data?.message || constants.UNEXPECTED_ERROR;
      if (errorMessage.toLowerCase() === constants.INVALID_TOKEN) {
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
