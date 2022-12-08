import api from './api';

const create = (logbook) => api.post('/logbooks', logbook);

const update = (logbook) => api.put(`/logbooks/${logbook.id}`, logbook);

const getLogbooks = (userId) => api.get(`/logbooks?userId=${userId}`);

const getLogbook = (logbookId, startDate, endDate) =>
  api.get(
    `/logbooks/${logbookId}?startDateString=${startDate}&endDateString=${endDate}`
  );

const getEarliestLogbookYear = () => api.get('/logbooks/earliestLogbookYear');

const deleteLogbook = (logbookId) => api.delete(`/logbooks/${logbookId}`);

const createLog = (logbookId, log) =>
  api.post(`/logbooks/${logbookId}/logs`, log);

export default {
  create,
  getLogbooks,
  getLogbook,
  getEarliestLogbookYear,
  update,
  deleteLogbook,
  createLog,
};
