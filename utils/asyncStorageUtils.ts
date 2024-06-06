import AsyncStorage from '@react-native-async-storage/async-storage';

export const readData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      console.log(JSON.parse(value));
    }
  } catch (e) {
    console.log('Failed to fetch the input from storage');
  }
};

export const storeData = async (key: string, value: Object) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('Error saving data');
  }
};

export const storeMultipleData = async (items: [string, string][]) => {
  try {
    await AsyncStorage.multiSet(items);
  } catch (e) {
    console.log('Error saving data');
  }
};
