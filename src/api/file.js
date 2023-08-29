import api from './api';

const deleteFile = (fileId) => api.delete(`/files/${fileId}`);

const downloadFile = (fileId) => api.get(`/files/${fileId}/download`);

export default { deleteFile, downloadFile };
