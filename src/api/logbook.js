import api from './api';

const create = (logbook) => api.post('/logbooks', logbook);

const getLogbooks = (userId) => api.get(`/logbooks?userId=${userId}`);

const getLogbook = (logbookId, startDate, endDate) =>
  api.get(`/logbooks/${logbookId}?startDate=${startDate}&endDate=${endDate}`);

export default {
  create,
  getLogbooks,
  getLogbook,
};
