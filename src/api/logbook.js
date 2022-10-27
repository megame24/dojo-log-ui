import api from './api';

const create = (logbook) => api.post('/logbooks', logbook);

const getLogbooks = (userId) => api.get(`/logbooks?userId=${userId}`);

const getLogbook = (logbookId, startDate, endDate) =>
  api.get(
    `/logbooks/${logbookId}?startDateString=${startDate}&endDateString=${endDate}`
  );

const getEarliestLogbookYear = () => api.get('/logbooks/earliestLogbookYear');

export default {
  create,
  getLogbooks,
  getLogbook,
  getEarliestLogbookYear,
};
