import api from './api';

const signup = (user) => api.post('/users/register', user);

const login = (credentials) => api.post('/users/login', credentials);

export default {
  signup,
  login,
};
