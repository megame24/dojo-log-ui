import api from './api';

const create = (logbook) => api.post('/logbooks', logbook);

export default {
  create,
};
