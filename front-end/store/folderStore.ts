// src/store/useFolderStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FolderState {
  folderCreated: boolean;
  setFolderCreated: (created: boolean) => void;
  folderId: string | null;
  folderTitle: string | null;
  subFolderId: string | null;
  setFolderId: (id: string | null) => void;
  setSubFolderId: (id: string) => void;
  setFolderTitle: (id: string) => void;
}

export const useFolderStore = create<FolderState>()(
  persist(
    (set) => ({
    folderCreated: false,
    folderId: null,
    subFolderId: null,
    setFolderId: (id) => set({ folderId: id }),
    setSubFolderId: (id) => set({ subFolderId: id }),
    setFolderCreated: (created) => set({ folderCreated: created }),
    folderTitle: null,
    setFolderTitle: (title) => set({ folderTitle: title }),
  }),
  {
    name: "folder-store",
    storage: createJSONStorage (()=> localStorage)
  }
)
);
