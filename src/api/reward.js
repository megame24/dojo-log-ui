import api from './api';

const create = (reward) => api.post('/rewards', reward);

const getRewards = () => api.get('/rewards');

const deleteReward = (rewardId) => api.delete(`/rewards/${rewardId}`);

const update = (reward, rewardId) => api.put(`/rewards/${rewardId}`, reward);

export default {
  create,
  getRewards,
  deleteReward,
  update,
};
