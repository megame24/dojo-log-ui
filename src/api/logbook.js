import api from './api';

const create = (logbook) => api.post('/logbooks', logbook);

const update = (logbook) => api.put(`/logbooks/${logbook.id}`, logbook);

const getLogbooks = (userId, startDate, endDate) =>
  api.get(
    `/logbooks?userId=${userId}&startDateString=${startDate}&endDateString=${endDate}`
  );

const getLogbook = (logbookId, startDate, endDate, year) =>
  api.get(
    `/logbooks/${logbookId}?startDateString=${startDate}&endDateString=${endDate}&year=${year}`
  );

const getEarliestLogbookYear = () => api.get('/logbooks/earliestLogbookYear');

const deleteLogbook = (logbookId) => api.delete(`/logbooks/${logbookId}`);

const createLog = (logbookId, log) =>
  api.post(`/logbooks/${logbookId}/logs`, log);

const createGoal = (logbookId, goal) =>
  api.post(`/logbooks/${logbookId}/goals`, goal);

const getLogs = (logbookId, startDate, endDate) =>
  api.get(
    `/logbooks/${logbookId}/logs?startDate=${startDate}&endDate=${endDate}`
  );

const deleteLog = (logbookId, logId) =>
  api.delete(`/logbooks/${logbookId}/logs/${logId}`);

const updateLog = (logbookId, logId, log) =>
  api.put(`/logbooks/${logbookId}/logs/${logId}`, log);

const getGoal = (logbookId, goalId) =>
  api.get(`/logbooks/${logbookId}/goals/${goalId}`);

const updateGoal = (logbookId, goalId, goal) =>
  api.put(`/logbooks/${logbookId}/goals/${goalId}`, goal);

const getLogbookNotification = (logbookId) =>
  api.get(`/logbooks/${logbookId}/notifications`);

const saveLogbookNotifications = (logbookId, notifications) =>
  api.put(`/logbooks/${logbookId}/notifications`, { notifications });

const deleteLogbookNotifications = (logbookId) =>
  api.delete(`/logbooks/${logbookId}/notifications`);

export default {
  create,
  getLogbooks,
  getLogbook,
  getEarliestLogbookYear,
  update,
  deleteLogbook,
  createLog,
  createGoal,
  getLogs,
  deleteLog,
  updateLog,
  getGoal,
  updateGoal,
  getLogbookNotification,
  saveLogbookNotifications,
  deleteLogbookNotifications,
};
