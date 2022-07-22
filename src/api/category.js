import api from './api';

const create = (category) => api.post('/categories', category);

export default {
  create,
};
