import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

const key = 'authToken';

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async () => {
  const token = await getToken();
  if (token) return jwtDecode(token);
  return null;
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log(error);
  }
};

const removeToken = async () => {
  try {
    return await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log(error);
  }
};

export default {
  removeToken,
  storeToken,
  getUser,
  getToken,
};
