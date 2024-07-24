// src/store/useFolderStore.ts
import {create} from 'zustand';

interface FolderState {
  folderCreated: boolean;
  setFolderCreated: (created: boolean) => void;
}

export const useFolderStore = create<FolderState>((set) => ({
  folderCreated: false,
  setFolderCreated: (created) => set({ folderCreated: created }),
}));
