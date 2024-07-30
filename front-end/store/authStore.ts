import { create } from "zustand";
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
  logout: () => void;
}

const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
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
      name: "auth-storage",
      getStorage: () => sessionStorage, // Use sessionStorage by default
    }
  )
);

export default useAuthStore;
