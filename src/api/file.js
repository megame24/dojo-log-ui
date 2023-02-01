import api from './api';

const deleteFile = (fileId) => api.delete(`/files/${fileId}`);

export default { deleteFile };
