import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Folder {
  _id: string;
  title: string;
  createdAt: string;
}

interface FolderState {
  folderCreated: boolean;
  setFolderCreated: (created: boolean) => void;
  folderId: string | null;
  folderTitle: string | null;
  subFolderId: string | null;
  hasSubfolder: boolean;
  folders: Folder[];
  setFolders: (folders: Folder[]) => void;

  searchMode: boolean; // State for search mode
  setSearchMode: (searchMode: boolean) => void; // Setter for search mode

  setFolderId: (id: string | null) => void;
  setSubFolderId: (id: string) => void;
  setFolderTitle: (title: string) => void;
  setHasSubfolder: (hasSubfolder: boolean) => void;
}

export const useFolderStore = create<FolderState>()(
  persist(
    (set) => ({
      folderCreated: false,
      folderId: null,
      subFolderId: null,
      hasSubfolder: false,
      folders: [],
      searchMode: false, // Initialize searchMode as false
      setSearchMode: (searchMode) => set({ searchMode }), // Setter for searchMode
      setFolderId: (id) => set({ folderId: id }),
      setSubFolderId: (id) => set({ subFolderId: id }),
      setFolderCreated: (created) => set({ folderCreated: created }),
      folderTitle: null,
      setFolderTitle: (title) => set({ folderTitle: title }),
      setHasSubfolder: (hasSubfolder) => set({ hasSubfolder }),
      setFolders: (folders) => set({ folders }),
    }),
    {
      name: 'folder-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
