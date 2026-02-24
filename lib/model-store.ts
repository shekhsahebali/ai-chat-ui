import { create } from "zustand";

interface ModelStore {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

export const useModelStore = create<ModelStore>((set) => ({
  selectedModel: "best-for-chat",
  setSelectedModel: (model) => set({ selectedModel: model }),
}));
