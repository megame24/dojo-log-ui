import AsyncStorage from '@react-native-async-storage/async-storage'; // replace!!!

const storeItem = async (payload) => {
  try {
    await AsyncStorage.setItem(payload.key, payload.value);
  } catch (error) {
    console.log(error);
  }
};

const getItem = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
};

const removeItem = async (key) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

const multiRemove = async (keys) => {
  try {
    return await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.log(error);
  }
};

const clearLogbookCache = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const logbookCacheKeys = keys.filter((key) => key.startsWith('logbook'));
    await AsyncStorage.multiRemove(logbookCacheKeys);
  } catch (error) {
    console.log(error);
  }
};

export default {
  storeItem,
  getItem,
  removeItem,
  multiRemove,
  clearLogbookCache,
};
