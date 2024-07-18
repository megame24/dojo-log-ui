import { create } from 'apisauce';
import authStorage from '../utility/authStorage';
import dateService from '../utility/dateService';

// baseURL: 'http://192.168.100.24:3000',
// baseURL: 'https://stage-api.dojologs.com',
const api = create({
  baseURL: 'http://192.168.100.24:3000',
});

api.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers['token'] = authToken;
  request.headers['timezone'] = dateService.getTimezone();
});

export default api;
