// hooks/useSettingsStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings } from '../types/settings';

const useSettingsStorage = () => {
  // Save settings data to AsyncStorage
  const saveSettingsData = async (value: Settings): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('settingsData', jsonValue);
      console.log('Settings data saved successfully');
    } catch (e) {
      console.error('Failed to save settings data to storage', e);
    }
  };

  // Fetch settings data from AsyncStorage
  const getSettingsData = async (): Promise<Settings | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem('settingsData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Failed to fetch settings data from storage', e);
      return null;
    }
  };

  // Clear settings data from AsyncStorage
  const clearSettingsData = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('settingsData');
      console.log('Settings data cleared successfully');
    } catch (e) {
      console.error('Failed to clear settings data from storage', e);
    }
  };

  return {
    saveSettingsData,
    getSettingsData,
    clearSettingsData,
  };
};

export default useSettingsStorage;