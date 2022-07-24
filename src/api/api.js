import { create } from 'apisauce';
import authStorage from '../utility/authStorage';

const api = create({
  baseURL: 'http://192.168.100.8:3000',
});

api.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers['token'] = authToken;
});

export default api;
