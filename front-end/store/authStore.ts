// stores/authStore.ts
import {create} from 'zustand';

interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
}

interface AuthState {
    user: User | null;
    setUser: (user: User) => void;
    clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearAuth: () => set({ user: null }),
}));

export default useAuthStore;
