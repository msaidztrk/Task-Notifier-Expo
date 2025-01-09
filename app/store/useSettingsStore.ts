// stores/useSettingsStore.ts
import { create } from 'zustand';
import { Settings } from '../types/settings';
import useSettingsStorage from '../hooks/useSettingsStorage';

interface SettingsStore {
  settingsData: Settings | null;
  fetchSettingsData: () => Promise<void>;
  saveSettingsData: (value: Settings) => Promise<void>;
  clearSettingsData: () => Promise<void>;
}

const useSettingsStore = create<SettingsStore>((set) => {
  const { getSettingsData, saveSettingsData, clearSettingsData } = useSettingsStorage();

  return {
    settingsData: null,

    // Fetch settings data from AsyncStorage
    fetchSettingsData: async () => {
      const data = await getSettingsData();
      set({ settingsData: data });
    },

    // Save settings data to AsyncStorage
    saveSettingsData: async (value: Settings) => {
      await saveSettingsData(value);
      set({ settingsData: value });
    },

    // Clear settings data from AsyncStorage
    clearSettingsData: async () => {
      await clearSettingsData();
      set({ settingsData: null });
    },
  };
});

export default useSettingsStore;