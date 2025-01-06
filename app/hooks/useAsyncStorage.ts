import AsyncStorage from '@react-native-async-storage/async-storage'; 


export const createSettingsData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      console.log('Data saved successfully');
    } catch (e) {
      console.error('Failed to save the data to the storage', e);
    }
  }; 

  export const getSettingsData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('settingsData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Failed to fetch the data from storage', e);
    }
  };