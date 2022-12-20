import api from './api';

const create = (reward) => api.post('/rewards', reward);

const getRewards = () => api.get('/rewards');

export default {
  create,
  getRewards,
};
