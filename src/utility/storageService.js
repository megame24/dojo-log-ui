import { Storage } from 'expo-storage';

const storeItem = async (payload) => {
  try {
    await Storage.setItem(payload);
  } catch (error) {
    console.log(error);
  }
};

const getItem = async (key) => {
  try {
    return await Storage.getItem({ key });
  } catch (error) {
    console.log(error);
  }
};

const removeItem = async (key) => {
  try {
    return await Storage.removeItem({ key });
  } catch (error) {
    console.log(error);
  }
};

export default {
  storeItem,
  getItem,
  removeItem,
};
