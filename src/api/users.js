import api from './api';

const signup = (user) => api.post('/users/register', user);

export default {
  signup,
};
