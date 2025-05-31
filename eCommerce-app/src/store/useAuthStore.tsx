import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    accessToken: string | undefined;
    setAccessToken: (token: string) => void;
    clearAccessToken: () => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            login: (): void => set({ isLoggedIn: true }),
            logout: (): void => set({ isLoggedIn: false }),
            accessToken: undefined,
            setAccessToken: (token): void => set({ accessToken: token }),
            clearAccessToken: (): void => set({ accessToken: undefined }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                isLoggedIn: state.isLoggedIn,
                accessToken: state.accessToken,
            }),
        }
    )
);

export default useAuthStore;
