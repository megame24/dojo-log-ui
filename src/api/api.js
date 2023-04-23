import { create } from 'apisauce';
import authStorage from '../utility/authStorage';
import dateService from '../utility/dateService';

const api = create({
  baseURL: 'http://192.168.100.4:3000',
});

api.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers['token'] = authToken;
  request.headers['timezone'] = dateService.getTimezone();
});

export default api;
