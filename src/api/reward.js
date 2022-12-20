import api from './api';

const create = (reward) => api.post('/rewards', reward);

const getRewards = () => api.get('/rewards');

const deleteReward = (rewardId) => api.delete(`/rewards/${rewardId}`);

export default {
  create,
  getRewards,
  deleteReward,
};
