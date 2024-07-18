import api from './api';

const signup = (user) => api.post('/users/register', user);

const login = (credentials) => api.post('/users/login', credentials);

const googleSignInVerify = (idToken) =>
  api.post('/users/google-sign-in-verify', idToken);

const appleSignInVerify = (payload) =>
  api.post('/users/apple-sign-in-verify', payload);

const forgotPassword = (email) => api.post('/users/forgot-password', email);

const verifyUser = (code, userId) => api.put(`/users/${userId}/verify`, code);

const resendCode = (userId) => api.get(`/users/${userId}/send-verification`);

const resetPassword = (passwordDetails, userId) =>
  api.put(`/users/${userId}/reset-password`, passwordDetails);

const updateProfile = (user) => api.put(`/users/${user.id}/profile`, user);

const changePassword = (credentials, userId) =>
  api.put(`/users/${userId}/change-password`, credentials);

const deleteAccount = (userId) => api.delete(`/users/${userId}/account`);

const createExpoNotificationToken = (token, userId) =>
  api.post(`/users/${userId}/expo-notification-token`, token);

export default {
  signup,
  login,
  forgotPassword,
  verifyUser,
  resendCode,
  resetPassword,
  updateProfile,
  googleSignInVerify,
  appleSignInVerify,
  changePassword,
  deleteAccount,
  createExpoNotificationToken,
};
