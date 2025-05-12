
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

// Simple hardcoded admin credentials - in a real app, this would come from a secured database
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'najih2025'; // This would be securely hashed in a real application

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (username, password) => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
