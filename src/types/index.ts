export type SplitMethod = "manual" | "paragraph" | "clause" | "gemini";

export interface Scene {
  id: string;
  text: string;
  imageUrl?: string;
  mood?: string;
  order: number;
}

export interface SelectedTemplate {
  layout: string;
  font: string;
  color: string;
  animation: string;
}

export interface EditorState {
  scenes: Scene[];
  activeSceneId: string | null;
  template: SelectedTemplate | null;
  textInput: string;
  splitMethod: SplitMethod;
}
