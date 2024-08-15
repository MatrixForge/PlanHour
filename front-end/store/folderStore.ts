import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Folder {
  date: ReactNode;
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

  subFolders: Folder[]; // State for subfolders
  setSubFolders: (subFolders: Folder[]) => void; // Setter for subfolders

  searchMode: boolean; // State for search mode
  setSearchMode: (searchMode: boolean) => void; // Setter for search mode

  mainFolderPage: boolean; // State for main folder page
  setMainFolderPage: (mainFolderPage: boolean) => void; // Setter for main folder page

  subFolderPage: boolean; // State for sub folder page
  setSubFolderPage: (subFolderPage: boolean) => void; // Setter for sub folder page

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
      subFolders: [], // Initialize subFolders as an empty array

      searchMode: false, // Initialize searchMode as false
      setSearchMode: (searchMode) => set({ searchMode }), // Setter for searchMode

      mainFolderPage: false, // Initialize mainFolderPage as false
      setMainFolderPage: (mainFolderPage) => set({ mainFolderPage }), // Setter for mainFolderPage

      subFolderPage: false, // Initialize subFolderPage as false
      setSubFolderPage: (subFolderPage) => set({ subFolderPage }), // Setter for subFolderPage

      setFolderId: (id) => set({ folderId: id }),
      setSubFolderId: (id) => set({ subFolderId: id }),
      setFolderCreated: (created) => set({ folderCreated: created }),
      folderTitle: null,
      setFolderTitle: (title) => set({ folderTitle: title }),
      setHasSubfolder: (hasSubfolder) => set({ hasSubfolder }),
      setFolders: (folders) => set({ folders }),
      setSubFolders: (subFolders) => set({ subFolders }), // Setter for subFolders
    }),
    {
      name: 'folder-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
