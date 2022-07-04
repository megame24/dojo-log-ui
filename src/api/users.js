import api from './api';

const signup = (user) => api.post('/users/register', user);

const login = (credentials) => api.post('/users/login', credentials);

const forgotPassword = (email) => api.post('/users/forgot-password', email);

export default {
  signup,
  login,
  forgotPassword,
};
