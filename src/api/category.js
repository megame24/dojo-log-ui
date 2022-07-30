import api from './api';

const create = (category) => api.post('/categories', category);

const getAll = () => api.get('/categories');

const deleteCategory = (categoryId) => api.delete(`/categories/${categoryId}`);

export default {
  create,
  getAll,
  deleteCategory,
};
