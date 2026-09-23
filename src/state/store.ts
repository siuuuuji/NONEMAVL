import { create } from "zustand";
import type { Scene, SelectedTemplate, SplitMethod } from "../types";

interface NonemavlStore {
  scenes: Scene[];
  activeSceneId: string | null;
  template: SelectedTemplate | null;
  textInput: string;
  splitMethod: SplitMethod;

  setScenes: (scenes: Scene[]) => void;
  setActiveScene: (id: string) => void;
  updateScene: (id: string, updates: Partial<Scene>) => void;
  setTemplate: (template: SelectedTemplate) => void;
  setTextInput: (text: string) => void;
  setSplitMethod: (method: SplitMethod) => void;
  reset: () => void;
}

const initialState = {
  scenes: [],
  activeSceneId: null,
  template: null,
  textInput: "",
  splitMethod: "paragraph" as SplitMethod,
};

export const useStore = create<NonemavlStore>((set) => ({
  ...initialState,

  setScenes: (scenes) => set({ scenes, activeSceneId: scenes[0]?.id || null }),
  setActiveScene: (id) => set({ activeSceneId: id }),
  updateScene: (id, updates) =>
    set((state) => ({
      scenes: state.scenes.map((scene) => (scene.id === id ? { ...scene, ...updates } : scene)),
    })),
  setTemplate: (template) => set({ template }),
  setTextInput: (text) => set({ textInput: text }),
  setSplitMethod: (method) => set({ splitMethod: method }),
  reset: () => set(initialState),
}));
