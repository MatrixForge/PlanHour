import { create, SetState } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  isLoggedIn: () => boolean;
  clearAuth: () => void;
  logout: () => void; // Add the logout function to the interface
}


// StateCreator<AuthState, [], [["zustand/persist", AuthState], ...[]]>;
const useAuthStore = create<any>(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      isLoggedIn: () =>
        !!(localStorage.getItem("token") || sessionStorage.getItem("token")),
      clearAuth: () => set({ user: null }),
      logout: () => {
        set({ user: null });
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      },
    }),
    {
      name: "auth-storage", // name of the item in storage
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
);

export default useAuthStore;
