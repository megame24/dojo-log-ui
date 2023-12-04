import api from './api';

const signup = (user) => api.post('/users/register', user);

const login = (credentials) => api.post('/users/login', credentials);

const googleSignInVerify = (idToken) =>
  api.post('/users/google-sign-in-verify', idToken);

const forgotPassword = (email) => api.post('/users/forgot-password', email);

const verifyUser = (code, userId) => api.put(`/users/${userId}/verify`, code);

const resendCode = (userId) => api.get(`/users/${userId}/send-verification`);

const resetPassword = (passwordDetails, userId) =>
  api.put(`/users/${userId}/reset-password`, passwordDetails);

const updateProfile = (user) => api.put(`/users/${user.id}/profile`, user);

export default {
  signup,
  login,
  forgotPassword,
  verifyUser,
  resendCode,
  resetPassword,
  updateProfile,
  googleSignInVerify,
};
