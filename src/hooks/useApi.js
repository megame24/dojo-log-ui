import { useState } from 'react';
import constants from '../config/constants';

function useApi(apiFunc) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function request(...args) {
    setError('');
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok)
      setError(response.data?.message || constants.UNEXPECTED_ERROR);

    return response;
  }

  return {
    request,
    loading,
    error,
  };
}

export default useApi;
