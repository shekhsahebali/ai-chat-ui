import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsStore {
  apiKey: string;
  endpoint: string;
  defaultModel: string;
  setApiKey: (key: string) => void;
  setEndpoint: (endpoint: string) => void;
  setDefaultModel: (model: string) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      apiKey: '',
      endpoint: '',
      defaultModel: 'best-for-chat',
      setApiKey: (key) => set({ apiKey: key }),
      setEndpoint: (endpoint) => set({ endpoint }),
      setDefaultModel: (model) => set({ defaultModel: model }),
    }),
    {
      name: 'settings-storage',
    }
  )
);
