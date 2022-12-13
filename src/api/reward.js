import api from './api';

const create = (reward) => api.post('/rewards', reward);

export default {
  create,
};
