import api from './api';

const signup = (user) => api.post('/users/register', user);

const login = (credentials) => api.post('/users/login', credentials);

const forgotPassword = (email) => api.post('/users/forgot-password', email);

const verifyUser = (code, userId) => api.put(`/users/${userId}/verify`, code);

const resendCode = (userId) => api.get(`/users/${userId}/send-verification`);

export default {
  signup,
  login,
  forgotPassword,
  verifyUser,
  resendCode,
};
