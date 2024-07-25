// src/store/useFolderStore.ts
import {create} from 'zustand';

interface FolderState {
  folderCreated: boolean;
  setFolderCreated: (created: boolean) => void;
  folderId: string | null;
  subFolderId: string | null;
  setFolderId: (id: string) => void;
  setSubFolderId: (id: string) => void;
}

export const useFolderStore = create<FolderState>((set) => ({
  folderCreated: false,
  folderId: null,
  subFolderId: null,
  setFolderId: (id) => set({ folderId: id }),
  setSubFolderId: (id) => set({ subFolderId: id }),
  setFolderCreated: (created) => set({ folderCreated: created }),
}));
