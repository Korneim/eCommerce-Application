import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            login: (): void => set({ isLoggedIn: true }),
            logout: (): void => set({ isLoggedIn: false }),
        }),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore;
