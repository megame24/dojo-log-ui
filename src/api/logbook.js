import api from './api';

const create = (logbook) => api.post('/logbooks', logbook);

const getLogbooks = (userId) => api.get(`/logbooks?userId=${userId}`);

export default {
  create,
  getLogbooks,
};
